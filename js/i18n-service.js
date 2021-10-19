'use strict';

var gTrans = {
    title: {
        en: 'Books Store',
        he: 'חנות ספרים'
    },
    'new-book': {
        en: 'Create new book',
        he: 'יצירת ספר חדש'
    },
    'search-bar': {
        en: 'Search for a book..',
        he: 'חיפוש ספר במאגר'
    },
    'book-id': {
        en: 'Id',
        he: 'מזהה'
    },
    'book-title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'Read',
        he: 'מידע'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'הסר'
    },
    'page-btn': {
        en: 'Next Page',
        he: 'לדף הבא'
    },
    'new-book-name-lable': {
        en: '* Book name:',
        he: '* שם הספר:'
    },
    'new-book-name': {
        en: 'Book name',
        he: 'שם הספר'
    },
    'new-book-price-lable': {
        en: '* Book price:',
        he: '* מחיר:'
    },
    'new-book-price': {
        en: 'Book price',
        he: 'מחיר'
    },
    'new-book-url-lable': {
        en: 'Book url:',
        he: 'קישור לתמונה:'
    },
    'new-book-url': {
        en: 'Book url',
        he: 'קישור לתמונה'
    },
    'make-new-book': {
        en: 'Add new book',
        he: 'הוסף ספר'
    },
    'modal-desc': {
        en: 'Description:',
        he: 'תיאור:'
    },
    'modal-rate-btn': {
        en: 'Rate:',
        he: 'דרג:'
    },
    'modal-rating': {
        en: 'Rating:',
        he: 'דירוג:'
    },
    'modal-close-btn': {
        en: 'Close',
        he: 'סגור'
    },
}

var gCurrLang = 'en';

function setLang(lang) {
    gCurrLang = lang;
}

function doTrans() {
    var eltrans = document.querySelectorAll('[data-trans]')
    eltrans.forEach((el) => {
        var elTrans = el.dataset.trans
        //  support placeholder    
        if (el.nodeName === 'INPUT') {
            el.placeholder = getTrans(elTrans)
        } else {
            el.innerText = getTrans(elTrans)
        }
    })
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans.en;
    return txt;
}