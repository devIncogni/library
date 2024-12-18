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

function openDialogModal(dialog) {
  dialog.showModal();
}

function closeDialogModal(dialog) {
  dialog.close();
}

function resetForm(form) {
  form.reset();
}

function extreactDataFromForm(form) {
  let bookName = form.querySelector("#bookName").textContent;
  let authorName = form.querySelector("#authorName").textContent;
  let pageNum = form.querySelector("#pageNum").textContent;
  let readStatus =
    form.querySelector("#read").checked == true ? "Read" : "Not Read";

  return { bookName, authorName, pageNum, readStatus };
}

const closeBtn = document.querySelector("#close");
const openBtn = document.querySelector("#addBook");
const subBtn = document.querySelector("#submit");
const resetBtn = document.querySelector("#resetBtn");

closeBtn.addEventListener("click", (event) => {
  const dialog = document.querySelector("dialog");
  event.preventDefault();
  closeDialogModal(dialog);
});

openBtn.addEventListener("click", (event) => {
  const dialog = document.querySelector("dialog");
  openDialogModal(dialog);
});

resetBtn.addEventListener("click", (event) => {
  event.preventDefault();
  resetForm(document.querySelector(".dialogForm"));
});

subBtn.addEventListener("click", (event) => {
  // event.preventDefault();
  let form = document.querySelector(".dialogForm");
  if (form.reportValidity() == false) {
    return;
  }
  let bookData = extreactDataFromForm(document);

  addBookToLib(
    bookData.bookName,
    bookData.authorName,
    bookData.pageNum,
    bookData.readStatus
  );

  console.log(bookData);
});

// #endregion Dialog functionality
