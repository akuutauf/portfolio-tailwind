// Program Main Javascript

// canvas
const canvasKita = document.getElementById("myCanvas2D");
canvasKita.width = 400;
canvasKita.height = 400;
const ctx = canvasKita.getContext("2d");
let imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

// implementasi object 2d (animal fish)
// tone pewarnaan object 2d
let skinTransparent = "#FFBC80";
let pinkBody = "#FE57E3";
let pinkMouth = "#F70AB2";
let blueFin = "#0192F5";
let blueEye = "#060094";
let cyanFin = "#05CAEC";
let purpleScale = "#8447F0";
let whiteEye = "#F2F2F2";

// fungsi object
function bodyFish() {
  ctx.beginPath();
  ctx.arc(150, 200, 115, 0, 2 * Math.PI, false);
  ctx.fillStyle = pinkBody;
  ctx.fill();
  ctx.clip();
}

function finFish() {
  // sirip atas
  ctx.beginPath();
  ctx.arc(170, 130, 65, 0, 2 * Math.PI, false);
  ctx.fillStyle = blueFin;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(230, 200, 60, 0, 2 * Math.PI, false);
  ctx.fillStyle = blueFin;
  ctx.fill();

  // sirip bawah
  ctx.beginPath();
  ctx.arc(200, 285, 35, 0, 2 * Math.PI, false);
  ctx.fillStyle = blueFin;
  ctx.fill();
}

function faceFish() {
  // mata kiri
  ctx.beginPath();
  ctx.arc(90, 170, 25, 0, 2 * Math.PI, false);
  ctx.fillStyle = whiteEye;
  ctx.fill();

  // mata kanan
  ctx.beginPath();
  ctx.arc(135, 170, 25, 0, 2 * Math.PI, false);
  ctx.fillStyle = whiteEye;
  ctx.fill();

  // retina mata kiri
  ctx.beginPath();
  ctx.arc(90, 170, 16, 0, 2 * Math.PI, false);
  ctx.fillStyle = blueEye;
  ctx.fill();

  // retina mata kanan
  ctx.beginPath();
  ctx.arc(135, 170, 16, 0, 2 * Math.PI, false);
  ctx.fillStyle = blueEye;
  ctx.fill();

  // bibir ikan
  ctx.beginPath();
  ctx.arc(110, 240, 22, 0, 2 * Math.PI, false);
  ctx.fillStyle = pinkMouth;
  ctx.fill();

  // mulut dalam ikan
  ctx.beginPath();
  ctx.arc(110, 240, 12, 0, 2 * Math.PI, false);
  ctx.fillStyle = whiteEye;
  ctx.fill();
}

function scaleFish() {
  // sirip ikan
  ctx.beginPath();
  ctx.arc(190, 210, 25, 1.9, 1.4 * Math.PI, true);
  ctx.fillStyle = blueFin;
  ctx.fill();

  // sisik ikan 1
  ctx.beginPath();
  ctx.arc(170, 280, 14, 2, 1.6 * Math.PI, true);
  ctx.strokeStyle = whiteEye;
  ctx.lineWidth = 3;
  ctx.stroke();

  // sisik ikan 2
  ctx.beginPath();
  ctx.arc(158, 290, 8, 2, 1.6 * Math.PI, true);
  ctx.strokeStyle = whiteEye;
  ctx.lineWidth = 3;
  ctx.stroke();

  // sisik ikan 3
  ctx.beginPath();
  ctx.arc(165, 265, 10, 2, 1.6 * Math.PI, true);
  ctx.strokeStyle = whiteEye;
  ctx.lineWidth = 3;
  ctx.stroke();
}

function fieldText() {
  // field text 1
  let fieldUtama1 = [
    { x: 160, y: 380 },
    { x: 200, y: 380 },
  ];

  polygon(imageDataSaya, fieldUtama1, 0, 0, 0);

  // proses transformasi komposit
  let fieldHasil1 = translasiArray(fieldUtama1, { x: 300, y: 0 });
  polygon(imageDataSaya, fieldHasil1, 0, 0, 0);

  ctx.putImageData(imageDataSaya, 0, 0);

  // field text 1
  let fieldUtama2 = [
    { x: 210, y: 380 },
    { x: 250, y: 380 },
  ];

  polygon(imageDataSaya, fieldUtama2, 0, 0, 0);

  // proses transformasi komposit
  let fieldHasil2 = translasiArray(fieldUtama2, { x: 300, y: 0 });
  polygon(imageDataSaya, fieldHasil2, 0, 0, 0);

  ctx.putImageData(imageDataSaya, 0, 0);
}

function textObject() {
  // main text
  ctx.font = "bolder 18pt verdana";
  ctx.textAlign = "left";
  ctx.fillStyle = "#F70AB2";
  ctx.fillText("F", 75, 370, 320, 100);
  ctx.fillText("I", 125, 370, 320, 100);
  ctx.fillText("S", 170, 370, 320, 100);
  ctx.fillText("H", 220, 370, 320, 100);
}

// pemanggilan fungsi object native
ctx.restore();
fieldText();
textObject();

// pemanggilan fungsi object 2d
finFish();
bodyFish();
faceFish();
scaleFish();
