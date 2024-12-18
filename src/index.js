'use strict'
import '/src/styles/styles.scss'
// prettier-ignore
import { images_src, titles, regexp, isIframe, dev_titles_loader, dispatchEventErrors, error_handler, identity_validator, setPageTitles, luhn_algorithm_check, isracard_algorithm_check, isKnowCard } from '/src/utils/static'
import visaImg from '/src/assets/visa_card.png'
import visaLogoImg from '/src/assets/visa_logo.png'
import mCardIcon from '/src/assets/m_card_icon.png'
import aECard from '/src/assets/a_e_card.png'
import aELogo from '/src/assets/a_e_logo.png'
import noNameCard from '/src/assets/no_name_card.png'
import dinersCardLogo from '/src/assets/d_c_logo.png'
import israCardLogo from '/src/assets/isracart_logo.png'

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
    const terms_checkbox = document.querySelector('.checkbox__input')

    const card_num_input = document.getElementById('txtCardNumber')
    const card_exp_input = document.getElementById('exp-date')
    const card_cvv_input = document.getElementById('txtCvv')
    const card_ide_input = document.getElementById('txtCardOwnerID')

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
        if (regexp?.mastercard(value) && !(regexp.isracart(value) && isracard_algorithm_check(value))) return setCardImages(mCardIcon, mCardIcon, 'm_card_icon', 'm_card_icon')
        if (regexp?.visa(value) && !(regexp.isracart(value) && isracard_algorithm_check(value))) return setCardImages(visaImg, visaLogoImg, 'visa_card', 'visa_logo')
        if (regexp?.amex(value) && !(regexp.isracart(value) && isracard_algorithm_check(value))) return setCardImages(aECard, aELogo, 'a_e_card', 'a_e_logo')
        if (regexp?.diners(value) && !(regexp.isracart(value) && isracard_algorithm_check(value))) return setCardImages(dinersCardLogo, dinersCardLogo, 'd_c_logo', 'd_c_logo')
        if (regexp.isracart(value) && isracard_algorithm_check(value)) return setCardImages(israCardLogo, israCardLogo, 'isracart_logo', 'isracart_logo')
        return setCardImages('#', noNameCard, '#', 'no_name_card')
    }

    const card_handling = (value, replace_, initial_, flag, reset) => {
        let cleanedValue = value.replaceAll(replace_, '')
        let formattedValue = cleanedValue + initial_.slice(cleanedValue.length)
        return {
            card: () => {
                c_first.innerText = reset ? '----' : formattedValue.slice(0, 4)
                c_second.innerText = reset ? '----' : formattedValue.slice(4, 8)
                c_third.innerText = reset ? '----' : formattedValue.slice(8, 12)
                c_fourth.innerText = reset ? '----' : formattedValue.slice(12, formattedValue.length)
            },
            date: () => {
                d_first.innerText = reset ? '--' : formattedValue.slice(0, 2)
                d_second.innerText = reset ? '--' : formattedValue.slice(2, formattedValue.length)
            },
            cvv: () => {
                cvv_item.innerText = reset ? '---' : formattedValue
            }
        }[flag]()
    }

    const ide_checker = (input, blur) => {
        if (identity_validator(input)) return false
        error_handler(identity__err, null, 'visible', null)
        if (blur) dispatchEventErrors(card_ide_input)
        return true
    }

    const cardNumberTest = (input, blur) => {
        const card_in_use = card__type_img.getAttribute('src') !== '#'
        const countByType = isKnowCard(input) && card_in_use ? isKnowCard(input)?.counts.find(i => i === input.length) : 16

        if ((blur && input.length) || input.length === countByType) {
            let isCardValid = isKnowCard(input) && (luhn_algorithm_check(input) || isracard_algorithm_check(input))
            if (isCardValid) return false

            error_handler(number__err, c_item, 'visible', '#FF0013', true)
            if (blur) {
                card_handling(input, ' ', '----', 'card', true)
                card_type('0')
                dispatchEventErrors(card_num_input)
            }
            return true
        }
    }

    const dateInputErr = (input, blur) => {
        const reg_date = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
        const exMonth = +input.slice(0, 2)
        const exYear = '20' + +input.slice(3, input.length)
        const today = new Date()
        const someday = new Date()
        someday.setFullYear(+exYear, exMonth, 1)
        const isFormat = input.match(reg_date)

        if (input.length && (someday < today || !isFormat)) {
            error_handler(date__err, d_item, 'visible', '#FF0013')

            if (blur) {
                card_handling(input, ' ', '---', 'date', true)
                dispatchEventErrors(card_exp_input)
            }

            return true
        }

        if (exMonth.toString().length && exYear.toString().length) {
            // year
            Array.from(year__select.options).forEach(option => option.value === exYear.toString() && (option.selected = true))
            year__select.dispatchEvent(new Event('change'))
            // month
            Array.from(month__select.options).forEach(option => option.value === exMonth.toString() && (option.selected = true))
            month__select.dispatchEvent(new Event('change'))

            // set terms true, as default then date is valid
            terms_checkbox.checked = true
            terms_checkbox.dispatchEvent(new Event('click'))

            return false
        }
    }

    // ***** ***** ***** ***** ***** //
    // ***** card number validation section part ***** //
    // ***** ***** ***** ***** ***** //
    document.getElementById('txtCardNumber').addEventListener('input', function(e) {
        error_handler(number__err, c_item, 'hidden', '#fff')

        let input = e.target.value.replace(/\D/g, '')
        const isIsracard = /^\d{8,9}$/.test(input) && isracard_algorithm_check(input)
        // prettier-ignore
        const isAmexOrDiners =
            regexp?.amex(input) && !isIsracard ? titles?.lines__card_amex
            : regexp?.diners(input)&& !isIsracard ? titles?.lines__card_diners
            : isIsracard ? titles?.lines__card_isracard
            : titles?.lines__card

        e.target.maxLength = regexp?.amex(input) ? 18 : regexp?.diners(input) ? 17 : 19
        card_type(input, false)
        card_handling(input, ' ', isAmexOrDiners, 'card', false)
        cardNumberTest(input, false, e.target.maxLength)

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

        error_handler(date__err, d_item, 'hidden', '#fff')

        card_handling(input, ' ', titles?.lines__date, 'date')
        // prettier-ignore
        const output = input.replace(/\//g, '').substring(0, 2) + (input.length > 2 ? '/' : '') + input.replace(/\//g, '').substring(2, 4).trim()
        output.length === 5 && dateInputErr(output, false)
        e.target.value = output
    })
    document.getElementById('exp-date').addEventListener('blur', e => dateInputErr(e.target.value, true))

    // ***** ***** ***** ***** ***** //
    // ***** card cvv validation section part ***** //
    // ***** ***** ***** ***** ***** //
    document.getElementById('txtCvv').addEventListener('input', function({ target }) {
        let input = target.value.replace(/\D/g, '')

        error_handler(cvv__err, cvv_item, 'hidden', '#000')
        card_handling(input, ' ', titles?.lines__cvv, 'cvv')

        target.value = input
    })

    document.getElementById('txtCvv').addEventListener('blur', function({ target }) {
        if (target.value.length && target.value.length < 3) {
            error_handler(cvv__err, cvv_item, 'visible', '#FF0013')

            card_handling(target.value, ' ', '-', 'cvv', true)
            dispatchEventErrors(card_cvv_input)
            content__data_left.classList.add('show_back')
        } else {
            content__data_left.classList.remove('show_back')
        }
    })

    document.getElementById('txtCvv').addEventListener('focus', e => content__data_left.classList.add('show_back'))

    // ***** ***** ***** ***** ***** //
    // ***** card identity validation section part ***** //
    // ***** ***** ***** ***** ***** //
    document.getElementById('txtCardOwnerID').addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, '')
        error_handler(identity__err, null, 'hidden', null)

        input.length === 9 && ide_checker(input, false)
        e.target.value = input.trim()
    })

    document.getElementById('txtCardOwnerID').addEventListener('blur', e => ide_checker(e.target.value, true))

    // ***** ***** ***** ***** ***** //
    // ***** submit validation section part ***** //
    // ***** ***** ***** ***** ***** //
    submit__button.addEventListener('click', e => {
        const card_elem = document.getElementById('txtCardNumber').value.replace(/\D/g, '')
        const date_elem = document.getElementById('exp-date').value
        const cvv_elem = document.getElementById('txtCvv').value
        const identity_elem = document.getElementById('txtCardOwnerID').value

        const ide_check = identity_elem.length ? identity_elem : '00000001'
        const card_num_check = card_elem.length ? card_elem : '0000'
        const date_check = date_elem.length ? date_elem : '22/22'

        if (cardNumberTest(card_num_check, true)) return
        if (dateInputErr(date_check, true)) return
        if (!cvv_elem.length) return error_handler(cvv__err, cvv_item, 'visible', '#FF0013')
        if (ide_checker(ide_check)) return

        submit__button_real.style.display = 'flex'
        submit__button.style.display = 'none'
        submit__button_real.dispatchEvent(new Event('click'))
        loader__element.style.visibility = 'visible'
        loader__element.style.width = '100%'
        loader__element.style.height = '100%'
    })
})
