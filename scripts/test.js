"use strict";

//CART
let cart = [];

const cartCnt = document.querySelector(".cartContent");
const nameHere = document.querySelector(".nameHere");
const costHere = document.querySelector(".costHere");
const totalCostHere = document.querySelector(".totalCostHere");

// nameHere.innerHTML = localStorage.getItem("name");
// costHere.innerHTML = localStorage.getItem("cost");
// totalCostHere.innerHTML = localStorage.getItem("cost"); //kommer behöva ändras

//CARDS
const starShipsURL = "https://swapi.dev/api/starships/?format=json";
const vehiclesURL = "https://swapi.dev/api/vehicles/?format=json";
let id = 0;

const cartButton = document.querySelector(".openCartBtn");
cartButton.addEventListener("click", () => {
  //här ändras dold kundkorg till visible.
  const cart = document.getElementById("cart").classList.toggle("showCart");
});

let getData = async (url, cssClass, container, buttonID) => {
  const res = await fetch(url);
  const data = await res.json();
  const cards = data.results;

  for (let card of cards) {
    card.id = id;
    card.inCart = 0; //nytt
    id++;

    const cardMarkup = document.createElement("div");
    cardMarkup.classList.add(cssClass);
    cardMarkup.innerHTML = `
      <img src ="./images/spaceships/brian-mcgowan-3bETLGHcAUU-unsplash.jpg" alt="" width= 100%>
      <h3>Namn:</h3> <p>${card.name}</p>
      <h3>Model:</h3> <p>${card.model}</p>
      <h3>Crew:</h3> <p>${card.crew}</p>
      <h3>Passengers:</h3> <p>${card.passengers}</p>
      <h3>Price:</h3> <p>${card.cost_in_credits}</p>
      <h3>In cart: </h3> <p>${card.inCart}</p>`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("addToCartBtn");
    addToCartBtn.innerText = "Lägg till";

    //ADD TO CART!
    addToCartBtn.addEventListener("click", () => {
      cartMarkup(card);
      numInCart(card);
    });

    cardMarkup.append(addToCartBtn);
    document.querySelector(container).append(cardMarkup);
  }

  // Dölj alla utom första
  let divs = document.getElementsByClassName(cssClass); //funkade ej med queryselector?
  divs = Array.from(divs);
  divs = divs.slice(1);
  divs.forEach((element) => {
    element.classList.add("hidden");
  });

  //Visa mer/mindre
  const btnShowMore = document.querySelector(buttonID);
  btnShowMore.addEventListener("click", (event) => {
    divs.forEach((div) => {
      div.classList.toggle("hidden");
      btnShowMore.innerText === "VISA MER"
        ? (btnShowMore.innerText = "VISA MINDRE")
        : (btnShowMore.innerText = "VISA MER");
    });
  });
};

//--------------- FUNKTIONER FÖR CART ----------------------

//visar hur många varor som ligger i varukorgen på knappen baserat 
//på värdet av 'cartnumbers' i localstorage
function onLoadNumInCart() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.openCartBtn span').textContent = productNumbers ;
  }
}

function numInCart(card) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = Number(productNumbers);

  if(productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.openCartBtn span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.openCartBtn span').textContent = 1;
  }

  setItems(card);
}

function setItems(card) {
 let cartItems = localStorage.getItem('productsinCart');
 cartItems = JSON.parse(cartItems);

if (cartItems != null) {

  if(cartItems[card.id] == undefined) {
    cartItems = {
      ...cartItems,     //cartTtems will be equal to all thas is there from before
      [card.id]: card  //PLUS the new card, restoperator
    }
  }
  cartItems[card.id].inCart += 1;
} else {
  card.inCart = 1;
  cartItems = {
    [card.id]: card
  }
}
 
  localStorage.setItem('productsinCart', JSON.stringify(cartItems));
  console.log('My cartItems are: ', cartItems);
}

function cartMarkup(card) {
//  cart.push(card); //behövs arrayen?
 console.log(card);
 localStorage.setItem("name", card.name); //cardCnt om det ej funkar
 localStorage.setItem("cost", card.cost_in_credits);
 nameHere.innerHTML = localStorage.getItem("name");
 costHere.innerHTML = localStorage.getItem("cost");
 totalCostHere.innerHTML += localStorage.getItem("cost");
}




//Sortera starships.name i bokstavsordning
// const sortShips = async () => {
//     const res = await fetch('https://swapi.dev/api/starships/?format=json');
//     const data = await res.json();
//     let ships = data.results;
//     let shipsToSort = [];
//     for (let i = 0; i < ships.length; i++) {
//         shipsToSort[i] = ships[i].name;
//     }

//     shipsToSort.sort();
//     console.log(shipsToSort);
// }

getData(
  starShipsURL,
  "starShipCard",
  "#starShipsContainer",
  "#showMoreSpaceShipsBtn"
);
getData(
  vehiclesURL,
  "vehicleCard",
  "#vehiclesContainer",
  "#showMoreVehiclesBtn"
);
onLoadNumInCart();

// sortShips();
