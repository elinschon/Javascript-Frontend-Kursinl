"use strict";

const cartCnt = document.querySelector(".cartContent");
const nameHere = document.querySelector(".nameHere");
const costHere = document.querySelector(".costHere");
const totalCostHere = document.querySelector(".totalCostHere");

//CARDS
const starShipsURL = "https://swapi.dev/api/starships/?format=json";
const vehiclesURL = "https://swapi.dev/api/vehicles/?format=json";
const planetsURL = "https://swapi.dev/api/planets/?format=json";
let id = 0;

//Ändra dold kundkorg till visible.
const cartButton = document.querySelector(".openCartBtn");
cartButton.addEventListener("click", () => {
  const cartWindow = document
    .getElementById("cartWindow")
    .classList.toggle("showCart");
});

let getData = async (url, cssClass, container) => {
  const res = await fetch(url);
  const data = await res.json();
  const cards = data.results;

  for (let card of cards) {
    card.id = id;
    card.inCart = 0; //nytt
    id++;

    //Om det inte finns ett pris slumpas ett pris fram
    if (card.cost_in_credits === "unknown") {
      card.cost_in_credits = Math.floor(Math.random() * 100000000000);
    }

    const cardMarkup = document.createElement("div");
    cardMarkup.classList.add(cssClass);
    cardMarkup.innerHTML = `
      <img src ="./images/spaceships/brian-mcgowan-3bETLGHcAUU-unsplash.jpg" alt="" width= 100%>
      <h3>Name:</h3> <p>${card.name}</p>
      <h3>ModeL:</h3> <p>${card.model}</p>
      <h3>Crew:</h3> <p>${card.crew}</p>
      <h3>Passengers:</h3> <p>${card.passengers}</p>
      <h3>Price:</h3> <p>${card.cost_in_credits} credits</p>
      <h3>In cart: </h3> <p>${card.inCart}</p>`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("addToCartBtn");
    addToCartBtn.innerText = "Add to cart";

    //ADD TO CART! Skicka till localstorage
    addToCartBtn.addEventListener("click", () => {
      // cartMarkup(card);
      numInCart(card);
      totalCost(card);
      cartMarkup(card);
    });

    cardMarkup.append(addToCartBtn);
    document.querySelector(container).append(cardMarkup);
  }
};

//FETCH planets
let getPlanetData = async (url, cssClass, container, buttonID) => {
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
      <img src ="./images/spaceships/brian-mcgowan-3bETLGHcAUU-unsplash.jpg" alt="" width= 100%>
      <h3>Name:</h3> <p>${card.name}</p>
      <h3>Climate:</h3> <p>${card.climate}</p>
      <h3>Population:</h3> <p>${card.population}</p>
      <h3>Terrain:</h3> <p>${card.terrain}</p>
  `;

    document.querySelector(container).append(cardMarkup);
  }

  // Dölj alla utom första
  let divs = document.getElementsByClassName(cssClass); //funkade ej med queryselector?
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

//--------------- FUNKTIONER FÖR CART ----------------------

//visar hur många varor som ligger i varukorgen på knappen baserat
//på värdet av 'cartnumbers' i localstorage
function onLoadNumInCart() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".openCartBtn span").textContent = productNumbers;
  }
}

function onLoadCartMarkup() {
  let totalCost = localStorage.getItem("totalCost");
  let cartItems = localStorage.getItem("productsinCart");
  cartItems = JSON.parse(cartItems);
  totalCost = Number(totalCost);

  let cartContainer = document.querySelector(".cartContainer");

  cartContainer.innerHTMl = `<p>Totalt: ${totalCost}</p>`;

  if (cartItems) {
    cartContainer.innerHTML = `
    <h3>CART</h3>
  `; //Tömmer först så varor ej displayas dubbelt
    Object.values(cartItems).map((card) => {
      cartContainer.innerHTML += `
    <div class="cardInCart">
    <p>${card.name}</p>
    <p>Antal: ${Number(card.inCart)}</p>
    <p>Pris: ${card.cost_in_credits * Number(card.inCart)}</p>
  
    </div>
    `;
    });

    cartContainer.innerHTML += `
  <div class="total">
  <p>Totalt: ${totalCost}</p>
  </div>
  `;
  }

  //---WORKING!--Lite!------testar vad som händer om jag lägger till knappar efter markup-------------
  let divs = document.querySelectorAll(".cardInCart");
  console.log(divs);
  let divNum = 0;

  if (cartItems) {
    Object.values(cartItems).map((card) => {
      const removeOneBtn = document.createElement("button");
      removeOneBtn.classList.add("removeOneBtn");
      removeOneBtn.innerText = "Remove";
      divs[divNum].append(removeOneBtn);

      removeOneBtn.addEventListener("click", () => {
        console.log(card);
      });
      divNum += 1;
    });
  }

  //------slut på test av ovan--------------------------------------------------------------------------

  const btnDeleteCart = document.createElement("button");
  btnDeleteCart.classList.add("deleteBtn");
  btnDeleteCart.innerText = "Empty cart";
  cartContainer.append(btnDeleteCart);

  btnDeleteCart.addEventListener("click", () => {
    deleteCart();
    cartMarkup(); //tog bort card, inget error längre
  });
}

function numInCart(card) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = Number(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".openCartBtn span").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".openCartBtn span").textContent = 1;
  }

  setItems(card);
}

//--------TEST-------- TAR BORT CARTITEMS I IKONEN FÖR VARJE KNAPPTRYCK
// function removeNumFromCart(card) {
//   let productNumbers = localStorage.getItem("cartNumbers");
//   productNumbers = Number(productNumbers);

//   if (productNumbers) {
//     localStorage.setItem("cartNumbers", productNumbers - 1);
//     document.querySelector(".openCartBtn span").textContent =
//       productNumbers - 1;
//   } else {
//     localStorage.setItem("cartNumbers", 0);
//     document.querySelector(".openCartBtn span").textContent = 0;
//   }

//   unSetItems(card); //ÄNDRA FUNKTION-CALL HÄR?
// }

function emptyNumInCart() {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = Number(productNumbers);
  document.querySelector(".openCartBtn span").textContent = productNumbers;
}

function setItems(card) {
  let cartItems = localStorage.getItem("productsinCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[card.id] == undefined) {
      cartItems = {
        ...cartItems, //cartTtems will be equal to all thas is there from before
        [card.id]: card, //PLUS the new card, restoperator
      };
    }
    cartItems[card.id].inCart += 1;
  } else {
    card.inCart = 1;
    cartItems = {
      [card.id]: card,
    };
  }
  localStorage.setItem("productsinCart", JSON.stringify(cartItems));
}

//ska räkna ihop hela kundkorgens kostnad
function totalCost(card) {
  let cartCost = localStorage.getItem("totalCost"); //hämtar datan

  localStorage.setItem("cartCost", Number(card.cost_in_credits)); //sätter den till värdet av nya produkten
  cartCost = Number(cartCost); //cartItems är lika med produkterna i varukorgen

  if (cartCost != null) {
    localStorage.setItem("totalCost", cartCost + Number(card.cost_in_credits));
  } else {
    localStorage.setItem("totalCost", Number(card.cost_in_credits));
  }
}

// function cartMarkup(card) {
//   let totalCost = localStorage.getItem("totalCost");
//   totalCost = Number(totalCost);
//   let cartItems = localStorage.getItem("productsinCart");
//   cartItems = JSON.parse(cartItems);

//   let values = Object.values(cartItems);
//   for(let card of values) {
//       console.log(card);
//   }

//   let cartContainer = document.querySelector(".cartContainer");
//   cartContainer.innerHTMl = `<p>Total: ${totalCost}</p>`;

//   cartContainer.innerHTML = `
//     <h3>CART</h3>
//   `; //Tömmer först så varor ej displayas dubbelt
//   Object.values(cartItems).map((card) => {
//     cartContainer.innerHTML += `
//     <div class="cardInCart">
//     <p>${card.name}</p>
//     <p>Antal: ${Number(card.inCart)}</p>
//     <button class ='removeFromCartBtn' type="button">Remove</button>
//     <p>Price: ${card.cost_in_credits * Number(card.inCart)}</p>
//     </div>
//     `;
//   });

//   cartContainer.innerHTML += `
//   <div class="total">
//   <p>Total: ${totalCost}</p>
//   </div>
//   `;

//   //-------------MAIN FOCUS NOW---------------------

//   let removeFromCartBtn = document.querySelectorAll(".removeFromCartBtn");
//   removeFromCartBtn.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       console.log("hej");
//       // removeNumFromCart(card);
//       console.log(card);
//     });
//   });

//   const btnDeleteCart = document.createElement("button");
//   btnDeleteCart.classList.add("deleteBtn");
//   btnDeleteCart.innerText = "Empty cart";
//   cartContainer.append(btnDeleteCart);

//   btnDeleteCart.addEventListener("click", () => {
//     deleteCart();
//     cartMarkup(card);
//   });
// }

function cartMarkup(card) {
  let totalCost = localStorage.getItem("totalCost");
  totalCost = Number(totalCost);
  let cartItems = localStorage.getItem("productsinCart");
  cartItems = JSON.parse(cartItems);

  let values = Object.values(cartItems);

  let cartContainer = document.querySelector(".cartContainer");
  cartContainer.innerHTMl = `<p>Total: ${totalCost}</p>`;

  cartContainer.innerHTML = `
    <h3>CART</h3>
  `; //Tömmer först så varor ej displayas dubbelt
  Object.values(cartItems).map((card) => {
    cartContainer.innerHTML += `
    <div class="cardInCart">
    <p>${card.name}</p>
    <p>Antal: ${Number(card.inCart)}</p>
    <button class ='removeFromCartBtn' type="button">Remove</button>
    <p>Price: ${card.cost_in_credits * Number(card.inCart)}</p>
    </div>
    `;
  });

  cartContainer.innerHTML += `
  <div class="total">
  <p>Total: ${totalCost}</p>
  </div>
  `;

  //-------------MAIN FOCUS NOW---------------------

  let btns = document.querySelectorAll(".removeFromCartBtn");
  let btnNum = 0;

  Object.values(cartItems).map((card) => {
    btns[btnNum].addEventListener("click", () => {
      console.log(card);
    });
    btnNum += 1;
  });

  const btnDeleteCart = document.createElement("button");
  btnDeleteCart.classList.add("deleteBtn");
  btnDeleteCart.innerText = "Empty cart";
  cartContainer.append(btnDeleteCart);

  btnDeleteCart.addEventListener("click", () => {
    deleteCart();
    cartMarkup(card);
  });
}

//funkar på localStorage, behöver ta bort innerHTML i cart också
function deleteCart() {
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartItems = localStorage.getItem("productsinCart");
  let cartCost = localStorage.getItem("cartCost");
  let totalCost = localStorage.getItem("totalCost");

  localStorage.setItem("cartNumbers", 0);
  localStorage.setItem("productsinCart", 0);
  localStorage.setItem("cartCost", 0);
  localStorage.setItem("totalCost", 0);

  cartMarkup(); //Tömmer varukorgen, löste ett problem!
  emptyNumInCart();
}

getData(starShipsURL, "starShipCard", "#starShipsContainer");
getData(vehiclesURL, "vehicleCard", "#vehiclesContainer");
getPlanetData(
  planetsURL,
  "planetCard",
  "#planetsContainer",
  "#showMorePlanetsBtn"
);
onLoadNumInCart();
onLoadCartMarkup();
