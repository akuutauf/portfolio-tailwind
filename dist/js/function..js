// Function Native Javascript
// fungsi gambar titik
function gambarTitik(imageDataTemp, x, y, r, g, b) {
  let indeks = 4 * (x + y * canvasKita.width);
  imageDataTemp.data[indeks + 0] = r;
  imageDataTemp.data[indeks + 1] = g;
  imageDataTemp.data[indeks + 2] = b;
  imageDataTemp.data[indeks + 3] = 255;
}

// fungsi DDA liniear
function implementsDDA(imageData, x1, y1, x2, y2, r, g, b) {
  let dx = x2 - x1;
  let dy = y2 - y1;

  if (Math.abs(dx) > Math.abs(dy)) {
    // penambahan pada sumbu x
    let y = y1;
    if (x2 > x1) {
      // bergerak ke sebelah kanan
      for (let x = x1; x < x2; x++) {
        y = y + dy / Math.abs(dx);
        gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
      }
    } else {
      // bergerak ke sebelah kiri
      for (let x = x1; x > x2; x--) {
        y = y + dy / Math.abs(dx);
        gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
      }
    }
  } else {
    // penambahan pada sumbu y
    let x = x1;
    if (y2 > y1) {
      // bergerak ke sebelah bawah
      for (let y = y1; y < y2; y++) {
        x = x + dx / Math.abs(dy);
        gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
      }
    } else {
      // bergerak ke sebelah atas
      for (let y = y1; y > y2; y--) {
        x = x + dx / Math.abs(dy);
        gambarTitik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
      }
    }
  }
}

// fungsi menggambar polygon
function polygon(imageDataTemp, point_array, r, g, b) {
  let point = point_array[0];

  // perulangan
  for (let i = 1; i < point_array.length; i++) {
    let point2 = point_array[i];
    implementsDDA(imageDataTemp, point.x, point.y, point2.x, point2.y, r, g, b);
    point = point2;
  }
  implementsDDA(imageDataTemp, point.x, point.y, point_array[0].x, point_array[0].y, r, g, b);
}

// fungsi translasi
function translasi(titikLama, T) {
  let x_baru = titikLama.x + T.x;
  let y_baru = titikLama.y + T.y;

  return { x: x_baru, y: y_baru };
}

// fungsi translasi array
function translasiArray(arrayTitik, T) {
  let arrayHasil = [];
  for (let i = 0; i < arrayTitik.length; i++) {
    let temp = translasi(arrayTitik[i], T);
    arrayHasil.push(temp);
  }
  return arrayHasil;
}
