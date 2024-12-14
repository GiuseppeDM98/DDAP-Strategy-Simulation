function copyLastValueAndWriteNext() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  var priceToday;
  if (isHolidayOrWeekEnd(today)) {
    return;
  } else if (isHolidayOrWeekEnd(tomorrow)) {
    incollaSoloValoriUltimaCellaNonVuotaRange("Prezzi", "DataPrezzo", 1);
    incollaSoloValoriUltimaCellaNonVuotaRange("Prezzi", "DataPrezzo", 2);
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
