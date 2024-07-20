// #region Test

const addBookBtn = document.querySelector("#addBooks");
const addBookDialog = document.querySelector("#addBookForm");
const form = document.querySelector("#addBookForm > form");
const closeBtn = document.querySelector("#close");
const submitBtn = document.querySelector("#submit");

const inputRecdArr = document.querySelectorAll("#addBookForm input");

addBookBtn.addEventListener("click", (event) => {
  addBookDialog.showModal();
});

closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookDialog.close();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  var newBook = new Book(
    inputRecdArr[0].value,
    inputRecdArr[1].value,
    inputRecdArr[2].value,
    inputRecdArr[3].checked
  );
  addBookToLibrary(newBook);
  addBookDialog.close();
  form.reset();
});
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

console.log(myLibrary);

// const hp = new Book("HP", "JK", "22", true);
// hp.addBookToLibrary();

// console.log(myLibrary);

// #endregion Library data
