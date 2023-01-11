// Handle Background Wrapper
const textCodes = ["0<br/>0<br/>1<br/>1<br/>0<br/>0<br/>1<br/>0",
                  "0<br/>0<br/>0<br/>1<br/>0<br/>1<br/>0<br/>1",
                  "0<br/>1<br/>1<br/>1<br/>1<br/>0<br/>1<br/>0",
                  "0<br/>1<br/>0<br/>1<br/>1<br/>1<br/>1<br/>1",
                  "1<br/>0<br/>1<br/>0<br/>0<br/>0<br/>1<br/>0",
                  "1<br/>0<br/>0<br/>0<br/>0<br/>1<br/>0<br/>1",
                  "1<br/>1<br/>1<br/>0<br/>1<br/>0<br/>1<br/>0",
                  "1<br/>1<br/>0<br/>0<br/>1<br/>1<br/>1<br/>1"];
const backWrap = document.getElementById("back-wrap");
backWrap.innerHTML = "";
for (let i = 0; i < Math.ceil(screen.width/10.4); i++)
{
  backWrap.innerHTML += `<h3 class="back-text${Math.ceil(Math.random()*4)}">${textCodes[Math.floor(Math.random()*8)]}</h3>`;
}

// Handle Navigation 
const nav = document.getElementById("nav");
const navX = document.getElementById("nav-x");
const navIcon = document.getElementById("nav-icon");
const body = document.querySelector("body");
const main = document.querySelector("main");

function closeNav ()
{
  nav.classList.add("hidden");
  navIcon.classList.remove("hidden");
  main.classList.remove("blur");
  backWrap.classList.remove("blur");
  body.classList.remove("noOver");
}

function openNav() 
{
  navX.classList.remove("hidden");
  nav.classList.remove("hidden");
  navIcon.classList.add("hidden");
  main.classList.add("blur");
  backWrap.classList.add("blur");
  body.classList.add("noOver");
}
