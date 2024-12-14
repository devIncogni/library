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
