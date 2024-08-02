// #region Test

// #endregion Test

// #region Dialog Form Logic

const addBookBtn = document.querySelector("#addBooks");
const addBookDialog = document.querySelector("#addBookForm");

addBookBtn.addEventListener("click", (event) => {
  addBookDialog.showModal();
});

const form = document.querySelector("#addBookForm > form");
const closeBtn = document.querySelector("#close");
const submitBtn = document.querySelector("#submit");

const inputRecdArr = document.querySelectorAll("#addBookForm input");

closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookDialog.close();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) {
    return;
  } else {
    var newBook = new Book(
      inputRecdArr[0].value,
      inputRecdArr[1].value,
      inputRecdArr[2].value,
      inputRecdArr[3].checked
    );

    createCard(myLibrary.length);
    addElementsToCard(myLibrary.length, subDivClasses);
    updateCardContent(myLibrary.length, newBook);
    initCardBtns(myLibrary.length, btnHolderClasses);

    addBookToLibrary(newBook);

    addBookDialog.close();
    form.reset();
  }
});

// #endregion Dialog Form Logic

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

Book.prototype.readToggle = function () {
  if (this.hasRead) {
    this.hasRead = false;
  } else {
    this.hasRead = true;
  }
};

// console.log(myLibrary);

// const hp = new Book("HP", "JK", "22", true);
// hp.addBookToLibrary();

// console.log(myLibrary);

// #endregion Library data

// #region Add DOM card elements

const mainContainer = document.querySelector("#mainContainer");
const subDivClasses = [
  "titleHolder",
  "authorHolder",
  "pageNumber",
  "readingStatus",
  "btnsHolder",
];
const btnHolderClasses = ["delCard", "toggleRead"];

function createCard(dataIndex) {
  let card = document.createElement("div");

  card.classList.add("card");
  card.setAttribute("data-index", dataIndex);

  mainContainer.appendChild(card);
}

function addElementsToCard(cardIndex, classList) {
  let card = document.querySelector(`div[data-index="${cardIndex}"]`);

  console.log(card);

  classList.forEach((subClass) => {
    let subDiv = document.createElement("div");
    subDiv.classList.add(subClass);
    card.append(subDiv);
  });
}

function updateCardContent(cardIndex, book) {
  let card = document.querySelector(`div[data-index="${cardIndex}"]`);
  let subDiv = [...card.children];
  let i = 0;

  for (const key in book) {
    if (Object.hasOwnProperty.call(book, key)) {
      subDiv[i].textContent = book[key];

      if (key == "pages") {
        subDiv[i].textContent += " Pages";
      }

      if (key == "hasRead") {
        subDiv[i].textContent =
          book[key].toString() == "true" ? "Read" : "Not Read";
      }

      i++;
    }
  }
}

function initCardBtns(cardIndex, btnClassList) {
  let card = document.querySelector(`div[data-index = "${cardIndex}"]`);
  let btnsHolder = card.querySelector(".btnsHolder");
  let readingStatus = card.querySelector(".readingStatus");

  let delCard = document.createElement("div");
  delCard.classList.add("delCard");
  delCard.textContent = "Delete";

  let toggleRead = document.createElement("div");
  toggleRead.classList.add("toggleRead");
  toggleRead.textContent =
    readingStatus.textContent == "Read" ? "Mark Unread" : "Mark Read";

  btnsHolder.appendChild(delCard);
  btnsHolder.appendChild(toggleRead);
}

// #endregion Add DOM card elements

// #region Edit DOM card elements

// #endregion Edit DOM card elements
