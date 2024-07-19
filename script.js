// #region Test

const addBookBtn = document.querySelector("#addBooks");
const addBookDialog = document.querySelector("#addBookForm");
const closeBtn = document.querySelector("#close");
const submitBtn = document.querySelector("#submit");

addBookBtn.addEventListener("click", (event) => {
  addBookDialog.showModal();
});

closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookDialog.close();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookDialog.close();
});

addBookDialog.addEventListener("close", (event) => {});
// #endregion Test

// #region Library data

const myLibrary = [];

function Book(name, author, pages, hasRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

const addBookToLibrary = function (bookName) {
  myLibrary.push(bookName);
  return;
};

// const hp = new Book("HP", "JK", "22", true);
// hp.addBookToLibrary();

// console.log(myLibrary);

// #endregion Library data
