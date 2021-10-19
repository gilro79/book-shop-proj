'use strict'
const KEY = 'books';
const PAGE_SIZE = 10;
var gPageIdx = 0;
var gBooks = [];
var gFilterSearchBy = '';
_createBooks();

function addBook(bookName, bookPrice, bookUrl) {
    var book = _createBook(bookName, bookPrice, bookUrl)
    gBooks.push(book);
    _saveBooksToStorage();
}

function getBooks() {
    var books = gBooks;

    if (gFilterSearchBy) {
        books = gBooks.filter(function (book) {

            return book.name.toLowerCase().includes(gFilterSearchBy.toLowerCase())
        })
    }
    const fromIdx = gPageIdx * PAGE_SIZE;
    books = books.slice(fromIdx, fromIdx + PAGE_SIZE);
    return books;
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = []
        books.push(_createBook('Shogun', 89, 'img/shogun.png'))
        books.push(_createBook('Moby-dick', 75, 'img/moby-dick.png'))
        books.push(_createBook('Oliver twist', 55, 'img/oliver twist.png'))
    }
    gBooks = books;
    _saveBooksToStorage();
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    book.price = newPrice;
    _saveBooksToStorage();
}

function rateBook(val, bookName) {
    var book = gBooks.find(function (book) {
        return bookName === book.name
    })
    book.rating.votes += 1;
    book.rating.sum += +val;
    book.rating.avg = (book.rating.sum / book.rating.votes).toFixed(2);
    _saveBooksToStorage();
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function sortBy(sortKey) {
    gBooks.sort(function (a, b) {
        if (sortKey === 'name') {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
        else {
            return a.price - b.price;
        }

    })
}

function filterBooks(bookName) {
    gFilterSearchBy = bookName;
}

function getBookByName(bookName) {
    var book = gBooks.find(function (book) {
        return bookName === book.name
    })
    return book
}

function _createBook(bookName, bookPrice, bookUrl) {
    return {
        id: makeId(),
        name: bookName,
        price: bookPrice,
        imgUrl: bookUrl,
        rating: {
            votes: 0,
            sum: 0,
            avg: 0
        }
    }
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}