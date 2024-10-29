const { images_src, titles, regexp } = {
    images_src: {
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
        visa: value => /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value), /// 4263 9826 4026 9299
        mastercard: value => /^(?:5[1-5][0-9]{14})$/.test(value), // 5425 2334 3010 9903
        amex: value => /^(?:3[47][0-9]{13})$/.test(value), // 3742 4545 5400 126
        discover: value => /^(?:6(?:011|5[0-9]{2})[0-9]{12})$/.test(value), // Discover (e.g., 6011 2345 6789 0123)
        diners: value => /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/.test(value), // Diners Club (e.g., 3056 9309 0259 04)
        jcb: value => /^(?:35[2-8][0-9]{13})$/.test(value), // JCB (e.g., 3528 0000 0000 0000)
        unionpay: value => /^(?:62[0-9]{14,17})$/.test(value), // China UnionPay (e.g., 6221 2345 6789 0000)
        maestro: value => /^(?:5[06789]|6[389])[0-9]{0,15}$/.test(value), // Maestro (e.g., 6759 1234 5678 9012 345)
        uatp: value => /^(?:1[0-9]{14})$/.test(value) // UATP (e.g., 1234 5678 9012 345)
    }
}
const isIframe = window.location.pathname.includes('External')

const dev_titles_loader = [
    { selector: '.content__price', title: titles?.temp__price, command: 'innerText' },
    { selector: '.cardcomText', title: titles?.temp_link, command: 'innerText' },
    { selector: '.holder__name', title: titles?.temp__name, command: 'value' }
]

export { images_src, titles, regexp, isIframe, dev_titles_loader }
