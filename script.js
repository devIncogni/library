const bookLib = [];

function Book(name, author, pages, readStatus) {
  this.bookTitle = name;
  this.authorName = author;
  this.pageNumber = pages;
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
  let bookName = form.querySelector("#bookName").value;
  let authorName = form.querySelector("#authorName").value;
  let pageNum = form.querySelector("#pageNum").value;
  let readStatus =
    form.querySelector("#read").checked == true ? "Read" : "Not Read";

  return { bookName, authorName, pageNum, readStatus };
}

const closeBtn = document.querySelector("#close");
const openBtn = document.querySelector("#addBook");
const openBtnHeader = document.querySelector("#addBookHeader");
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

openBtnHeader.addEventListener("click", (event) => {
  const dialog = document.querySelector("dialog");
  openDialogModal(dialog);
});

resetBtn.addEventListener("click", (event) => {
  event.preventDefault();
  resetForm(document.querySelector(".dialogForm"));
});

subBtn.addEventListener("click", () => {
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
  clearAllCards();
  makeAllCards();

  resetForm(document.querySelector(".dialogForm"));
  const dialog = document.querySelector("dialog");
  closeDialogModal(dialog);
});

// #endregion Dialog functionality

// #region Book Card functionality

function createBookCards(bookIndex) {
  const mainContentdiv = document.querySelector(".mainContent");
  const div = document.createElement("div");
  div.setAttribute("class", "books");
  div.setAttribute("data-booknumber", bookIndex);
  mainContentdiv.appendChild(div);

  for (const key in bookLib[bookIndex]) {
    let p = document.createElement("p");
    p.setAttribute("class", key);

    if (key == "pageNumber") {
      p.textContent = "Pages: " + bookLib[bookIndex][key];
    } else {
      p.textContent = bookLib[bookIndex][key];
    }
    div.appendChild(p);
  }

  const bookBtn = document.createElement("div");
  const delbook = document.createElement("div");
  const toggleRead = document.createElement("div");

  bookBtn.setAttribute("class", "bookBtns");
  delbook.setAttribute("id", "deleteBook");
  delbook.textContent = "Delete";
  toggleRead.setAttribute("id", "toggleRead");
  toggleRead.textContent = "Toggle Read";

  bookBtn.appendChild(delbook);
  bookBtn.appendChild(toggleRead);
  div.appendChild(bookBtn);
}

function initialiseBookCards() {
  books = [...document.querySelectorAll(".books")];
  books.forEach((book) => {
    let deleteBtn = book.querySelector("#deleteBook");
    let readBtn = book.querySelector("#toggleRead");
    let bookIndex = book.getAttribute("data-booknumber");

    deleteBtn.addEventListener("click", (event) => {
      deleteBook(bookIndex);
    });

    readBtn.addEventListener("click", (event) => {
      toggleRead(bookIndex);
    });
  });
}

function deleteBook(bookIndex) {
  bookLib.splice(bookIndex, 1);
  clearAllCards();
  makeAllCards();
}

function toggleRead(bookIndex) {
  bookLib[bookIndex].readStatus =
    bookLib[bookIndex].readStatus == "Read" ? "Not Read" : "Read";
  clearAllCards();
  makeAllCards();
}

function clearAllCards() {
  let mainContent = document.querySelector(".mainContent");
  let books = [...document.querySelectorAll(".books")];
  books.forEach((book) => {
    mainContent.removeChild(book);
  });
}

function makeAllCards() {
  let i = 0;
  bookLib.forEach((book) => {
    createBookCards(i);
    initialiseBookCards();
    i++;
  });
}

// #endregion Book Card functionality

class Library {
  #_bookLib = [];

  addBookToLib(Book) {
    this.bookLib.push(Book);
  }

  removeBookAtIndex(i) {
    this.bookLib.splice(i, 1);
  }

  get bookLib() {
    return this.#_bookLib;
  }
}

class Booka {
  #_name;
  #_author;
  #_pages;
  #_readStatus;

  constructor(name, author, pages, readStatus) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  get name() {
    return this.#_name;
  }

  get author() {
    return this.#_author;
  }

  get pages() {
    return this.#_pages;
  }

  get readStatus() {
    return this.#_readStatus;
  }
}

class DialogBox {
  constructor(dialogBody, openButtons = [], closeButtons = []) {
    this.dialogBody = dialogBody;
    this.openButtons = openButtons;
    this.closeButtons = closeButtons;
  }

  initialise() {
    this.openButtons.forEach((openButton) => {
      openButton.addEventListener("click", () => this.openDialog);
    });

    this.closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", () => this.closeDialog);
    });
  }

  openDialog() {
    console.log(this);
    this.dialogBody.showModal();
  }

  closeDialog() {
    this.dialogBody.close();
  }
}

class Form {
  constructor(formBody) {
    this.formBody = formBody;
    this.submitButtons = [...formBody.querySelectorAll("#submit")];
    this.resetButtons = [...formBody.querySelectorAll("#resetBtn")];
    this.inputFields = [...formBody.querySelectorAll("input")];
  }

  getTypeOfInputs(inputType) {
    let typeInputFields = [];
    this.inputFields.forEach((field) => {
      if (field.getAttribute("type") == inputType) {
        textInputFields.push(field);
      }
    });
    return typeInputFields;
  }
}
