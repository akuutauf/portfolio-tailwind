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
  "Document Object Model (DOM) adalah sebuah antarmuka pemrograman (programing interface) untuk HTML, XML dan SVG yang bersifat lintas platform dan bahasa-independen. Sebuah browser tidak harus menggunakan DOM untuk menampilkan dokumen HTML. Namun DOM Diperlukan oleh JavaScript yang akan mengubah tampilan sebuah situs web secara dinamis. Dengan kata lain, DOM adalah cara JavaScript melihat suatu halaman HTML.";

var time = 10;

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

function reloadPage() {
  // location.reload();
  // history.go(0);
}
