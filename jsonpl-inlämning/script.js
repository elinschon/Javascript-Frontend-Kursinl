"use strict";

const getbtn = document.getElementById("getBtn");
const postbtn = document.getElementById("postBtn");
const output = document.getElementById("output");
const submitBtn = document.getElementById("submitBtn");

//Där användaren anger värden
const inputName = document.getElementById("name");
const inputId = document.getElementById("userId");
const inputUsername = document.getElementById("userName");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");

//lagra användarens värden
let getName;
let getId;
let getUsername;
let getEmail;
let getPhone;

let posts = [];

const post = {
  name: "Elin",
  id: 1,
  username: "hejsan",
  email: "me@me.com",
  phone: "123456",
};

function formInput() {
  getName = inputName.value;
  getId = inputId.value;
  getUsername = inputUsername.value;
  getEmail = inputEmail.value;
  getPhone = inputPhone.value;
  post.name = getName;
  post.id = getId;
  post.username = getUsername;
  post.email = getEmail;
  post.phone = getPhone;
  console.log(post);
}

submitBtn.addEventListener("click", formInput);

//GET
const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  posts = data;
  console.log(posts);

  for (let post of posts) {
    const outputArticle = document.createElement("article");
    outputArticle.classList.add("outputArticle");
    outputArticle.innerHTML = `
    <p>Name: ${post.name}</p>
    <p>Id: ${post.id}</p>
    <p>Username: ${post.username}</p>
    <p>Email: ${post.email}</p>
    <p>Phone: ${post.phone}</p>
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "DELETE";
    const putBtn = document.createElement("button");
    putBtn.innerText = "UPDATE";

    output.appendChild(outputArticle);

    deleteBtn.addEventListener("click", () => deletePost(post.id));
    putBtn.addEventListener("click", () => updatePost(post.id));
    outputArticle.append(deleteBtn, putBtn);
    output.append(outputArticle);
  }
};

//DELETE VERKAR FUNKA
const deletePost = async (id) => {
  console.log(id); //testa vilket id som raderas
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "delete",
  });
  const data = await res.json();
};

//POST VERKAR FUNKA? SKICKAR IN FÄRDIG POST, KANSKE TA USERINPUT?
const postPost = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
};

//PUT/UPDATE
const updatePost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "put",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
};

getbtn.addEventListener("click", getPosts);
postbtn.addEventListener("click", postPost);
// document.querySelector('#deleteStuff').addEventListener('click', () => deletePost(1));
