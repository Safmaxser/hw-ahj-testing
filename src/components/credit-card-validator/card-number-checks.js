export default class cardNumberChecks {
  static cardChecks(card) {
    const cardSymbol = card.split("");
    const verificationNumber = +cardSymbol[cardSymbol.length - 1];
    let typeTransformations = true;
    let sumNumbers = 0;
    for (let i = cardSymbol.length - 2; i >= 0; i--) {
      if (typeTransformations) {
        let calculatedNumber = cardSymbol[i] * 2;
        if (calculatedNumber > 9) {
          calculatedNumber -= 9;
        }
        sumNumbers += calculatedNumber;
      } else {
        sumNumbers += +cardSymbol[i];
      }
      typeTransformations = !typeTransformations;
    }
    const receivedCheck = (10 - (sumNumbers % 10)) % 10;
    return receivedCheck === verificationNumber;
  }
}
