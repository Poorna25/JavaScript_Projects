class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
         <td>${book.title}</td> 
         <td>${book.author}</td> 
         <td>${book.isbn}</td> 
         <td><a href = '#' class = 'delete'>X</a></td> 
         `;

        list.appendChild(row);
    }

    deleteBook(target) {
        if (target.className == 'delete') {
            target.parentElement.parentElement.remove()
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message, className) {
        const status = document.createElement('div');
        const form1 = document.getElementById('book-form');
        const totalDiv = document.querySelector('.container');
        status.className = className;
        status.appendChild(document.createTextNode(message));

        totalDiv.insertBefore(status, form1);

        setTimeout(function () {
            status.style.display = 'none';
        }, 3000);
    }
}

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book) {

        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(bookItem) {
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (bookItem == book.isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();
            ui.addBookToList(book);
        });
    }
}

document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();



    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all the fields', 'error');
    }
    else {
        ui.showAlert('Book added', 'success');

        ui.addBookToList(book);

        Store.addBooks(book);



        ui.clearFields();



    }



    e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();

    ui.deleteBook(e.target);
    if (e.target.className == 'delete') {
        ui.showAlert('Book removed', 'success');
        Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    }
    e.preventDefault();

})

document.addEventListener('DOMContentLoaded', Store.displayBooks());