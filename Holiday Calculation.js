function isHolidayOrWeekEnd(oggi) {
  var giornoMeseAnno = dataGiornoMeseAnno(oggi);
  var giornoSettimana = giornoMeseAnno[0];
  var meseAnno = giornoMeseAnno[1] + 1;
  var anno = giornoMeseAnno[2];
  console.log("anno oggi " + anno);
  console.log("giorno settimana " + giornoSettimana + " " + "mese " + meseAnno);
  var giornoLavorativo = !(giornoSettimana == 6 || giornoSettimana == 7);
  if (giornoLavorativo) {
    var giornoNumero = oggi.getDate();
    var eFestivo = giornoFestivita(giornoNumero, meseAnno, anno);
    if (eFestivo) {
      return true;
    }
  } else {
    return false;
  }
}

function dataGiornoMeseAnno(data) {
  var giorno = data.getDay();
  var mese = data.getMonth();
  var anno = data.getFullYear();
  return [giorno, mese, anno];
}

function giornoFestivita(giorno, mese, anno) {
  var meseGiornoPasqua = calcoloPasqua(anno);
  var meseGiornoPasquetta = calcoloPasquetta(meseGiornoPasqua);
  console.log(
    "Giorno Pasquetta " +
      meseGiornoPasquetta[1] +
      " Mese Pasquetta " +
      meseGiornoPasquetta[0]
  );
  var festivitaItaliane = [
    "01-01",
    "06-01",
    meseGiornoPasquetta[1] + "-" + meseGiornoPasquetta[0],
    "25-04",
    "01-05",
    "02-06",
    "15-08",
    "01-11",
    "08-12",
    "25-12",
    "26-12",
  ];
  var giornoMeseDaControllare = aggiungiZero(giorno) + "-" + aggiungiZero(mese);
  console.log("Giorno e mese da controllare con 0: " + giornoMeseDaControllare);
  for (var i = 0; i < festivitaItaliane.length; i++) {
    if (festivitaItaliane[i] === giornoMeseDaControllare) {
      console.log("la data passata è una festività italiana");
      return true;
    }
  }
  return false;
}

function calcoloPasqua(anno) {
  var f = Math.floor,
    G = anno % 19,
    C = f(anno / 100),
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    J = (anno + f(anno / 4) + I + 2 - C + f(C / 4)) % 7,
    L = I - J,
    mese = 3 + f((L + 40) / 44),
    giorno = L + 28 - 31 * f(mese / 4);
  return [mese, giorno];
}

function calcoloPasquetta(meseGiornoPasqua) {
  var mesePasquetta = meseGiornoPasqua[0];
  var giornoPasquetta = meseGiornoPasqua[1] + 1;
  if (giornoPasquetta > 31) {
    giornoPasquetta = 1;
    mesePasquetta = mesePasquetta + 1;
  }
  var giornoPasquetta = aggiungiZero(giornoPasquetta);
  var mesePasquetta = aggiungiZero(mesePasquetta);
  return [mesePasquetta, giornoPasquetta];
}

function aggiungiZero(numero) {
  var numeroStringa = numero.toString();
  if (numeroStringa.length === 1) {
    return "0" + numero;
  }
  return numero;
}
