const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const addBtn = document.getElementById('submit-btn');
const listBooks = document.querySelector('.list-books');
let books;

function updateBtns() {
  listBooks.querySelectorAll('button').forEach((element) => {
    element.addEventListener('click', () => books.removeBooks(element));
  });
}

class BookHandling {
  constructor(cBooks) {
    this.cBooks = cBooks;
    this.bookCount = 0;
    this.display();
  }

  display() {
    this.cBooks.forEach((e) => {
      this.bookCount = e.id;
      this.add(e.title, e.author);
    });
    updateBtns();
  }

  removeBooks(btn) {
    this.cBooks = this.cBooks.filter((element) => element.id !== +btn.id);
    localStorage.setItem('collectionOfBooks', JSON.stringify(this.cBooks));
    btn.parentElement.remove();
  }

  add(title, author) {
    const p = document.createElement('p');
    p.textContent = '"'.concat(title, '"', ' by ', author);
    const btn = document.createElement('button');
    btn.id = this.bookCount;
    btn.textContent = 'remove';

    const div = document.createElement('div');
    div.className = 'tag';
    div.append(p, btn);
    listBooks.appendChild(div);
  }

  setBookCount() {
    this.bookCount += 1;
  }

  getBookCount() {
    return this.bookCount;
  }
}

if (localStorage.getItem('collectionOfBooks')) {
  books = new BookHandling(
    JSON.parse(localStorage.getItem('collectionOfBooks') || '[]'),
  );
} else {
  books = new BookHandling([]);
}

addBtn.addEventListener('click', () => {
  books.setBookCount();
  if (!bookTitle.value || !bookAuthor.value) {
    return;
  }

  books.add(bookTitle.value, bookAuthor.value);
  books.cBooks.push({
    id: books.getBookCount(),
    title: bookTitle.value,
    author: bookAuthor.value,
  });
  localStorage.setItem('collectionOfBooks', JSON.stringify(books.cBooks));
  updateBtns();
  bookAuthor.value = '';
  bookTitle.value = '';
});

const list = document.getElementById('list');
const add = document.getElementById('add');
const contact = document.getElementById('contact-me');
const sectionOne = document.getElementById('action-1');
const sectionTwo = document.getElementById('action-2');
const sectionThree = document.getElementById('action-3');

list.addEventListener('click', () => {
  sectionThree.classList.add('action');
  sectionTwo.classList.add('action');
  sectionOne.classList.remove('action');
});

add.addEventListener('click', () => {
  sectionThree.classList.add('action');
  sectionTwo.classList.remove('action');
  sectionOne.classList.add('action');
});

contact.addEventListener('click', () => {
  sectionThree.classList.remove('action');
  sectionTwo.classList.add('action');
  sectionOne.classList.add('action');
});
