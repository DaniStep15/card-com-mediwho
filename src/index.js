'use strict'
import '/src/styles/styles.scss'
import visaImg from '/src/assets/visa_card.png'
import visaLogoImg from '/src/assets/visa_logo.png'
import mCardIcon from '/src/assets/m_card_icon.png'
import aECard from '/src/assets/a_e_card.png'
import aELogo from '/src/assets/a_e_logo.png'
import noNameCard from '/src/assets/no_name_card.png'

window.addEventListener('load', () => {
    const isIframe = window.location.pathname.includes('External')

    const temp__price = '₪144.00'.replace(/\.\d+$/, '') //summaryTotalSign
    const temp__name = 'אלי כהן' // cardOwnerName.value
    const temp_link = 'הסליקה מתבצעת דרך חברת קארדקום בע"מ'

    let lines__card = '----------------'
    let lines__date = '----'
    let lines__cvv = '---'

    let visa = value => /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value) /// 4263 9826 4026 9299
    let mastercard = value => /^(?:5[1-5][0-9]{14})$/.test(value) // 5425 2334 3010 9903
    let amex = value => /^(?:3[47][0-9]{13})$/.test(value) // 3742 4545 5400 126
    // test card number 4580 0000 0000 0000

    const cardComImages = {
        a_e_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=e77d2ae0-6ede-49d9-88ad-374d8d07786e',
        a_e_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=1af838c5-668e-42c9-beca-673a91c84a67',
        card_map: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=1fef518b-cf2f-431c-b4dd-8b4ca6a379fc',
        chip: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=a46ad25b-3e71-43ba-b36b-227d1ab93b52',
        circles: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=f230473e-c3d2-45f4-a11e-e6623c12b1f3',
        id_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=320315d2-36fe-41c3-9de5-741710f236d4',
        m_card_icon: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=15acd46d-c6d1-4b56-9560-7f11c0474019',
        m_card_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=f7d3353d-21cd-4f94-8eac-ef8a2bd4b1fe',
        no_name_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=fcba0e71-be73-4def-a85a-6c0bc0c35582',
        pattern: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=63b85687-943a-493b-ac87-e0578980701e',
        robot: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=7625a454-8193-401c-abbc-83d6d6ca1933',
        visa_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=54141311-3830-422a-b5bf-d42d831180dd',
        visa_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=9d53e231-9c77-4e84-af7a-8655ab7ddbd7'
    }

    // titles
    document.querySelector('.content__title').innerText = 'טופס תשלום מאובטח'
    document.querySelector('.content__price_title').innerText = `סה”כ לתשלום`
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
    document.querySelector('.valid__date').innerText = `VALID DATE`
    document.querySelector('.card__text').innerText = 'אין להעביר לשום גורם, גם אם הוא מזדהה כחברת כרטיסי האשראי את מספר כרטיס האשראי המלא ואת התוקף'
    document.querySelector('.outer__text').innerText = 'מעבר לתשלום מהווה אישור על תנאי'
    document.querySelector('.outer__link').innerText = 'התקנון'
    document.querySelector('.checkbox__text').innerText = 'אני מאשר קריאה והסכמה לתנאי'
    document.querySelector('.checkbox__link').innerText = 'התקנון'
    // do not set values
    document.getElementById('txtCardNumber').value = ''
    document.getElementById('exp-date').value = ''
    document.getElementById('txtCvv').value = ''
    document.getElementById('txtCardOwnerID').value = ''

    if (!isIframe) {
        document.querySelector('.holder__name').value = temp__name
        document.querySelector('.content__price').innerText = temp__price
        document.querySelector('.cardcomText').innerText = temp_link
    } else {
        visaImg = ''
        visaLogoImg = ''
        mCardIcon = ''
        aECard = ''
        aELogo = ''
        noNameCard = ''
    }
    // getting elements
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

    const error_handler = (elem, type) => (elem.style.visibility = type)

    const setCardImages = (cardTypeImgSrc, inputImgCardSrc, cardComCard, cardComInput) => {
        if (isIframe) {
            card__type_img.setAttribute('src', cardComImages[cardComCard])
            input__img_card.setAttribute('src', cardComImages[cardComInput])
            card__type_img.setAttribute('data-bind', `attr: {src:'${cardComImages[cardComCard]}'}`)
            input__img_card.setAttribute('data-bind', `attr: {src:'${cardComImages[cardComInput]}'}`)
        } else {
            card__type_img.setAttribute('src', cardTypeImgSrc)
            input__img_card.setAttribute('src', inputImgCardSrc)
        }
    }

    const card_type = value => {
        if (mastercard(value)) return setCardImages(mCardIcon, mCardIcon, 'm_card_icon', 'm_card_icon')
        if (visa(value)) return setCardImages(visaImg, visaLogoImg, 'visa_card', 'visa_logo')
        if (amex(value)) return setCardImages(aECard, aELogo, 'a_e_card', 'a_e_logo')
        return setCardImages(visaImg, noNameCard, 'visa_card', 'no_name_card')
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

        console.log(exMonth, exYear)

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

    window.addEventListener('beforeunload', () => {
        console.log('Компонент будет размонтирован (очистка)')
    })
})

//txtCardOwnerID
//cardOwnerName.value
//validityYear
//validityMonth
