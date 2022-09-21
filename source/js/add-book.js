/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-plusplus */
// ====================================== My Code ====================
const bookContainer = document.getElementById('book-container');
const bookName = document.getElementById('title');
const bookAuthor = document.getElementById('author');
let bookString;
let bookArrayObject;
let buttonList = [];

class BookBluePrint {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

class BookStoreList {
  constructor() {
    this.bookArray = [];
  }

  addBook(title, author) {
    const addNewBook = new BookBluePrint(title, author);
    this.bookArray.push(addNewBook);
    localStorage.setItem('BOOKS', JSON.stringify(this.bookArray));
    bookContainer.innerText = '';
    window.location.reload();
  }

  displayBooks() {
    // check if we have already have some book in local storge.
    if (localStorage.getItem('BOOKS')) {
      bookString = localStorage.getItem('BOOKS');
      bookArrayObject = JSON.parse(bookString);
      this.bookArray = bookArrayObject;
    }
    if (this.bookArray.length > 0) {
      this.bookArray.forEach((item) => {
        const elementDiv = document.createElement('div');
        const elementNode = document.createElement('p');
        const btnElement = document.createElement('button');
        elementDiv.setAttribute('id', 'book-info');
        elementNode.setAttribute('class', 'p-tag');
        btnElement.setAttribute('class', 'close-btn');
        // Get Title and Author
        elementNode.appendChild(document.createTextNode(`${item.name} by ${item.author}`));
        btnElement.appendChild(document.createTextNode('Remove'));
        // Add: <p> and <button> tag in page
        bookContainer.appendChild(elementDiv);
        elementDiv.append(elementNode, btnElement);
        // Empty the input after adding the book
        bookName.value = '';
        bookAuthor.value = '';
        // remove Button logic
      });
    } else {
      const errorNode = document.createElement('p');
      errorNode.setAttribute('class', 'error');
      errorNode.appendChild(document.createTextNode('No record found. Please store some books first.'));
      bookContainer.appendChild(errorNode);
    }
    buttonList = Array.from(document.querySelectorAll('button'));
  }

  removeElement() {
    buttonList.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.bookArray.splice(index, 1);
        localStorage.setItem('BOOKS', JSON.stringify(this.bookArray));
        this.displayBooks();
        window.location.reload();
      });
    });
  }
}

const myBooks = new BookStoreList();
myBooks.displayBooks();
myBooks.removeElement();

// Add Book Event Lessoner
document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  myBooks.addBook(bookName.value, bookAuthor.value);
  myBooks.displayBooks();
});
