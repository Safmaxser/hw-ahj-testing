/**
 * @jest-environment jsdom
 */

import CreditCardValidator from "../credit-card-validator";

describe("testing the credit-card-validator component", () => {
  beforeAll(() => {
    document.body.innerHTML = '<div class="container"></div>';
  });

  test.each([
    ["4485292032285529", "The card is valid!"],
    ["3544557331886255", "The card is valid!"],
    ["371363171843496", "The card is valid!"],
    ["3127654689779699427", "The card is valid!"],
    ["6282698200143144", "The card is valid!"],
    ["36236362451344", "The card is valid!"],
    ["6759524932417677", "The card is valid!"],
    ["2200296398683050", "The card is valid!"],
    ["2720996009243829", "The card is valid!"],
    ["6557376324820346818", "The card is valid!"],
    ["1144557331886255", "The card is not valid!"],
  ])(
    "testing the credit-card-validator component for the correctness of determining the validity of the card %s",
    (card, expected) => {
      const container = document.querySelector(".container");
      const creditCardValidator = new CreditCardValidator(container);
      creditCardValidator.inputValidator.value = card;
      creditCardValidator.submitValidator.click();
      const notice = creditCardValidator.notice;
      expect(notice.textContent).toBe(expected);
    },
  );

  afterAll(() => {
    document.body.innerHTML = "";
  });
});
