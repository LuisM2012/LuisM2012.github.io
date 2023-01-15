const CLOSED = 0;
const OPEN = 1;

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
for (let i = 0; i < Math.ceil(Math.max(screen.width, screen.height)/10.4); i++)
{
  backWrap.innerHTML += `<h3 class="back-text${Math.ceil(Math.random()*4)}">${textCodes[Math.floor(Math.random()*8)]}</h3>`;
}

// Handle Navigation 
let currentNav = CLOSED;
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
  main.removeAttribute("onclick");
  backWrap.classList.remove("blur");
  body.classList.remove("noOver");
  currentNav = CLOSED;
}

function openNav() 
{
  navX.classList.remove("hidden");
  nav.classList.remove("hidden");
  navIcon.classList.add("hidden");
  main.classList.add("blur");
  main.onclick = closeNav;
  backWrap.classList.add("blur");
  body.classList.add("noOver");
  currentNav = OPEN;
}

function screen_resize() 
{
  console.log("fun");
  if (currentNav == OPEN && window.innerWidth >= 600)
  {
    closeNav();
  }
}

window.onresize = screen_resize;


// Handle Load Card

const loadIn = document.getElementById("load-in");
const loadButton = document.getElementById("load-button");

function loadProjects()
{
  loadIn.classList.remove("hidden");
  loadButton.classList.add("hidden");
}