// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

// event (action yang dilakukan)
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// Text Running With Button
var i = 0;
var text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nobis fugit obcaecati quasi sit quaerat. Ut culpa maxime placeat repudiandae nulla vitae adipisci explicabo laudantium ipsa unde, perferendis, cumque, quam nisi id corporis aliquid?";

var time = 15;

function typing() {
  if (i < text.length) {
    document.querySelector(".typing-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, time);
  }
}

// button change in text running
const button = document.querySelector("#button");
const reload = document.querySelector("#reload");

// event (action yang dilakukan)
button.addEventListener("click", function () {
  button.classList.toggle("hidden");
  reload.classList.toggle("hidden");
});

function reloadPage() {
  // location.reload();
  // history.go(0);
}
