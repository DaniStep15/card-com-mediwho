const isIframe = window.location.pathname.includes('External')

const { images_src, titles, regexp } = {
    images_src: {
        loading_spinner: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=cb1ad8a2-8166-469a-92fe-4f5f5305f7d0',
        a_e_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=e77d2ae0-6ede-49d9-88ad-374d8d07786e',
        a_e_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=eee7de87-8850-4240-8f8a-c1eb713ef8ac',
        card_map: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=1fef518b-cf2f-431c-b4dd-8b4ca6a379fc',
        chip: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=a46ad25b-3e71-43ba-b36b-227d1ab93b52',
        circles: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=f230473e-c3d2-45f4-a11e-e6623c12b1f3',
        id_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=7f8622e7-8894-4974-b633-9a7388a551ce',
        m_card_icon: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=9e9b7ec5-4257-480e-9a7a-68a598aeb12e',
        m_card_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=87c7256d-9662-4fad-a219-b40bf5ef0a0c',
        no_name_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=accf42f9-b074-4efc-83d6-8f6282b0faca',
        pattern: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=882a30f6-ca56-4900-8af4-13f067b85c7e',
        robot: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=3edb5c6b-ec53-4a22-9162-e8da4df99e74',
        visa_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=3d76c387-1713-498f-b31e-cc9888ce83b4',
        visa_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=9d53e231-9c77-4e84-af7a-8655ab7ddbd7',
        d_c_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=9372af4c-b81a-40fa-a213-aabe58809d09',
        isracart_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=076648d2-7f41-4122-8d3e-d9892ad9b9fa'
    },
    titles: {
        temp__price: '₪144.00'.replace(/\.\d+$/, ''),
        temp_link: 'הסליקה מתבצעת דרך חברת קארדקום בע"מ',
        temp__name: 'אלי כהן',
        lines__card: '----------------',
        lines__card_amex: '---------------',
        lines__card_diners: '--------------',
        lines__card_isracard: '---------',
        lines__date: '----',
        lines__cvv: '---'
    },
    regexp: {
        // known card types, in use in Israel
        visa: value => /^4[0-9]/.test(value), /// 4263 9826 4026 9299
        mastercard: value => /^5[1-5]/.test(value), // 5425 2334 3010 9903
        amex: value => /^3[47]/.test(value), // 3742 4545 5400 126
        diners: value => /^3[068][0-9]/.test(value), // Diners Club (e.g., 3056 9309 0259 04)
        isracart: value => /^\d{8,9}$/.test(value), // 1751 0133 08,    10830529,    10830528
        // other cards type
        discover: value => /^(?:6(?:011|5[0-9]{2})[0-9]{12})$/.test(value), // Discover (e.g., 6011 2345 6789 0123)
        jcb: value => /^(?:35[2-8][0-9]{13})$/.test(value), // JCB (e.g., 3528 0000 0000 0000)
        unionpay: value => /^(?:62[0-9]{14,17})$/.test(value), // China UnionPay (e.g., 6221 2345 6789 0000)
        maestro: value => /^(?:5[06789]|6[389])[0-9]{0,15}$/.test(value), // Maestro (e.g., 6759 1234 5678 9012 345)
        uatp: value => /^(?:1[0-9]{14})$/.test(value) // UATP (e.g., 1234 5678 9012 345)
    }
}

const setPageTitles = () => {
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
    document.querySelector('.submit__button').value = `ביצוע תשלום`
    document.querySelector('.submit__button_real').value = `ביצוע תשלום`
    document.querySelector('.holder').innerText = `CARD HOLDER`
    document.querySelector('.valid__date').innerText = `VALID DATE`
    document.querySelector('.card__text').innerText = 'אין להעביר לשום גורם, גם אם הוא מזדהה כחברת כרטיסי האשראי את מספר כרטיס האשראי המלא ואת התוקף'
    document.querySelector('.outer__text').innerText = 'מעבר לתשלום מהווה אישור על תנאי'
    document.querySelector('.outer__link').innerText = 'התקנון'
    document.querySelector('.checkbox__text').innerText = 'אני מאשר קריאה והסכמה לתנאי'
    document.querySelector('.checkbox__link').innerText = 'התקנון'
    document.querySelector('.content__robot_img').setAttribute('data-bind', `attr: {src:'${images_src?.robot}'}`)
    document.querySelector('.content__circle_img').setAttribute('data-bind', `attr: {src:'${images_src?.circles}'}`)
    document.querySelector('.chip__img').setAttribute('data-bind', `attr: {src:'${images_src?.chip}'}`)
    document.querySelector('.type__img').setAttribute('data-bind', `attr: {src:'#'}`)
    document.querySelector('.input__img_card').setAttribute('data-bind', `attr: {src:'${images_src?.no_name_card}'}`)
    document.querySelector('.identity__logo').setAttribute('data-bind', `attr: {src:'${images_src?.id_logo}'}`)
    document.querySelector('.loader__element_image').setAttribute('data-bind', `attr: {src:'${images_src?.loading_spinner}'}`)
    document.querySelectorAll('.map__img').forEach(element => {
        element.setAttribute('data-bind', `attr: {src:'${images_src?.card_map}'}`)
    })
}
const dev_titles_loader = [
    { selector: '.content__price', title: titles?.temp__price, command: 'innerText' },
    { selector: '.cardcomText', title: titles?.temp_link, command: 'innerText' },
    { selector: '.holder__name', title: titles?.temp__name, command: 'value' }
]

const error_handler = (span_elem, card_elem, type, color) => {
    if (span_elem) {
        span_elem.style.visibility = type
    }
    if (card_elem) {
        card_elem.length ? card_elem.forEach(item => (item.style.color = color)) : (card_elem.style.color = color)
    }
}

const identity_validator = id => {
    id = String(id).trim()
    if (id.length > 9 || isNaN(id)) return false
    id = id.length < 9 ? ('00000000' + id).slice(-9) : id
    return (
        // prettier-ignore
        Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1)
            return counter + (step > 9 ? step - 9 : step)
        }) % 10 === 0
    )
}

const luhn_algorithm_check = input => {
    let cri = input.split('').map(Number)

    if (/^0+$/.test(input)) {
        return false // Explicitly reject all-zero input
    }

    let total = 0
    for (let i = cri.length - 2; i >= 0; i = i - 2) {
        let tv = cri[i]
        tv = tv * 2
        if (tv > 9) {
            tv = (tv % 10) + 1
        }
        cri[i] = tv
    }
    for (let i = 0; i < cri.length; i++) {
        total += cri[i]
    }
    return total % 10 === 0
}

const isracard_algorithm_check = input => {
    let cardNumber = input.padStart(9, '0')

    if (/^(123456789|987654321)$/.test(cardNumber) || /^0+$/.test(cardNumber)) return false

    const digits = cardNumber.split('').map(Number)
    const weights = digits.length === 8 ? [8, 7, 6, 5, 4, 3, 2, 1] : [9, 8, 7, 6, 5, 4, 3, 2, 1]
    const weightedSums = digits.map((digit, index) => digit * weights[index])
    const totalSum = weightedSums.reduce((acc, val) => acc + val, 0)
    return totalSum % 11 === 0
}

const isKnowCard = input => {
    if (regexp.amex(input)) return { name: 'American Express', counts: [15] }
    if (regexp.visa(input)) return { name: 'Visa', counts: [16] }
    if (regexp.mastercard(input)) return { name: 'MasterCard', counts: [16] }
    if (regexp.discover(input)) return { name: 'Discover', counts: [16] }
    if (regexp.diners(input)) return { name: 'Diners Club', counts: [14] }
    if (regexp.jcb(input)) return { name: 'JCB', counts: [16] }
    if (regexp.unionpay(input)) return { name: 'UnionPay', counts: [16] }
    if (regexp.maestro(input)) return { name: 'Maestro', counts: [16] } // Maestro can vary; update if needed
    if (regexp.uatp(input)) return { name: 'UATP', counts: [15] }
    if (regexp.isracart(input)) return { name: 'Isracard', counts: [8, 9] } // check~~~~~~~~~~~~~~~~~~~
    return null
}

const dispatchEventErrors = element => {
    element.focus()
    element.value = ''
    element.dispatchEvent(new Event('change'))
}

////// this function is for using in cardcom constructor only, need paste this manually in cardcom

// <script type="text/javascript" defer>
const lockThis = async (submit, { hasMessages, messages }) => {
    const possible_errors = {
        card_number_error: { value: 'מספר כרטיס שגוי', element: document.querySelector('.number__err') },
        need_card_num: { value: 'מספר כרטיס אשראי שדה חובה', element: document.querySelector('.number__err') },
        need_cvv: { value: 'מספר CVV חובה', element: document.querySelector('.cvv__err') },
        need_ide: { value: 'ת.ז. שדה חובה', element: document.querySelector('.identity__err') },
        need_name: { value: 'שם בעל הכרטיס חובה', element: 'unknown' },
        need_terms: { value: 'יש לסמן קריאה והסכמה לתקנון', element: 'unknown' }
    }

    document.getElementById('PopUpRTL').style.display = 'none'

    await submit()

    if (!hasMessages()) return console.log('Error not found')

    messages().map(({ message }) => {
        console.log('error message: ', message)
        const errorKey = Object.keys(possible_errors).find(key => possible_errors[key].value === message)

        if (!errorKey) return console.log('Error key not found')
        if (typeof possible_errors[errorKey].element == 'string') return console.log('element not in use')

        possible_errors[errorKey].element.style.visibility = 'visible'
    })
}
// </script>

export { images_src, titles, regexp, isIframe, dev_titles_loader, dispatchEventErrors, error_handler, identity_validator, setPageTitles, luhn_algorithm_check, isracard_algorithm_check, isKnowCard }
