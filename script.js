class Library {
  // #_bookLib = [];
  constructor() {
    this.bookLib = [];
  }

  addBookToLib(Book) {
    this.bookLib.push(Book);
  }

  removeBookAtIndex(i) {
    this.bookLib.splice(i, 1);
  }
}

class Booka {
  constructor(name, author, pages, readStatus) {
    this.bookTitle = name;
    this.authorName = author;
    this.pageNumber = pages;
    this.readStatus = readStatus;
  }

  toggleRead() {
    this.readStatus = this.readStatus == "Read" ? "Not Read" : "Read";
  }
}

class DialogBox {
  constructor(dialogBody, openButtons, closeButtons) {
    this.dialogBody = dialogBody;
    this.openButtons = [...openButtons];
    this.closeButtons = [...closeButtons];

    this.initialise();
  }

  initialise() {
    this.openButtons.forEach((openButton) => {
      openButton.addEventListener("click", () => this.openDialog());
      console.log("adsad");
    });

    this.closeButtons.forEach((closeButton) => {
      closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.closeDialog();
      });
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
    this.inputFields = [...formBody.querySelectorAll("input")];
  }

  resetForm() {
    this.formBody.reset();
  }

  isValidForm() {
    return this.formBody.reportValidity();
  }

  get formData() {
    let formDataObj = {};
    for (let i = 0; i < this.inputFields.length; i++) {
      if (
        this.inputFields[i].name in formDataObj &&
        !this.inputFields[i].checked
      ) {
        continue;
      } else {
        formDataObj[this.inputFields[i].name] = this.inputFields[i].value;
      }
    }
    return formDataObj;
  }
}

class DialogFormEventsService {
  constructor(FormElement, DialogBoxElement, LibraryElement) {
    this.LibraryElement = LibraryElement;
    this.DialogBoxElement = DialogBoxElement;
    this.FormElement = FormElement;
    this.submitButtons = [...FormElement.formBody.querySelectorAll("#submit")];
    this.resetButtons = [...FormElement.formBody.querySelectorAll("#resetBtn")];

    this.addEventsToReset();
    this.addEventsToSubmit();
  }

  addEventsToReset() {
    this.resetButtons.forEach((resetButton) => {
      resetButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.FormElement.resetForm();
      });
    });
  }

  addEventsToSubmit() {
    this.submitButtons.forEach((submitButton) => {
      submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        // if (!this.FormElement.isValidForm()) {
        //   return;
        // }

        // this.DialogBoxElement.closeDialog();

        if (
          customValidation.validateBookName() &&
          customValidation.validateAuthorName() &&
          customValidation.validatePageNum()
        ) {
          this.LibraryElement.addBookToLib(
            new Booka(
              this.FormElement.formData.bookName,
              this.FormElement.formData.authorName,
              this.FormElement.formData.pageNum,
              this.FormElement.formData.read
            )
          );
          LDDS.renderDisplay();
          this.DialogBoxElement.closeDialog();
          this.FormElement.resetForm();

          return this.FormElement.formData;
        }
      });
    });
  }

  // addEventsTo
}

class CardEventsService {
  constructor(Book, index, LibraryElement) {
    this.Book = Book;
    this.bookIndex = index;
    this.LibraryElement = LibraryElement;
    this.createCard();
    this.initialiseCard();
  }

  createCard() {
    const mainContentdiv = document.querySelector(".mainContent");
    const div = document.createElement("div");
    div.setAttribute("class", "books");
    div.setAttribute("data-booknumber", this.bookIndex);
    mainContentdiv.appendChild(div);

    for (const key in this.Book) {
      let p = document.createElement("p");
      p.setAttribute("class", key);

      if (key == "pageNumber") {
        p.textContent = "Pages: " + this.Book[key];
      } else {
        p.textContent = this.Book[key];
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

    return div;
  }

  initialiseCard() {
    let book = document.querySelector(
      `div[data-booknumber="${this.bookIndex}"`
    );

    let deleteBtn = book.querySelector("#deleteBook");
    let readBtn = book.querySelector("#toggleRead");
    let bookIndex = book.getAttribute("data-booknumber");

    deleteBtn.addEventListener("click", (event) => {
      this.LibraryElement.removeBookAtIndex(this.bookIndex);
      LDDS.renderDisplay();
    });

    readBtn.addEventListener("click", (event) => {
      this.Book.toggleRead();
      LDDS.renderDisplay();
      // console.log(this.Book);
    });
  }
}

class LibraryDOMDisplayService {
  constructor(LibraryElement) {
    this.LibraryElement = LibraryElement;
  }

  renderDisplay() {
    this.clearAllCards();
    let i = 0;
    this.LibraryElement.bookLib.forEach((book) => {
      new CardEventsService(book, i++, this.LibraryElement);
    });
  }

  clearAllCards() {
    let mainContent = document.querySelector(".mainContent");
    let books = [...document.querySelectorAll(".books")];
    books.forEach((book) => {
      mainContent.removeChild(book);
    });
  }
}

const Lib = new Library();
const dialogForm = new Form(document.querySelector(".dialogForm"));
const dialogBox = new DialogBox(
  document.querySelector("dialog"),
  [...document.querySelectorAll(".openDialog")],
  [document.querySelector("#close")]
);
const DFES = new DialogFormEventsService(dialogForm, dialogBox, Lib);
const LDDS = new LibraryDOMDisplayService(Lib);

const customValidation = (function () {
  const bookNameInput = document.querySelector("input#bookName");
  const authorNameInput = document.querySelector("#authorName");
  const pageNumInput = document.querySelector("#pageNum");

  const bookNameErr = document.querySelector(".bookNameErr");
  const authorNameErr = document.querySelector(".authorNameErr");
  const pageNumErr = document.querySelector(".pageNumErr");

  const validateBookName = () => {
    if (bookNameInput.validity.valueMissing) {
      bookNameInput.setCustomValidity("Please Specify Book Name");
      bookNameErr.style.display = "block";
      return false;
    }
    bookNameInput.setCustomValidity("");
    bookNameErr.style.display = "none";
    return true;
  };
  const validateAuthorName = () => {
    if (authorNameInput.validity.valueMissing) {
      authorNameInput.setCustomValidity("Please Specify Author Name");
      authorNameErr.style.display = "block";
      return false;
    }
    authorNameInput.setCustomValidity("");
    authorNameErr.style.display = "none";
    return true;
  };
  const validatePageNum = () => {
    if (pageNumInput.validity.valueMissing) {
      pageNumInput.setCustomValidity("Please Specify Page Numbers");
      pageNumErr.style.display = "block";
      return false;
    }
    pageNumInput.setCustomValidity("");
    pageNumErr.style.display = "none";
    return true;
  };

  return { validateBookName, validateAuthorName, validatePageNum };
})();
