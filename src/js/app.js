import CreditCardValidator from "../components/credit-card-validator/credit-card-validator";

document.addEventListener("DOMContentLoaded", () => {
  new CreditCardValidator(document.querySelector(".container"));
});
