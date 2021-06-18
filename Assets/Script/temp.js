const sectionElement = document.createElement("section");
const titleElement = document.createElement("h1");
const urlElement = document.createElement("h2");
const ratingElement = document.createElement("h2");
sectionElement.classList.add("card")
sectionElement.classList.add("movie-card")
titleElement.innerText=title;
urlElement.innerText=url;
ratingElement.innerText=rating;

entryText.insertAdjacentElement("afterend",sectionElement);
sectionElement.append(titleElement);
titleElement.insertAdjacentElement("afterend",urlElement);
urlElement.insertAdjacentElement("afterend",ratingElement);