/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-plusplus */
// ====================================== My Code ====================

// HTML: each section of the page links
const showBook = document.getElementById('show-books');
const addBookBtn = document.getElementById('add-book');

// Show All store Books
function showAllStoredBooks() {
  // Get Data from local storge
  const allBook = JSON.parse(localStorage.getItem('books'));
  for (let x = 0; x < allBook.length; x++) {
    // Add Books data to page
    const addToShowBookSection = `<p>${allBook[x].bookName} by ${allBook[x].bookWriter}</p>
  <button id="remove">Remove</button>
  <hr>`;
    showBook.insertAdjacentHTML('beforeend', addToShowBookSection);
  }
}

// Add Books
function addBook(bookTitle, bookAuthor) {
  // Store Data to local Storge
  const getBook = JSON.parse(localStorage.getItem('books'));
  const bookObject = {
    bookName: bookTitle,
    bookWriter: bookAuthor,
  };
  getBook.push(bookObject);
  localStorage.setItem('books', JSON.stringify(getBook));
  // Add Books data to page
  const addToShowBookSection = `<p>${bookTitle} by ${bookAuthor}</p>
  <button id="remove">Remove</button>
  <hr>`;
  showBook.insertAdjacentHTML('beforeend', addToShowBookSection);
  // Empty the value of inputs 
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
}

// ================================= Main Body ==========================

// show Added book while loading the page
window.addEventListener('load', () => {
  // If: we have all ready books stored show it. 
  if (window.localStorage.getItem('books')) {
    showAllStoredBooks();
  }

  // Else: Create a new local Storage for latter book storing.
  else {
    const bookList = [];
    window.localStorage.setItem('books', JSON.stringify(bookList));
  }
});

// Add Book while Clicking the Add Button
addBookBtn.addEventListener('click', () => {
  // Get The value of input that user have typed
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  addBook(title, author);
});