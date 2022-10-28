"use strict";

console.log("hej");

let cards = [];
// let card = {
//     name: "Ship",
//     model: "Hejsan svejsan",
//     passengers: 10000
// };

const cartButton = document.querySelector('.openCartBtn');
cartButton.addEventListener('click', () => {
    //här ändras dold kundkorg till visible.
    const cart = document.getElementById('cart').classList.toggle('showCart');
})

const getOneCard = async () => {
    const res = await fetch('https://swapi.dev/api/starships/9/?format=json');
    const data = await res.json();
    console.log(data);
    document.getElementById('card1').innerHTML = (`Namn: ${data.name}
    Model: ${data.model}
    Passengers: ${data.passengers}`);
};


const getAllCards = async () => {
    const res = await fetch('https://swapi.dev/api/starships/?format=json');
    const data = await res.json();
    cards = data.results;
    console.log(data);


    document.querySelector('#cardsContainer').innerHTML = cards.map((card) => `<div class="card"> 
    <img src ="./images/spaceships/brian-mcgowan-3bETLGHcAUU-unsplash.jpg" alt="" width= 100%>
    <h2>Namn:</h2> <p>${card.name}</p>
    <h2>Model:</h2> <p>${card.model}</p>
    <h2>passengers:</h2> <p>${card.passengers}</p>
    <button class="addToCartBtn">Lägg i varukorg</button></div>`).join("");

   let divs = document.querySelectorAll('.card');
   divs = Array.from(divs);
   divs = divs.slice(1);
   divs.forEach(div => {
        div.classList.add('hidden');
   });

   const btnShowMore = document.querySelector('.showMoreBtn');
btnShowMore.addEventListener('click', (event) => {
    divs.forEach(div => {
        div.classList.toggle('hidden');
        btnShowMore.innerText === 'VISA MER' ? btnShowMore.innerText = 'VISA MINDRE' : btnShowMore.innerText = 'VISA MER';
   });
  });
};

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


window.addEventListener('load', () => {
    // getOneCard();
    getAllCards();
    // sortShips();
});