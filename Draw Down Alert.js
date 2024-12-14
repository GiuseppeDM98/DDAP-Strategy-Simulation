function calcolaDrawDown(prezzoOggi, massimoStorico) {
  // Calcola la differenza in percentuale
  var drawDown = ((prezzoOggi - massimoStorico) / prezzoOggi) * 100;

  // Restituisci lo sconto solo se è negativo
  return drawDown < 0 ? drawDown : 0;
}

function inviaEmail(
  destinatario,
  oggetto,
  prezzoOggi,
  massimoStorico,
  drawDown
) {
  var messaggio = {
    to: destinatario,
    subject: oggetto,
    body:
      "Il prezzo di VWCE di oggi è " +
      prezzoOggi +
      " rispetto ad un massimo storico di " +
      massimoStorico +
      " il draw down è del " +
      drawDown +
      "%, domani dovresti comprare come da programma",
    name: "Giuseppe",
  };
  MailApp.sendEmail(messaggio);
}
