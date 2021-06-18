// ADD modal Related
const addMovieModal = document.getElementById("add-modal");
const cancelAddMovieBtn = addMovieModal.querySelector("#cancle-btn");
const confirmAddBtn = cancelAddMovieBtn.nextElementSibling;

// DELETE modal Related
const deleteMovieModal = document.getElementById("delete-modal");
const cancelDeleteMovieBtn =
  deleteMovieModal.querySelector("#delete-cancleBtn");
let confirmDeleteBtn = cancelDeleteMovieBtn.nextElementSibling;

// General
const addMovieBtn = document.getElementById("add-Btn");
const backdropOverlay = document.querySelector(".backdrop_overlay");
const userInput = document.querySelectorAll("#add-modal input");
const msgValidate = document.getElementById("msg-validate");
const entryText = document.getElementById("entry-text");
const main = document.getElementById("main");
const movieList = document.querySelector(".movie_list");

const cl = console.log;
const movies = [];

const updateUI = () => {
  if (movies.length != 0) {
    entryText.style.display = "none";
  } else {
    entryText.style.display = "block";
  }
};

const closeDeleteMovieModal = () => {
  cl("CANCLE -> CLICKED");
  deleteMovieModal.classList.remove("isVisible");
  toggleBackdrop();
};

const deleteMovie = (id) => {
  cl("clicked-> Delete Movie");
  let requiredID;
  let flag = false;
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      requiredID = i;
      flag = true;
      break;
    }
  }
  if (flag) {
    cl(
      "Element Found at ",
      requiredID,
      " where ",
      id,
      " === ",
      movies[requiredID].id,
      " and TITLE is ",
      movies[requiredID].title
    );
    movies.splice(requiredID, 1);
    movieList.removeChild(movieList.children[requiredID]);
  } else {
    cl("Element not found");
    cl(movies[0].id, "!==", id);
  }
  updateUI();
  closeDeleteMovieModal();
};

const deleteMovieElementHandler = (id) => {
  toggleBackdrop();
  deleteMovieModal.classList.add("isVisible");

  confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true));
  confirmDeleteBtn = cancelDeleteMovieBtn.nextElementSibling;

  confirmDeleteBtn.addEventListener("click", deleteMovie.bind(null, id));
};

const renderNewMovieElement = (title, id, url, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.classList.add("movie_element");
  newMovieElement.classList.add("card");
  newMovieElement.innerHTML = `<div class="movie_img">
    <img src="${url}" alt="${title}-IMAGE" />
  </div>
  <div class="movie_info">
      <h2>${title}</h2>
      <p>${rating}/5 🌟</p>
  </div>
    `;

  movieList.insertAdjacentElement("beforeend", newMovieElement);
  newMovieElement.addEventListener(
    "click",
    deleteMovieElementHandler.bind(null, id)
  );
};

const clearMovieInput = () => {
  for (const input of userInput) {
    input.value = "";
  }
  if (msgValidate.classList.contains("isVisible")) {
    msgValidate.classList.remove("isVisible");
  }
};
const toggleBackdrop = () => {
  backdropOverlay.classList.toggle("isVisible");
};

const closeAddMovieModal = () => {
  addMovieModal.classList.remove("isVisible");
};

const showAddMovieModal = () => {
  toggleBackdrop();
  addMovieModal.classList.add("isVisible");
};

const cancleAddModalHandler = () => {
  clearMovieInput();
  closeAddMovieModal();
  toggleBackdrop();
};

// const cancleDeleteModalHandler = () => {
//     // clearMovieInput();
//     closeDeleteMovieModal();
//     toggleBackdrop();
// };

const backdropClickHandler = () => {
  clearMovieInput();
  closeAddMovieModal();
  closeDeleteMovieModal();
};

const addMovieHandler = () => {
  const titleValue = userInput[0].value;
  const imageURL = userInput[1].value;
  const userRating = +userInput[2].value;

  //  IF Wrong Input => Message
  if (
    titleValue.trim() === "" ||
    imageURL.trim() === "" ||
    +userRating < 1 ||
    +userRating > 5
  ) {
    msgValidate.classList.add("isVisible");
    return;
  } else if (
    (titleValue.trim() !== "" ||
      imageURL.trim() !== "" ||
      +userRating >= 1 ||
      +userRating <= 5) &&
    msgValidate.classList.contains("isVisible")
  ) {
    msgValidate.classList.remove("isVisible");
  }

  const newMovie = {
    title: titleValue,
    id: Math.random().toString(),
    image: imageURL,
    rating: +userRating,
  };

  movies.push(newMovie);
  cl(movies);
  updateUI();
  renderNewMovieElement(
    newMovie.title,
    newMovie.id,
    newMovie.image,
    newMovie.rating
  );
  clearMovieInput();
  closeAddMovieModal();
  toggleBackdrop();
};
// Event Listeners
addMovieBtn.addEventListener("click", showAddMovieModal);

cancelAddMovieBtn.addEventListener("click", cancleAddModalHandler);

cancelDeleteMovieBtn.addEventListener("click", closeDeleteMovieModal);

backdropOverlay.addEventListener("click", backdropClickHandler);

confirmAddBtn.addEventListener("click", addMovieHandler);
