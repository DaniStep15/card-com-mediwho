const { images_src, titles, regexp } = {
    images_src: {
        loading_spinner: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=cb1ad8a2-8166-469a-92fe-4f5f5305f7d0',
        a_e_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=e77d2ae0-6ede-49d9-88ad-374d8d07786e',
        a_e_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=1af838c5-668e-42c9-beca-673a91c84a67',
        card_map: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=1fef518b-cf2f-431c-b4dd-8b4ca6a379fc',
        chip: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=a46ad25b-3e71-43ba-b36b-227d1ab93b52',
        circles: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=f230473e-c3d2-45f4-a11e-e6623c12b1f3',
        id_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=7f8622e7-8894-4974-b633-9a7388a551ce',
        m_card_icon: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=9e9b7ec5-4257-480e-9a7a-68a598aeb12e',
        m_card_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=87c7256d-9662-4fad-a219-b40bf5ef0a0c',
        no_name_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=50f7f223-89ad-49b2-a7c1-9b06e3edb961',
        pattern: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=882a30f6-ca56-4900-8af4-13f067b85c7e',
        robot: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=3edb5c6b-ec53-4a22-9162-e8da4df99e74',
        visa_logo: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=54141311-3830-422a-b5bf-d42d831180dd',
        visa_card: 'https://secure.cardcom.solutions/LoadImage.ashx?c=1&g=9d53e231-9c77-4e84-af7a-8655ab7ddbd7'
    },
    titles: {
        temp__price: '₪144.00'.replace(/\.\d+$/, ''),
        temp_link: 'הסליקה מתבצעת דרך חברת קארדקום בע"מ',
        temp__name: 'אלי כהן',
        lines__card: '----------------',
        lines__date: '----',
        lines__cvv: '---'
    },
    regexp: {
        visa: value => /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value),
        mastercard: value => /^5[1-5]/.test(value), // 5425 2334 3010 9903
        amex: value => /^3[47]/.test(value), // 3742 4545 5400 126
        discover: value => /^(?:6(?:011|5[0-9]{2})[0-9]{12})$/.test(value), // Discover (e.g., 6011 2345 6789 0123)
        diners: value => /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/.test(value), // Diners Club (e.g., 3056 9309 0259 04)
        jcb: value => /^(?:35[2-8][0-9]{13})$/.test(value), // JCB (e.g., 3528 0000 0000 0000)
        unionpay: value => /^(?:62[0-9]{14,17})$/.test(value), // China UnionPay (e.g., 6221 2345 6789 0000)
        maestro: value => /^(?:5[06789]|6[389])[0-9]{0,15}$/.test(value), // Maestro (e.g., 6759 1234 5678 9012 345)
        uatp: value => /^(?:1[0-9]{14})$/.test(value) // UATP (e.g., 1234 5678 9012 345)
    }
}

const setPageTitles = () => {
    console.log(document.querySelector('.identity__logo'), 'img')
    console.log(document.querySelector('.checkbox__link'), 'text')

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
    document.querySelectorAll('.map__img').forEach(element => {
        element.setAttribute('data-bind', `attr: {src:'${images_src?.card_map}'}`)
    })
    document.querySelector('.chip__img').setAttribute('data-bind', `attr: {src:'${images_src?.chip}'}`)
    document.querySelector('.type__img').setAttribute('data-bind', `attr: {src:'${images_src?.visa_card}'}`)
    document.querySelector('.input__img_card').setAttribute('data-bind', `attr: {src:'${images_src?.no_name_card}'}`)
    document.querySelector('.identity__logo').setAttribute('data-bind', `attr: {src:'${images_src?.id_logo}'}`)
    document.querySelector('.loader__element_image').setAttribute('data-bind', `attr: {src:'${images_src?.loading_spinner}'}`)
}

const isIframe = window.location.pathname.includes('External')

const dev_titles_loader = [
    { selector: '.content__price', title: titles?.temp__price, command: 'innerText' },
    { selector: '.cardcomText', title: titles?.temp_link, command: 'innerText' },
    { selector: '.holder__name', title: titles?.temp__name, command: 'value' }
]

// functions
const error_handler = (elem, type) => (elem.style.visibility = type)

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

export { images_src, titles, regexp, isIframe, dev_titles_loader, error_handler, identity_validator, setPageTitles }
