export default class PaymentSystemAffiliations {
  static binToPaymentSystem = {
    "card-american-express": [34, 37],
    "card-china-t-union": [31],
    "card-unionpay": [62],
    "card-diners": [2014, 2149, 36, [300, 305], 3095, 38, 39],
    "card-discover": [6011, [644, 649], 65, [622126, 622925]],
    "card-jcb": [[3528, 3589]],
    "card-maestro": [
      6759,
      676770,
      676774,
      5018,
      5020,
      5038,
      5893,
      6304,
      [6761, 6763],
    ],
    "card-mir": [[2200, 2204]],
    "card-mastercard": [
      [2221, 2720],
      [51, 55],
    ],
    "card-visa": [4, 4026, 417500, 4508, 4844, 4913, 4917],
  };

  static searchPaymentSystem(card) {
    let comparisonLength = 0;
    let keyPaymentSystem = undefined;
    for (const paymentSystem in PaymentSystemAffiliations.binToPaymentSystem) {
      const filter =
        PaymentSystemAffiliations.binToPaymentSystem[paymentSystem];
      for (const item of filter) {
        if (Array.isArray(item)) {
          const [itemFrom, itemTo] = item;
          const length = String(itemFrom).length;
          const binCard = card.slice(0, length);
          if (binCard >= itemFrom && binCard <= itemTo) {
            if (length > comparisonLength) {
              comparisonLength = length;
              keyPaymentSystem = paymentSystem;
            }
          }
        } else {
          const length = String(item).length;
          if (card.startsWith(item)) {
            if (length > comparisonLength) {
              comparisonLength = length;
              keyPaymentSystem = paymentSystem;
            }
          }
        }
      }
    }
    return keyPaymentSystem;
  }
}
