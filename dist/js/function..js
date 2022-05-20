// Javascript Function

/* 4 - Pengenalan Pixel Penggambaran Object Primitif */
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

// fungsi bressenham gradient
function bresenham(imageDataTemp, x1, y1, x2, y2, r, g, b) {
  let dy, dx, d1, d2, p, m;
  let x = x1,
    y = y1,
    x_dir = 1,
    y_dir = 1;
  dx = x2 - x1;
  dy = y2 - y1;

  //antisipasi nilai m = negatif
  if (dx < 0) (dx = -dx), (x_dir = -1);
  if (dy < 0) (dy = -dy), (y_dir = -1);

  m = dy / dx;
  d2 = 2 * (dx - dy);

  if (m >= 0 && m <= 1) {
    d1 = 2 * dy;
    p = d1 - dx;
    for (let i = 1; i <= dx; i++) {
      gambarTitik(imageDataTemp, x, y, r, g, b);
      if (p >= 0) (p -= d2), (x += x_dir), (y += y_dir);
      else (p += d1), (x += x_dir);
    }
  } else if (m > 1) {
    d1 = 2 * dx;
    p = d1 - dy;
    for (let i = 1; i <= dy; i++) {
      gambarTitik(imageDataTemp, x, y, r, g, b);
      if (p >= 0) (p += d2), (x += x_dir), (y += y_dir);
      else (p += d1), (y += y_dir);
    }
  }
}

/* 5 - Geometry Object 2D */
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

// Membuat Lingkaran dengan persamaan trigonometri
function lingkaran(imageDataTemp, xc, yc, radius, r, g, b) {
  // perulangan pendefinisian titik
  for (let theta = 0; theta < Math.PI * 2; theta += 0.001) {
    x = xc + radius * Math.cos(theta);
    y = yc + radius * Math.sin(theta);
    gambarTitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
}

// fungsi elips
function elips(imageDataTemp, xc, yc, radiusX, radiusY, r, g, b) {
  // perulangan pendefinisian titik
  for (let theta = 0; theta < Math.PI * 2; theta += 0.1) {
    x = xc + radiusX * Math.cos(theta);
    y = yc + radiusY * Math.sin(theta);

    gambarTitik(imageDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
  }
}

// fungsi eight symetric (gambar garis titik point bidang persegi)
function eightSymetric(imageDataTemp, xc, yc, x, y, r, g, b) {
  gambarTitik(imageDataTemp, x + xc, y + yc, r, g, b);
  gambarTitik(imageDataTemp, y + xc, x + yc, r, g, b);
  gambarTitik(imageDataTemp, -x + xc, y + yc, r, g, b);
  gambarTitik(imageDataTemp, -y + xc, x + yc, r, g, b);
  gambarTitik(imageDataTemp, -x + xc, -y + yc, r, g, b);
  gambarTitik(imageDataTemp, -y + xc, -x + yc, r, g, b);
  gambarTitik(imageDataTemp, x + xc, -y + yc, r, g, b);
  gambarTitik(imageDataTemp, y + xc, -x + yc, r, g, b);
}

// fungsi circle mid point (gambar garis titik point bidang lingkaran)
function circleMidPoint(imageDataTemp, xc, yc, radius, r, g, b) {
  let x = 0;
  let y = radius;
  let d = 3 - 2 * radius;

  eightSymetric(imageDataTemp, xc, yc, x, y, r, g, b);

  while (x <= y) {
    if (d <= 0) {
      d = d + 4 * x + 6;
    } else {
      d = d + 4 * x - 4 * y + 10;
      y = y - 1;
    }
    x = x + 1;
  }
}

/* 6 - Atribut Output Object Primitif */
// fungsi flood fill (pewarnaan)
function floodFill(imageDataTemp, canvas, x0, y0, toFlood, color) {
  let tumpukan = [];
  tumpukan.push({ x: x0, y: y0 });

  // perulangan
  while (tumpukan.length > 0) {
    var titikSekarang = tumpukan.shift();
    var indexSekarang = 4 * (titikSekarang.x + titikSekarang.y * canvas.width);
    var r1 = imageDataTemp.data[indexSekarang + 0];
    var g1 = imageDataTemp.data[indexSekarang + 1];
    var b1 = imageDataTemp.data[indexSekarang + 2];

    // pengkondisian
    if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
      imageDataTemp.data[indexSekarang + 0] = color.r;
      imageDataTemp.data[indexSekarang + 1] = color.g;
      imageDataTemp.data[indexSekarang + 2] = color.b;
      imageDataTemp.data[indexSekarang + 3] = 255;

      tumpukan.push({ x: titikSekarang.x + 1, y: titikSekarang.y });
      tumpukan.push({ x: titikSekarang.x - 1, y: titikSekarang.y });
      tumpukan.push({ x: titikSekarang.x, y: titikSekarang.y + 1 });
      tumpukan.push({ x: titikSekarang.x, y: titikSekarang.y - 1 });
    }
  }
}

/* 7 - Transformasi Object 2D */
// fungsi translasi
function translasi(titikLama, T) {
  let x_baru = titikLama.x + T.x;
  let y_baru = titikLama.y + T.y;

  return { x: x_baru, y: y_baru };
}

// funtion rotasi
function rotasi(titikLama, sudut) {
  let x_baru = titikLama.x * Math.cos(sudut) - titikLama.y * Math.sin(sudut);
  let y_baru = titikLama.x * Math.sin(sudut) + titikLama.y * Math.cos(sudut);

  return { x: x_baru, y: y_baru };
}

// function penskalaan
function penskalaan(titikLama, S) {
  let x_baru = titikLama.x * S.x;
  let y_baru = titikLama.y * S.y;

  return { x: x_baru, y: y_baru };
}

// fungsi rotasi titik custom
function rotasiFP(titikLama, titikPutar, sudut) {
  let p1 = translasi(titikLama, { x: -titikPutar.x, y: -titikPutar.y });
  let p2 = rotasi(p1, sudut);
  let p3 = translasi(p2, titikPutar);

  return p3;
}

// fungsi penskalaan titik custom
function skalaFP(titikLama, titikPusat, S) {
  let p1 = translasi(titikLama, { x: -titikPusat.x, y: -titikPusat.y });
  let p2 = penskalaan(p1, S);
  let p3 = translasi(p2, titikPusat);

  return p3;
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

// fungsi rotasi array
function rotasiArray(arrayTitik, titikPusat, sudut) {
  let arrayHasil = [];
  for (let i = 0; i < arrayTitik.length; i++) {
    let temp = rotasiFP(arrayTitik[i], titikPusat, sudut);
    arrayHasil.push(temp);
  }
  return arrayHasil;
}

// fungsi skala array
function skalaArray(arrayTitik, titikPusat, S) {
  let arrayHasil = [];
  for (let i = 0; i < arrayTitik.length; i++) {
    let temp = skalaFP(arrayTitik[i], titikPusat, S);
    arrayHasil.push(temp);
  }
  return arrayHasil;
}

/* 8 - Transformasi Komposite dan Animasi */
// fungsi multiply matrix
function multiplyMatrix(m1, m2) {
  let hasil = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // perulangan
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        hasil[i][k] += m1[i][j] * m2[j][k];
      }
    }
  }
  return hasil;
}

// fungsi translasi komposite
function buatTranslasi(Tx, Ty) {
  let translasi = [
    [1, 0, Tx],
    [0, 1, Ty],
    [0, 0, 1],
  ];
  return translasi;
}

// fungsi rotasi komposite
function buatRotasi(theta) {
  let rotasi = [
    [Math.cos(theta), -Math.sin(theta), 0],
    [Math.sin(theta), Math.cos(theta), 0],
    [0, 0, 1],
  ];

  return rotasi;
}

// fungsi skala custom komposite
function buatSkala(Sx, Sy) {
  let skala = [
    [Sx, 0, 0],
    [0, Sy, 0],
    [0, 0, 1],
  ];

  return skala;
}

// fungsi rotasi custom 2
function rotasiFPKomposite(xc, yc, theta) {
  let m1 = buatTranslasi(-xc, -yc);
  let m2 = buatRotasi(theta);
  let m3 = buatTranslasi(xc, yc);

  let hasil;
  hasil = multiplyMatrix(m3, m2);
  hasil = multiplyMatrix(hasil, m1);

  return hasil;
}

// fungsi skaala custom komposite
function skalaFPKomposite(xc, yc, Sx, Sy) {
  let m1 = buatTranslasi(-xc, -yc);
  let m2 = buatSkala(Sx, Sy);
  let m3 = buatTranslasi(xc, yc);

  let hasil;
  hasil = multiplyMatrix(m3, m2);
  hasil = multiplyMatrix(hasil, m1);

  return hasil;
}

// fungsi implmemntasi transform titik komposite
function transformTitik(titikLama, m) {
  let x_baru = m[0][0] * titikLama.x + m[0][1] * titikLama.y + m[0][2] * 1;
  let y_baru = m[1][0] * titikLama.x + m[1][1] * titikLama.y + m[1][2] * 1;

  return { x: x_baru, y: y_baru };
}

// fungsi implmentasi transform array komposite
function transformArrayKomposite(arrayTitik, m) {
  let hasil = [];

  // perulangan
  for (let i = 0; i < arrayTitik.length; i++) {
    let titikHasil = transformTitik(arrayTitik[i], m);
    hasil.push(titikHasil);
  }
  return hasil;
}

// fungsi kotak
function objectKotak() {
  this.x = 0;
  this.y = 0;
  this.render = function (ctx, kotakX, kotakY, kotakW, kotakH, warna) {
    ctx.fillStyle = warna;
    ctx.fillRect(kotakX, kotakY, kotakW, kotakH);
  };
}

// animasi
// fungsi lingkaran
function objectLingkaran() {
  this.x = 0;
  this.y = 0;
  this.renderLingkaran = function (ctx, kotakX, kotakY, radius, warna) {
    ctx.beginPath();
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 15;
    ctx.fillStyle = warna;
    ctx.arc(kotakX, kotakY, radius, 0, Math.PI * 2, true);
    ctx.fill();
  };
}

// fungsi cek posisi object
function cekPosisi() {
  // pengkondisian awal
  if (y + r == canvasH + r) {
    keatas = true;
    kebawah = false;
  } else if (y == 0) {
    keatas = false;
    kebawah = true;
  }

  // pengkondisian terakhir
  if (x + r == canvasW - r) {
    kekanan = false;
    kekiri = true;
  } else if (x == 0) {
    kekanan = true;
    kekiri = false;
  }
}

/* 00 - Pembenahan Fungsi */

/*
   * Insert image in canvas
    var imageObj = new Image();
    imageObj.onload = function () {
      context.drawImage(imageObj), 200, 200;
    };
  
    imageObj.src = "image/gambar.png";
  */
