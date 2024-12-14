function incollaSoloValoriUltimaCellaNonVuotaRange(
  nomeSpreadsheet,
  nomeRange,
  colonnaInCuiScrivere
) {
  // Ottiengo il foglio attivo
  var spreadsheet = SpreadsheetApp.getActive().getSheetByName(nomeSpreadsheet);
  // Ottiengo l'intervallo denominato DataPrezzo
  var range = spreadsheet.getRange(nomeRange);
  var lastRowNonVuota = trovaUltimaRigaNonVuota(range);
  // Ottieni la cella e il suo valore
  var cella = range.getCell(lastRowNonVuota, colonnaInCuiScrivere);
  var lastValue = cella.getValue();

  // Scrivi il valore nella stessa cella
  cella.setValue(lastValue);
  return lastValue;
}

function scriviInCellaVuotaSuccessivaARange(
  nomeSpreadsheet,
  nomeRange,
  colonnaInCuiScrivere,
  valoreDaScrivere
) {
  // Ottiengo il foglio attivo
  var spreadsheet = SpreadsheetApp.getActive().getSheetByName(nomeSpreadsheet);
  // Ottiengo l'intervallo denominato DataPrezzo
  var range = spreadsheet.getRange(nomeRange);
  var lastRowNonVuota = trovaUltimaRigaNonVuota(range);
  var nextRow;
  if (lastRowNonVuota >= 1) {
    nextRow = lastRowNonVuota + 2;
  } else {
    nextRow = lastRowNonVuota + 1;
  }
  var targetRange = spreadsheet.getRange(colonnaInCuiScrivere + nextRow);
  // Copia il valore nella cella target
  targetRange.setValue(valoreDaScrivere);
}

function scriviMassimoStorico(prezzoOggi, nomeSpreadsheet) {
  // Converti prezzoOggi in numero e controlla il tipo di dato
  prezzoOggi = Number(prezzoOggi);
  if (isNaN(prezzoOggi)) {
    Logger.log("prezzoOggi non è un numero valido");
    return;
  }
  var drawDown;
  // Ottieni il foglio di lavoro attivo (puoi specificarne uno se necessario)
  var sheet = SpreadsheetApp.getActive().getSheetByName(nomeSpreadsheet);
  // Ottieni il range della cella J2
  var range = sheet.getRange("J2");
  // Ottieni il valore della cella e lo stampi sulla console
  var massimoStoricoAttuale = range.getValue();
  if (prezzoOggi > massimoStoricoAttuale) {
    range.setValue(prezzoOggi);
    scriviInCellaVuotaSuccessivaARange(
      "Massimi Storici",
      "MassimiStorici",
      "A",
      new Date()
    );
    scriviInCellaVuotaSuccessivaARange(
      "Massimi Storici",
      "MassimiStorici",
      "B",
      prezzoOggi
    );
  } else {
    drawDown = calcolaDrawDown(prezzoOggi, massimoStoricoAttuale);
    if (drawDown <= -5) {
      inviaEmail(
        "gdimaio9814@gmail.com",
        "Attuazione PADD",
        prezzoOggi,
        massimoStoricoAttuale,
        Math.round(drawDown)
      );
    }
  }
}

function trovaUltimaRigaNonVuota(range) {
  var lastRow = range.getLastRow() - 1;
  var lastRowNonVuota;

  for (var i = lastRow; i >= 1; i--) {
    var value = range.getCell(i, 2).getValue();
    console.log(i);
    if (value !== "") {
      lastRowNonVuota = i;
      break;
    }
  }

  return lastRowNonVuota || 1;
}

function dataDomani() {
  // Ottieni la data di oggi
  var oggi = new Date();

  // Aggiungi un giorno alla data di oggi
  oggi.setDate(oggi.getDate() + 1);

  // Formatta la data nel formato desiderato (es: "GG/MM/AAAA")
  var dataFormattata = Utilities.formatDate(oggi, "Europe/Rome", "dd/MM/yyyy");

  // Restituisce la data formattata
  return dataFormattata;
}
