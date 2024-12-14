function copyLastValueAndWriteNext() {
  var priceToday;
  if (isHolidayOrWeekEnd(new Date())) {
    return;
  } else {
    incollaSoloValoriUltimaCellaNonVuotaRange("Prezzi", "DataPrezzo", 1);
    priceToday = incollaSoloValoriUltimaCellaNonVuotaRange(
      "Prezzi",
      "DataPrezzo",
      2
    );
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
    scriviMassimoStorico(priceToday, "Prezzi");
  }
}
