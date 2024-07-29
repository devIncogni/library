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
    addElementsToCard(myLibrary.length, subDivClasses);
    updateCardContent(myLibrary.length, newBook);
    initCardBtns(myLibrary.length, btnHolderClasses);

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

function createCard() {
  let card = document.createElement("div");

  card.classList.add("card");
  card.setAttribute("data-index", myLibrary.length);

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
        subDiv[i].textContent = book[key] == "true" ? "Read" : "Not Read";
      }

      i++;
    }
  }
}

function initCardBtns(cardIndex, btnClassList) {
  let card = document.querySelector(`div[data-index = "${cardIndex}"]`);
  let btnsHolder = card.querySelector(".btnsHolder");
  let readStatus = card.querySelector(".readingStatus");

  let delCard = document.createElement("div");
  delCard.classList.add("delCard");
  delCard.textContent = "Delete";

  let toggleRead = document.createElement("div");
  toggleRead.classList.add("toggleRead");
  toggleRead.textContent =
    readStatus.textContent == "Read" ? "Mark Unread" : "Mark Read";

  btnsHolder.appendChild(delCard);
  btnsHolder.appendChild(toggleRead);
}

// function createCard() {
//   let card = document.createElement("div");
//   card.classList.add("card");
//   card.setAttribute("data-index", myLibrary.length - 1);

//   let divList = createDiv([
//     "titleHolder",
//     "authorHolder",
//     "pageNumber",
//     "readingStatus",
//     "btnsHolder",
//   ]);

//   giveContent(divList, myLibrary.length - 1);

//   let btnDivList = createDiv(["delCard", "toggleRead"]);
//   btnDivList[0].textContent = "Delete";

//   if (divList[3].textContent == "false") {
//     btnDivList[1].textContent = "Mark Read";
//     divList[3].textContent = "Not Read";
//   } else {
//     btnDivList[1].textContent = "Didn't Read";
//     divList[3].textContent = "Read";
//   }

//   btnDivList.forEach((element) => {
//     divList[divList.length - 1].appendChild(element);
//   });

//   divList.forEach((element) => {
//     card.appendChild(element);
//   });

//   mainContainer.appendChild(card);
// }

// function createDiv(classNameArray) {
//   let divElement = [];
//   let cardChild;
//   for (let i = 0; i < classNameArray.length; i++) {
//     cardChild = document.createElement("div");
//     cardChild.classList.add(classNameArray[i]);

//     divElement.push(cardChild);
//   }

//   return divElement;
//   // document.createElement('div');
// }

// function giveContent(divList, index) {
//   let j = 0;
//   for (const key in myLibrary[index]) {
//     if (Object.hasOwnProperty.call(myLibrary[index], key)) {
//       divList[j].textContent = myLibrary[index][key];
//       if (j == 2) {
//         divList[j].textContent += " Pages";
//       }
//       j++;
//     }
//   }
// }

// #endregion Add DOM card elements

// #region Edit DOM card elements

let deleteBtnArr = [...document.querySelectorAll(".delCard")];

deleteBtnArr.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(btn.parentElement.parentElement);
    btn.parentElement.parentElement.remove();
  });
});

let toggleReadBtn = [...document.querySelectorAll(".toggleRead")];

toggleReadBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(btn.parentElement.parentElement);
    let readStatus =
      btn.parentElement.parentElement.querySelector(
        ".readingStatus"
      ).textContent;

    btn.parentElement.parentElement.querySelector(
      ".readingStatus"
    ).textContent = readStatus == "Read" ? "Not Read" : "Read";
    let index = btn.parentElement.parentElement.dataset.index;

    myLibrary[index][hasRead] =
      myLibrary[index][hasRead] == true ? false : true;
  });
});

// #endregion Edit DOM card elements
