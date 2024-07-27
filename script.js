// #region Test

// #endregion Test

// #region Dialog Form Logic

const addBookBtn = document.querySelector("#addBooks");

addBookBtn.addEventListener("click", (event) => {
  addBookDialog.showModal();
});

const addBookDialog = document.querySelector("#addBookForm");
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
    addBookToLibrary(newBook);
    createCard();
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

console.log(myLibrary);

// const hp = new Book("HP", "JK", "22", true);
// hp.addBookToLibrary();

// console.log(myLibrary);

// #endregion Library data

// #region Add DOM card elements

const mainContainer = document.querySelector("#mainContainer");

function createCard() {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-index", myLibrary.length - 1);

  let divList = createDiv([
    "titleHolder",
    "authorHolder",
    "pageNumber",
    "readingStatus",
    "btnsHolder",
  ]);

  giveContent(divList, myLibrary.length - 1);

  let btnDivList = createDiv(["delCard", "toggleRead"]);
  btnDivList[0].textContent = "Delete";

  if (divList[3].textContent == "false") {
    btnDivList[1].textContent = "Mark Read";
    divList[3].textContent = "Not Read";
  } else {
    btnDivList[1].textContent = "Didn't Read";
    divList[3].textContent = "Read";
  }

  btnDivList.forEach((element) => {
    divList[divList.length - 1].appendChild(element);
  });

  divList.forEach((element) => {
    card.appendChild(element);
  });

  mainContainer.appendChild(card);
}

function createDiv(classNameArray) {
  let divElement = [];
  let cardChild;
  for (let i = 0; i < classNameArray.length; i++) {
    cardChild = document.createElement("div");
    cardChild.classList.add(classNameArray[i]);

    divElement.push(cardChild);
  }

  return divElement;
  // document.createElement('div');
}

function giveContent(divList, index) {
  let j = 0;
  for (const key in myLibrary[index]) {
    if (Object.hasOwnProperty.call(myLibrary[index], key)) {
      divList[j].textContent = myLibrary[index][key];
      if ((j == 2)) {
        divList[j].textContent += " Pages";
      }
      j++;
    }
  }
}

// #endregion Add DOM card elements
