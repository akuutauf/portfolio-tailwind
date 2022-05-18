// Program Main Javascript

// canvas
const canvasKita = document.getElementById("myCanvas");
canvasKita.width = 600;
canvasKita.height = 400;
const ctx = canvasKita.getContext("2d");
let imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

// variable warna
let skinUfoGrey = "#606470";
let kacaUfoGrey = "#D3E0EA";
let kacaUfoPutih = "#F7F7F7";
let kacaUfoBiru = "#93DEFF";

function baseUfo() {
  // area batasan object base ufo
  ctx.save();
  ctx.beginPath();
  ctx.rect(150, 50, 300, 300);
  // ctx.stroke();
  ctx.clip();

  // object lingkaran base ufo
  ctx.beginPath();
  ctx.arc(300, 350, 140, 0, 2 * Math.PI, false);
  ctx.fillStyle = skinUfoGrey;
  ctx.fill();
}

function jendelaUfo() {
  // jendela 1 (kiri)
  ctx.beginPath();
  ctx.arc(220, 300, 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoPutih;
  ctx.fill();

  // jendela 2 (tengah)
  ctx.beginPath();
  ctx.arc(300, 315, 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoPutih;
  ctx.stroke();
  ctx.fill();

  // jendela 3 (kanan)
  ctx.beginPath();
  ctx.arc(380, 300, 15, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoPutih;
  ctx.stroke();
  ctx.fill();
}

function atapUfo() {
  // area batasan object atap ufo
  ctx.save();
  ctx.beginPath();
  ctx.arc(300, 280, 100, 0, 2 * Math.PI, false);
  // ctx.stroke();
  ctx.clip();

  // object base atap ufo
  ctx.beginPath();
  ctx.arc(300, 140, 140, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoBiru;
  ctx.fill();

  // pantulan cahaya
  ctx.beginPath();
  ctx.arc(240, 200, 30, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoPutih;
  ctx.fill();
}

function rodaUfo() {
  // roda ufo 1 (kiri)
  ctx.beginPath();
  ctx.arc(210, 350, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoGrey;
  ctx.fill();

  // roda ufo 2 (tengah kiri)
  ctx.beginPath();
  ctx.arc(270, 350, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoGrey;
  ctx.fill();

  // roda ufo 3 (tengah kanan)
  ctx.beginPath();
  ctx.arc(330, 350, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoGrey;
  ctx.fill();

  // roda ufo 4 (kanan)
  ctx.beginPath();
  ctx.arc(390, 350, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = kacaUfoGrey;
  ctx.fill();
}

function antena() {
  // base antena
  ctx.beginPath();
  ctx.arc(300, 185, 20, 0, 2 * Math.PI, false);
  ctx.fillStyle = skinUfoGrey;
  ctx.fill();

  // antena
  ctx.beginPath();
  ctx.moveTo(300, 165);
  ctx.lineTo(300, 120);
  ctx.stroke();

  // lingkaran antena
  ctx.beginPath();
  ctx.arc(300, 120, 10, 0, 2 * Math.PI, false);
  ctx.fillStyle = skinUfoGrey;
  ctx.fill();
}

// fungsi pemanggilan agar menjadi satu kesatuan object
function ufo() {
  // pemanggilan setiap object fungsi
  antena();
  rodaUfo();
  baseUfo();
  jendelaUfo();
  atapUfo();
}

// variabel untuk animasi pada canvas
let canvasW = canvasKita.width;
let canvasH = canvasKita.height;
let x = 0;

ufo();

// animation
const ufoSpining = [{ transform: "rotate(0) scale(1)" }, { transform: "rotate(360deg) scale(0)" }];

const spiningTime = {
  duration: 2000,
  iterations: 1,
};

const newspaper = document.querySelector("#myCanvas");

newspaper.addEventListener("click", () => {
  newspaper.animate(ufoSpining, spiningTime);
});
