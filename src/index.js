'use strict'
import '/src/styles/styles.scss'

// console.log('hello world')

const temp__price = '₪144.00'.replace(/\.\d+$/, '') //summaryTotalSign
const temp__name = 'אלי כהן' // cardOwnerName.value

let lines__card = '----------------'
let lines__date = '----'
let lines__cvv = '---'

let visa = value => /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value) /// 4263 9826 4026 9299
let mastercard = value => /^(?:5[1-5][0-9]{14})$/.test(value) // 5425 2334 3010 9903
let amex = value => /^(?:3[47][0-9]{13})$/.test(value) // 3742 4545 5400 126
// test card number 4580 0000 0000 0000

const cardComassets = {
    visa: '',
    mastercard: '',
    amex: '',
    robot: '',
    circles: ''
}

document.querySelector('.content__title').innerText = 'טופס תשלום מאובטח'
document.querySelector('.content__price').innerText = `סה”כ לתשלום`.concat(` ${temp__price}`)
document.querySelector('.label__number').innerText = `מס' כרטיס`
document.querySelector('.label__cvv').innerText = `3 ספרות בגב הכרטיס`
document.querySelector('.label__date').innerText = `תוקף כרטיס`
document.querySelector('.label__identity').innerText = `תעודת זהות`
document.querySelector('.number__err').innerText = `מספר האשראי אינו תקין`
document.querySelector('.cvv__err').innerText = `הספרות שהוזנו אינן תקינות`
document.querySelector('.date__err').innerText = `התוקף שהוזן אינו תקין`
document.querySelector('.identity__err').innerText = `המספר שהוזן אינו תקין`
document.querySelector('.submit__button').innerText = `ביצוע תשלום`
document.querySelector('.holder').innerText = `CARD HOLDER`
document.querySelector('.holder__name').innerText = temp__name
document.querySelector('.valid__date').innerText = `VALID DATE`
document.querySelector('.card__text').innerText = 'אין להעביר לשום גורם, גם אם הוא מזדהה כחברת כרטיסי האשראי את מספר כרטיס האשראי המלא ואת התוקף'
document.querySelector('.outer__text').innerText = 'מעבר לתשלום מהווה אישור על תנאי'
document.querySelector('.outer__link').innerText = 'התקנון'

const number__err = document.querySelector('.number__err')
const cvv__err = document.querySelector('.cvv__err')
const date__err = document.querySelector('.date__err')
const identity__err = document.querySelector('.identity__err')
const content__data_left = document.querySelector('.content__data_left')
const c_item = document.querySelectorAll('.c_item')
const d_item = document.querySelectorAll('.d_item')
const card__type_img = document.querySelector('.type__img')
const input__img_card = document.querySelector('.input__img_card')
const submit__button = document.querySelector('.submit__button')

const card_type = value => {
    if (visa(value)) {
        card__type_img.setAttribute('src', 'assets/visa.png')
        input__img_card.setAttribute('src', 'assets/visa_logo.png')
        // cardcom
        card__type_img.setAttribute('data-bind', "attr: {src:'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=2d6e1cf5-1034-4c51-851e-54765e34f435'}")
        input__img_card.setAttribute('data-bind', "attr: {src:'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=e634ab2f-e5c1-424a-b746-0b071629de5a'}")
        return
    }
    if (mastercard(value)) {
        card__type_img.setAttribute('src', 'assets/m_card_icon.png')
        input__img_card.setAttribute('src', 'assets/m_card_logo.png')
        //cardcom
        card__type_img.setAttribute('data-bind', "attr: {src:'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=5c937823-bdf7-49f8-a4ad-ab8dc2bc2508'}")
        input__img_card.setAttribute('data-bind', "attr: {src:'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=5c937823-bdf7-49f8-a4ad-ab8dc2bc2508'}")
        return
    }
    if (amex(value)) {
        card__type_img.setAttribute('src', 'assets/a_e_card.png')
        input__img_card.setAttribute('src', 'assets/a_e_logo.png')
        // cardcom
        card__type_img.setAttribute('data-bind', "attr: {src:'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=a36120fd-d95c-44db-9fbf-32642dc67182'}")
        input__img_card.setAttribute('data-bind', "attr: {src:'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=e0448d96-8327-4951-b065-b5e2d5fabc2c'}")
        return
    }
    card__type_img.setAttribute('src', 'assets/visa.png')
    input__img_card.setAttribute('src', 'assets/no_name_card.png')
    // cardcom
    card__type_img.setAttribute('data-bind', "attr: {src:'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=d1ae48db-082f-4ff2-8412-52bb9b133ec4'}")
    input__img_card.setAttribute('data-bind', "attr: {src:'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=2d6e1cf5-1034-4c51-851e-54765e34f435'}")
}

const card_handling = (value, replace_, initial_, flag) => {
    let cleanedValue = value.replaceAll(replace_, '')
    let formattedValue = cleanedValue + initial_.slice(cleanedValue.length)
    return {
        card: () => {
            document.querySelector('.c_first').innerText = formattedValue.slice(0, 4)
            document.querySelector('.c_second').innerText = formattedValue.slice(4, 8)
            document.querySelector('.c_third').innerText = formattedValue.slice(8, 12)
            document.querySelector('.c_fourth').innerText = formattedValue.slice(12, formattedValue.length)
        },
        date: () => {
            document.querySelector('.d_first').innerText = formattedValue.slice(0, 2)
            document.querySelector('.d_second').innerText = formattedValue.slice(2, formattedValue.length)
        },
        cvv: () => {
            document.querySelector('.cvv_item').innerText = formattedValue
        }
    }[flag]()
}

const error_handler = (elem, type) => (elem.style.visibility = type)

const identity_checker = id => {
    id = String(id).trim()
    if (id.length > 9 || isNaN(id)) return false
    id = id.length < 9 ? ('00000000' + id).slice(-9) : id
    return (
        Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1)
            return counter + (step > 9 ? step - 9 : step)
        }) %
            10 ===
        0
    )
}

// ***** ***** ***** ***** ***** //
// ***** oninput section part ***** //
// ***** ***** ***** ***** ***** //
document.getElementById('txtCardNumber').addEventListener('input', function(e) {
    let input = e.target.value.replace(/\D/g, '')
    error_handler(number__err, 'hidden')
    card_type(input)
    card_handling(input, ' ', lines__card, 'card')
    c_item.forEach(item => (item.style.color = '#fff'))

    e.target.value = input.replace(/(.{4})/g, '$1 ').trim()
})

document.getElementById('exp-date').addEventListener('input', function(e) {
    let input = e.target.value.replace(/\D/g, '')
    error_handler(date__err, 'hidden')
    card_handling(input, ' ', lines__date, 'date')
    d_item.forEach(item => (item.style.color = '#fff'))

    e.target.value =
        input.replace(/\//g, '').substring(0, 2) +
        (input.length > 2 ? '/' : '') +
        input
            .replace(/\//g, '')
            .substring(2, 4)
            .trim()
})

document.getElementById('txtCvv').addEventListener('input', function(e) {
    let input = e.target.value.replace(/\D/g, '')
    error_handler(cvv__err, 'hidden')
    card_handling(input, ' ', lines__cvv, 'cvv')
    document.querySelector('.cvv_item').style.color = '#000'

    e.target.value = input.trim()
})

document.getElementById('txtCardOwnerID').addEventListener('input', function(e) {
    let input = e.target.value.replace(/\D/g, '')
    error_handler(identity__err, 'hidden')

    e.target.value = input.trim()
})

// ***** ***** ***** ***** ***** //
// ***** blur/focus input section part ***** //
// ***** ***** ***** ***** ***** //
document.getElementById('txtCardNumber').addEventListener('blur', function(e) {
    let input = e.target.value.replace(/\s+/g, '')
    let isCardValid = /^\d{16}$/.test(input)

    if (!isCardValid && !amex(input) && input.length) {
        error_handler(number__err, 'visible')
        c_item.forEach(item => (item.style.color = '#FF0013'))
    }
})

document.getElementById('exp-date').addEventListener('blur', function(e) {
    let input = e.target.value
    const reg_date = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
    const exMonth = +input.slice(0, 2)
    const exYear = '20' + +input.slice(3, input.length)
    const today = new Date()
    const someday = new Date()
    someday.setFullYear(+exYear, exMonth, 1)
    const isFormat = input.match(reg_date)

    if (input.length && (someday < today || !isFormat)) {
        error_handler(date__err, 'visible')
        d_item.forEach(item => (item.style.color = '#FF0013'))
    }
})

document.getElementById('txtCvv').addEventListener('blur', function(e) {
    let length = e.target.value.length
    content__data_left.classList.remove('show_back')
    if (length && length < 3) {
        error_handler(cvv__err, 'visible')
        document.querySelector('.cvv_item').style.color = '#FF0013'
    }
})

document.getElementById('txtCvv').addEventListener('focus', function(e) {
    content__data_left.classList.add('show_back')
})

document.getElementById('txtCardOwnerID').addEventListener('blur', function(e) {
    let input = e.target.value
    if (!identity_checker(input)) error_handler(identity__err, 'visible')
})

//txtCardOwnerID
//cardOwnerName.value
//validityYear
//validityMonth
