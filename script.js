const bookLib = [];

function Book(name, author, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLib(name, author, pages, readStatus) {
  bookLib.push(new Book(name, author, pages, readStatus));
}

// #region Dialog functionality

const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("#close");

closeBtn.addEventListener("click", (event) => {
  dialog.close();
  // alert("close");
  event.preventDefault();
});

const openBtn = document.querySelector("#addBook");

openBtn.addEventListener("click", (event) => {
  dialog.showModal();
});



// #endregion Dialog functionality
