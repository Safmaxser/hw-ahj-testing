import PaymentSystemAffiliations from "../payment-system-affiliations";

test.each([
  ["4485292032285529", "card-visa"],
  ["3544557331886255", "card-jcb"],
  ["371363171843496", "card-american-express"],
  ["3127654689779699427", "card-china-t-union"],
  ["6282698200143144", "card-unionpay"],
  ["36236362451344", "card-diners"],
  ["6759524932417677", "card-maestro"],
  ["2200296398683050", "card-mir"],
  ["2720996009243829", "card-mastercard"],
  ["6557376324820346818", "card-discover"],
  ["1144557331886255", undefined],
])(
  "testing the Payment System Affiliations class of the searchPaymentSystem function with an argument %s",
  (card, expected) => {
    const paymentSystem = PaymentSystemAffiliations.searchPaymentSystem(card);
    expect(paymentSystem).toBe(expected);
  },
);
