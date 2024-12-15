//needs to run at the evening
function copyLastValue() {
  incollaSoloValoriUltimaCellaNonVuotaRange("Prezzi", "DataPrezzo", 1);
  incollaSoloValoriUltimaCellaNonVuotaRange("Prezzi", "DataPrezzo", 2);
}

//needs to run at the evening
function writeNextValue() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  console.log(!isWeekend(tomorrow));
  console.log(!isHoliday(tomorrow));
  if (!isWeekend(tomorrow) && !isHoliday(tomorrow)) {
    scriviInCellaVuotaSuccessivaARange(
      "Prezzi",
      "DataPrezzo",
      "A",
      dataDomani()
    );
    scriviInCellaVuotaSuccessivaARange(
      "Prezzi",
      "DataPrezzo",
      "B",
      "=GOOGLEFINANCE(J1)"
    );
  }
}

//needs to run every hour
function checkDrawDown() {
  var priceToday = incollaSoloValoriUltimaCellaNonVuotaRange(
    "Prezzi",
    "DataPrezzo",
    2
  );
  scriviMassimoStorico(priceToday, "Prezzi");
}
