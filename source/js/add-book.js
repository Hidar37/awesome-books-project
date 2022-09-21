/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-plusplus */
// ====================================== My Code ====================
const bookContainer = document.getElementById('book-container');
const bookName = document.getElementById('title');
const bookAuthor = document.getElementById('author');
let bookString;
let bookArrayObject;
let bookArray = [];

// check if we have already have some book in local storge.
if (localStorage.getItem('BOOKS')) {
  bookString = localStorage.getItem('BOOKS');
  bookArrayObject = JSON.parse(bookString);
  bookArray = bookArrayObject;
}

function addBook() {
  const bookObject = {};
  bookObject.title = bookName.value;
  bookObject.author = bookAuthor.value;
  bookArray.push(bookObject);
  localStorage.setItem('BOOKS', JSON.stringify(bookArray));
  bookContainer.innerText = '';
}

function removeElement(elment1, elment2) {
  elment1.remove();
  elment2.remove();
}

function displayBooks() {
  if (bookArray.length > 0) {
    bookArray.forEach((item, index) => {
      const elementDiv = document.createElement('div');
      const elementNode = document.createElement('p');
      const btnElement = document.createElement('button');
      elementDiv.setAttribute('id', 'book-info');
      elementNode.setAttribute('class', 'p-tag');
      btnElement.setAttribute('class', 'close-btn');
      // Get Title and Author
      elementNode.appendChild(document.createTextNode(`${item.title} by ${item.author}`));
      btnElement.appendChild(document.createTextNode('Remove'));
      // Add: <p> and <button> tag in page
      bookContainer.appendChild(elementDiv);
      elementDiv.append(elementNode, btnElement);
      // Empty the input after adding the book
      bookName.value = '';
      bookAuthor.value = '';
      // remove Button logic
      btnElement.addEventListener('click', () => {
        bookArray = JSON.parse(localStorage.getItem('BOOKS'));
        bookArray.splice(index, 1);
        localStorage.setItem('BOOKS', JSON.stringify(bookArray));
        removeElement(elementNode, btnElement);
        displayBooks();
      });
    });
  } else {
    const errorNode = document.createElement('p');
    errorNode.setAttribute('class', 'error');
    errorNode.appendChild(document.createTextNode('No record found. Please store some books first.'));
    bookContainer.appendChild(errorNode);
  }
}

// Add Book Event Lessoner
document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
  displayBooks();
});
displayBooks();