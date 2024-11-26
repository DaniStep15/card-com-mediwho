'use strict'
import '/src/styles/styles.scss'
// prettier-ignore
import { images_src, titles, regexp, isIframe, dev_titles_loader, error_handler, identity_validator, setPageTitles } from '/src/utils/static'
import visaImg from '/src/assets/visa_card.png'
import visaLogoImg from '/src/assets/visa_logo.png'
import mCardIcon from '/src/assets/m_card_icon.png'
import aECard from '/src/assets/a_e_card.png'
import aELogo from '/src/assets/a_e_logo.png'
import noNameCard from '/src/assets/no_name_card.png'

document.querySelector('.loader__element').style.visibility = 'visible'
document.addEventListener('DOMContentLoaded', function() {
    if (!isIframe) dev_titles_loader.map(({ selector, title, command }) => (document.querySelector(selector)[command] = title))
    setPageTitles()
    // getting elements
    const c_item = document.querySelectorAll('.c_item')
    const d_item = document.querySelectorAll('.d_item')
    const number__err = document.querySelector('.number__err')
    const cvv__err = document.querySelector('.cvv__err')
    const date__err = document.querySelector('.date__err')
    const identity__err = document.querySelector('.identity__err')
    const content__data_left = document.querySelector('.content__data_left')
    const card__type_img = document.querySelector('.type__img')
    const input__img_card = document.querySelector('.input__img_card')
    const c_first = document.querySelector('.c_first')
    const c_second = document.querySelector('.c_second')
    const c_third = document.querySelector('.c_third')
    const c_fourth = document.querySelector('.c_fourth')
    const d_first = document.querySelector('.d_first')
    const d_second = document.querySelector('.d_second')
    const cvv_item = document.querySelector('.cvv_item')
    const year__select = document.getElementById('validityYear')
    const month__select = document.getElementById('validityMonth')
    const submit__button = document.querySelector('.submit__button')
    const submit__button_real = document.querySelector('.submit__button_real')
    const loader__element = document.querySelector('.loader__element')

    const setCardImages = (cardTypeImgSrc, inputImgCardSrc, cardComCard, cardComInput) => {
        if (isIframe) {
            card__type_img.setAttribute('src', images_src[cardComCard])
            input__img_card.setAttribute('src', images_src[cardComInput])
            card__type_img.setAttribute('data-bind', `attr: {src:'${images_src[cardComCard]}'}`)
            input__img_card.setAttribute('data-bind', `attr: {src:'${images_src[cardComInput]}'}`)
        } else {
            card__type_img.setAttribute('src', cardTypeImgSrc)
            input__img_card.setAttribute('src', inputImgCardSrc)
        }
    }

    const card_type = value => {
        if (regexp?.mastercard(value)) return setCardImages(mCardIcon, mCardIcon, 'm_card_icon', 'm_card_icon')
        if (regexp?.visa(value)) return setCardImages(visaImg, visaLogoImg, 'visa_card', 'visa_logo')
        if (regexp?.amex(value)) return setCardImages(aECard, aELogo, 'a_e_card', 'a_e_logo')
        return setCardImages(visaImg, noNameCard, 'visa_card', 'no_name_card')
    }

    const card_handling = (value, replace_, initial_, flag) => {
        let cleanedValue = value.replaceAll(replace_, '')
        let formattedValue = cleanedValue + initial_.slice(cleanedValue.length)
        return {
            card: () => {
                c_first.innerText = formattedValue.slice(0, 4)
                c_second.innerText = formattedValue.slice(4, 8)
                c_third.innerText = formattedValue.slice(8, 12)
                c_fourth.innerText = formattedValue.slice(12, formattedValue.length)
            },
            date: () => {
                d_first.innerText = formattedValue.slice(0, 2)
                d_second.innerText = formattedValue.slice(2, formattedValue.length)
            },
            cvv: () => {
                cvv_item.innerText = formattedValue
            }
        }[flag]()
    }

    const ide_checker = input => !identity_validator(input) && error_handler(identity__err, 'visible')

    const cardNumberTest = (input, blur) => {
        let isCardValid = /^\d{16}$/.test(input)
        // prettier-ignore
        const cards_types = !regexp?.amex(input) && !regexp?.visa(input)  && !regexp?.mastercard(input) &&
                                     !regexp?.discover(input) && !regexp?.jcb(input) && !regexp?.unionpay(input) &&
                                     !regexp?.maestro(input) && !regexp?.uatp(input) && !regexp?.diners(input)

        if ((isCardValid && cards_types) || (input.length === 15 && !regexp?.amex(input)) || (blur && cards_types)) {
            error_handler(number__err, 'visible')
            c_item.forEach(item => (item.style.color = '#FF0013'))
            return true
        }
        return false
    }

    const dateInputErr = input => {
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
            return true
        }
        if (exMonth.toString().length && exYear.toString().length) {
            // year
            Array.from(year__select.options).forEach(option => option.value === exYear.toString() && (option.selected = true))
            year__select.dispatchEvent(new Event('change'))
            // month
            Array.from(month__select.options).forEach(option => option.value === exMonth.toString() && (option.selected = true))
            month__select.dispatchEvent(new Event('change'))
        }
    }

    submit__button.addEventListener('click', e => {
        const card_elem = document.getElementById('txtCardNumber').value.replace(/\D/g, '')
        const date_elem = document.getElementById('exp-date').value
        const cvv_elem = document.getElementById('txtCvv').value
        const identity_elem = document.getElementById('txtCardOwnerID').value
        const ide_check = identity_elem.length ? identity_elem : '00000001'

        if (cardNumberTest(card_elem, true)) return false
        if (!date_elem.length) {
            error_handler(date__err, 'visible')
            d_item.forEach(item => (item.style.color = '#FF0013'))
            return false
        }

        if (date_elem.length > 4) {
            if (dateInputErr(date_elem)) return false
        }

        if (!cvv_elem.length) {
            error_handler(cvv__err, 'visible')
            document.querySelector('.cvv_item').style.color = '#FF0013'
            return false
        }
        if (ide_checker(ide_check)) return false

        submit__button_real.style.display = 'flex'
        submit__button.style.display = 'none'
        submit__button_real.dispatchEvent(new Event('click'))
        loader__element.style.visibility = 'visible'
        loader__element.style.width = '100%'
        loader__element.style.height = '100%'
    })

    // ***** ***** ***** ***** ***** //
    // ***** card number validation section part ***** //
    // ***** ***** ***** ***** ***** //
    document.getElementById('txtCardNumber').addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, '')
        error_handler(number__err, 'hidden')
        card_type(input, false)
        card_handling(input, ' ', titles?.lines__card, 'card')
        c_item.forEach(item => (item.style.color = '#fff'))
        cardNumberTest(input)

        e.target.value = input.replace(/(.{4})/g, '$1 ').trim()
    })

    document.getElementById('txtCardNumber').addEventListener('blur', function(e) {
        e.target.value.length && cardNumberTest(e.target.value.replace(/\D/g, ''), true)
    })

    // ***** ***** ***** ***** ***** //
    // ***** card exp date validation section part ***** //
    // ***** ***** ***** ***** ***** //
    document.getElementById('exp-date').addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, '')
        error_handler(date__err, 'hidden')
        card_handling(input, ' ', titles?.lines__date, 'date')
        d_item.forEach(item => (item.style.color = '#fff'))
        // prettier-ignore
        const output = input.replace(/\//g, '').substring(0, 2) + (input.length > 2 ? '/' : '') + input.replace(/\//g, '').substring(2, 4).trim()
        output.length === 5 && dateInputErr(output)
        e.target.value = output
    })
    document.getElementById('exp-date').addEventListener('blur', function(e) {
        let input = e.target.value
        dateInputErr(input)
    })

    // ***** ***** ***** ***** ***** //
    // ***** card cvv validation section part ***** //
    // ***** ***** ***** ***** ***** //
    document.getElementById('txtCvv').addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, '')
        error_handler(cvv__err, 'hidden')
        card_handling(input, ' ', titles?.lines__cvv, 'cvv')
        document.querySelector('.cvv_item').style.color = '#000'

        e.target.value = input.trim()
    })

    document.getElementById('txtCvv').addEventListener('blur', function(e) {
        let length = e.target.value.length
        content__data_left.classList.remove('show_back')
        if (length && length < 3) {
            error_handler(cvv__err, 'visible')
            document.querySelector('.cvv_item').style.color = '#FF0013'
        }
    })

    document.getElementById('txtCvv').addEventListener('focus', e => content__data_left.classList.add('show_back'))

    // ***** ***** ***** ***** ***** //
    // ***** card identity validation section part ***** //
    // ***** ***** ***** ***** ***** //
    document.getElementById('txtCardOwnerID').addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, '')
        error_handler(identity__err, 'hidden')
        input.length === 9 && ide_checker(input)
        e.target.value = input.trim()
    })

    document.getElementById('txtCardOwnerID').addEventListener('blur', e => ide_checker(e.target.value))
})
