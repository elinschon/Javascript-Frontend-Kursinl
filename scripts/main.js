"use strict";
import Vehicle from "./vehicles.js";
import StarShip from "./starship.js";

console.log("hej");

let starShips = [];
let vehicles = [];
const cartCnt = document.querySelector('.cartContent');

const cartButton = document.querySelector(".openCartBtn");
cartButton.addEventListener("click", () => {
  //här ändras dold kundkorg till visible.
  const cart = document.getElementById("cart").classList.toggle("showCart");
});

//Används ej
// const getOneCard = async () => {
//   const res = await fetch("https://swapi.dev/api/starships/9/?format=json");
//   const data = await res.json();
//   console.log(data);
//   document.getElementById("card1").innerHTML = `Namn: ${data.name}
//     Model: ${data.model}
//     Passengers: ${data.passengers}`;
// };

const getStarships = async () => {
  const res = await fetch("https://swapi.dev/api/starships/?format=json");
  const data = await res.json();
  starShips = data.results;
  // makeStarShipArray(starShips);

  //lägger till id till varje starship!
  for (let i = 0; i < starShips.length; i++) { 
    starShips[i]["id "] = [i];
   }
   console.log(starShips);

  document.querySelector("#starShipsContainer").innerHTML = starShips
      .map(
        (card) => `<div class="starShipCard">
      <img src ="./images/spaceships/brian-mcgowan-3bETLGHcAUU-unsplash.jpg" alt="" width= 100%>
      <h2>Namn:</h2> <p>${card.name}</p>
      <h2>Model:</h2> <p>${card.model}</p>
      <h2>Crew:</h2> <p>${card.crew}</p>
      <h2>Passengers:</h2> <p>${card.passengers}</p>
      <h2>Price:</h2> <p>${card.cost_in_credits}</p>
      <button class="moreInfoBtn">Mer information</button>
      <button class="addToCartBtn">Lägg i varukorg</button></div>`
      )
      .join("");

      // Dölj alla utom första
  let divs = document.querySelectorAll(".starShipCard");
  divs = Array.from(divs);
  divs = divs.slice(1);
  divs.forEach((div) => {
    div.classList.add("hidden");
  });

  for (const iterator of starShipsArray) {
    console.log(iterator.name);
  }

  //Visa mer/mindre
  const btnShowMoreSpaceShips = document.querySelector(".showMoreSpaceShipsBtn");
  btnShowMoreSpaceShips.addEventListener("click", (event) => {
    divs.forEach((div) => {
      div.classList.toggle("hidden");
      btnShowMoreSpaceShips.innerText === "VISA MER"
        ? (btnShowMoreSpaceShips.innerText = "VISA MINDRE")
        : (btnShowMoreSpaceShips.innerText = "VISA MER");
    });
  });

  // let addToCartBtnArray = document.querySelectorAll('.addToCartBtn');
  // addToCartBtnArray.forEach(btn => {
  //   btn.addEventListener('click', addItemToCart(starShipsArray), {

  //   })
  // });

}

//HUR FÅ DETTA ATT FUNKA?
function addItemToCart(array) {
  for (const iterator of array) {
    if(iterator.name === card.name) {
      cartContent.innerHTML = `
      card.cost
      `
    }
  }
}

let starShipsArray = [];
  //Gör objekt av varje vehicle
function makeStarShipArray(data) {
  let id = 1;
  starShips.forEach((starship) => {
    starShipsArray.push(
      new StarShip(
        id,
        starship.name,
        starship.model,
        starship.crew,
        starship.passengers,
        starship.cost_in_credits
      )
    );
    id++;
  });
  
  return starShipsArray;
  
};

console.log("hejhej");
console.log(starShipsArray);
console.log(starShipsArray[0]);


const getVehicles = async () => {
  const res = await fetch("https://swapi.dev/api/vehicles/?format=json");
  const data = await res.json();
  vehicles = data.results;
  // makeVehicleArray(vehicles);

  //lägger till id till varje starship!
  for (let i = 0; i < vehicles.length; i++) { 
    vehicles[i]["id "] = [i];
   }
   console.log(vehicles);

  document.querySelector("#vehiclesContainer").innerHTML = vehicles
    .map(
      (card) => `<div class="vehicleCard">
    <img src ="./images/spaceships/brian-mcgowan-3bETLGHcAUU-unsplash.jpg" alt="" width= 100%>
    <h2>Namn:</h2> <p>${card.name}</p>
    <h2>Model:</h2> <p>${card.model}</p>
    <h2>Crew:</h2> <p>${card.crew}</p>
    <h2>Passengers:</h2> <p>${card.passengers}</p>
    <h2>Price:</h2> <p>${card.cost_in_credits}</p>
    <button class="moreInfoBtn">Mer information</button>
    <button class="addToCartBtn">Lägg i varukorg</button></div>`
    )
    .join("");

    // Dölj alla utom första
    let divs = document.querySelectorAll(".vehicleCard");
      divs = Array.from(divs);
      divs = divs.slice(1);
      divs.forEach((div) => {
        div.classList.add("hidden");
      });

      for (const iterator of vehiclesArray) {
        console.log(iterator.name);
      }
    
      //Visa mer/mindre
      const btnShowMoreVehicles = document.querySelector(".showMoreVehiclesBtn");
      btnShowMoreVehicles.addEventListener("click", (event) => {
    divs.forEach((div) => {
      div.classList.toggle("hidden");
      btnShowMoreVehicles.innerText === "VISA MER"
        ? (btnShowMoreVehicles.innerText = "VISA MINDRE")
        : (btnShowMoreVehicles.innerText = "VISA MER");
    });
  });
};

let vehiclesArray = [];
function makeVehicleArray(data) {
  //Gör objekt av varje vehicle
  let id = 1;
  vehicles.forEach((vehicle) => {
    vehiclesArray.push(
      new Vehicle(
        id,
        vehicle.name,
        vehicle.model,
        vehicle.crew,
        vehicle.passengers,
        vehicle.cost_in_credits
      )
    );
    id++;
  });
  return vehiclesArray;
}

//Hantera kundvagnen:

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

window.addEventListener("load", () => {
  // getOneCard();
  getStarships();
  getVehicles();
  // sortShips();
});
