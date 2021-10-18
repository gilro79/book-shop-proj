'use restrict'



function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(function (book) {
        return `
        <tr>
            <td class="book-id-cell">${book.id}</td>
            <td class="book-name-cell">${book.name}</td>
            <td class="book-price-cell">${book.price}</td>
            <td class="read-cell"><button class="read-btn" onclick="onReadBook('${book.id}')">Read</button></td>
            <td class="update-cell"><button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button></td>
            <td delete-cell><button class="delete-btn" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>
        `
    })
    document.querySelector('.books-rows').innerHTML = strHtmls.join('')
}

function onOpenAddBookModal() {
    var elModal = document.querySelector('.book-info');
    elModal.hidden = false;
}

function onCreateNewBook() {
    const bookName = document.querySelector('.book-name').value;
    const bookPrice = document.querySelector('.book-price').value;
    const bookUrl = document.querySelector('.book-url').value;
    document.querySelector('.book-info').hidden = true;
    document.querySelector('.book-name').value = '';
    document.querySelector('.book-price').value = '';
    document.querySelector('.book-url').value = '';
    if (!bookName || !bookPrice) return;
    addBook(bookName, bookPrice, bookUrl);
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('What is the updated price?');
    if (!newPrice) return;
    updateBook(bookId, newPrice);
    renderBooks();
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('.book-img').innerHTML = `<img src="${book.imgUrl}">`;
    elModal.querySelector('.rating span').innerText = book.rating.avg + ', Votes: ' + book.rating.votes;
    elModal.hidden = false;
}

function onCloseModal() {
    elModal = document.querySelector('.modal');
    // elModal.style.animationName = 'slide-out';
    elModal.hidden = true;
}

function onRatingDown(){
    var elrate = document.querySelector('.reteValue');
    elrate.value -= 1;
    if(elrate.value < 0) elrate.value = 0;
}

function onRatingUp(){
    var elrate = document.querySelector('.reteValue');
    var val = +elrate.value
    val += 1;
    elrate.value = val;
    if(elrate.value > 10) elrate.value = 10;
}

function onRate(){
    var val = document.querySelector('.reteValue').value;
    var bookName = document.querySelector('.modal h3').innerText;
    rateBook(val, bookName);
    var book = getBookByName(bookName);
    document.querySelector('.modal .rating span').innerText = book.rating.avg + ', Votes: ' + book.rating.votes;
    document.querySelector('.reteValue').value = 0;
}

function onSortBy(sortKey){
    sortBy(sortKey);
    renderBooks();
}

function onSearchBook(){
    elSearch = document.querySelector('.search-book input');
    const bookName = elSearch.value;
    console.log('bookName',bookName);
    // if(!bookName) return;
    filterBooks(bookName);
    renderBooks();
}
function onNextPage() {
    nextPage();
    renderBooks();
}
