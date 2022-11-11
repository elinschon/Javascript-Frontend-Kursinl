"use strict";

let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const cartContainer = document.querySelector(".cartContainer");

//CARDS
const starShipsURL = "https://swapi.dev/api/starships/?format=json";
const vehiclesURL = "https://swapi.dev/api/vehicles/?format=json";
const planetsURL = "https://swapi.dev/api/planets/?format=json";
let id = 0;

const starShipsImage =
  "./images/spaceships/brian-mcgowan-3bETLGHcAUU-unsplash.jpg";
const vehiclesImage =
  "./images/spaceships/chuck-givens-02AQdLh4gP4-unsplash.jpg";
const planetImage = "./images/alexander-andrews-yOIT88xWkbg-unsplash.jpg";

//Ändra dold kundkorg till visible.
const cartButton = document.querySelector(".openCartBtn");
cartButton.addEventListener("click", () => {
  const cartWindow = document
    .getElementById("cartWindow")
    .classList.toggle("showCart");
});

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
} else {
  cart = [];
}

//-------------------HÄMTA DATA FÖR STARSHIPS OCH VEHICLES--------------------------
let getData = async (url, cssClass, image, container) => {
  const res = await fetch(url);
  const data = await res.json();
  const cards = data.results;

  for (let card of cards) {
    card.id = id;
    card.inCart = 0;
    id++;

    //Om det inte finns ett pris slumpas ett pris fram
    if (card.cost_in_credits === "unknown") {
      card.cost_in_credits = Math.floor(Math.random() * 100000000000);
    }

    const cardMarkup = document.createElement("div");
    cardMarkup.classList.add(cssClass);
    cardMarkup.innerHTML = `
      <img src = ${image} alt="" width= 100%>
      <h3>Name:</h3> <p>${card.name}</p>
      <h3>ModeL:</h3> <p>${card.model}</p>
      <h3>Crew:</h3> <p>${card.crew}</p>
      <h3>Passengers:</h3> <p>${card.passengers}</p>
      <h3>Price:</h3> <p>${card.cost_in_credits} credits</p>
      `;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("addToCartBtn");
    addToCartBtn.innerText = "Add to cart";
    card.addToCartBtn = addToCartBtn;

    addToCartBtn.addEventListener("click", () => {
      pushCard(card);
      uppdateLocalStorage();
      numInCart();
      cartMarkup();
    });
    console.log(addToCartBtn.value);
    cardMarkup.append(addToCartBtn);
    document.querySelector(container).append(cardMarkup);
  }
};

//-------------------HÄMTA DATA FÖR PLANETS--------------------------
let getPlanetData = async (url, cssClass, container, image, buttonID) => {
  const res = await fetch(url);
  const data = await res.json();
  const cards = data.results;

  for (let card of cards) {
    let id = 49;
    card.id = id;
    id++;

    const cardMarkup = document.createElement("div");
    cardMarkup.classList.add(cssClass);
    cardMarkup.innerHTML = `
      <img src = ${image} alt="" width= 100%>
      <h3>Name:</h3> <p>${card.name}</p>
      <h3>Climate:</h3> <p>${card.climate}</p>
      <h3>Population:</h3> <p>${card.population}</p>
      <h3>Terrain:</h3> <p>${card.terrain}</p>
  `;
    document.querySelector(container).append(cardMarkup);
  }

  // Dölj alla utom första
  let divs = document.getElementsByClassName(cssClass);
  divs = Array.from(divs);
  divs = divs.slice(1);
  divs.forEach((element) => {
    element.classList.add("hidden");
  });

  divs = document.getElementsByClassName(cssClass);
  divs = Array.from(divs);
  divs.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.style.backgroundColor = "grey";
    });
  });

  divs.forEach((element) => {
    element.addEventListener("mouseleave", () => {
      element.style.backgroundColor = "black";
    });
  });

  const btnShowMore = document.querySelector(buttonID);
  btnShowMore.addEventListener("mouseenter", (event) => {
    divs.forEach((div) => {
      div.classList.toggle("hidden");
      btnShowMore.innerText === "VISA MER"
        ? (btnShowMore.innerText = "VISA MINDRE")
        : (btnShowMore.innerText = "VISA MER");
    });
  });
};

//-------------------MARKUP CART--------------------------

function cartMarkup() {
  cartContainer.innerHTML = "CART";
  console.log(cart);

  for (let card of cart) {
    var div = document.createElement("div");
    div.classList.add("cardInCart");
    div.innerHTML = `
    ${card.name}
    <p>Antal: ${Number(card.inCart)}</p>
    <p>Price each: ${card.cost_in_credits} credits</p>
    <p>Total: ${card.cost_in_credits * Number(card.inCart)} credits
    `;

    const deleteOneBtn = document.createElement("button");
    deleteOneBtn.classList.add("deleteOneBtn");
    deleteOneBtn.innerText = "Remove";
    div.appendChild(deleteOneBtn);
    deleteOneBtn.addEventListener("click", () => {
      deleteCard(card);

      card.addToCartBtn.innerText = "Add to cart";
    });
    cartContainer.appendChild(div);
  }

  const btnDeleteCart = document.createElement("button");
  btnDeleteCart.classList.add("deleteBtn");
  btnDeleteCart.innerText = "Empty cart";
  cartContainer.append(btnDeleteCart);

  btnDeleteCart.addEventListener("click", () => {
    if (
      confirm("Are you sure you want to delete all items in cart?") === true
    ) {
      cart.length = 0;
      numInCart();
      uppdateLocalStorage();
      cartMarkup();
    }
  });

  const displayTotal = document.createElement("p");
  displayTotal.classList.add("displayTotal");
  displayTotal.innerHTML = `TOTAL: ${totalCost()} credits`;
  cartContainer.append(displayTotal);
}

function pushCard(card) {
  if (!cart.some((cartItem) => cartItem.name === card.name)) {
    card.inCart = 1;
    cart.push(card);
  } else {
    cart.find((cartItem) => cartItem.name === card.name).inCart++;
  }
}

function totalCost() {
  let total = cart.reduce(
    (a, b) => a + Number(b.cost_in_credits * b.inCart),
    0
  );
  return total;
}

function numInCart() {
  let total = cart.reduce((a, b) => a + Number(b.inCart), 0);
  document.querySelector(".openCartBtn span").textContent = total;
}

function uppdateLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteCard(card) {
  card.inCart = 0;
  cart.splice(cart.indexOf(card), 1);
  numInCart();
  uppdateLocalStorage();
  cartMarkup();
}

getData(starShipsURL, "starShipCard", starShipsImage, "#starShipsContainer");
getData(vehiclesURL, "vehicleCard", vehiclesImage, "#vehiclesContainer");
getPlanetData(
  planetsURL,
  "planetCard",
  "#planetsContainer",
  planetImage,
  "#showMorePlanetsBtn"
);

cartMarkup();
numInCart();
