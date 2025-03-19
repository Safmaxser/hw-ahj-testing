import "./credit-card-validator.css";
import PaymentSystemAffiliations from "./payment-system-affiliations";
import cardNumberChecks from "./card-number-checks";

export default class CreditCardValidator {
  constructor(container) {
    this.container = this.bindToDOM(container);
    this.formValidator;
    this.inputValidator;
    this.submitValidator;
    this.cardsList;
    this.notice;
    this.timeout;
    this.init();
  }

  init() {
    this.createWidget();
    this.eventInit();
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("Container is not HTMLElement!");
    }
    return container;
  }

  eventInit() {
    this.formValidator.addEventListener("submit", this.onSubmit.bind(this));
    this.inputValidator.addEventListener("input", this.onInput.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();
    const card = this.inputValidator.value.trim();
    if (!card) {
      this.outputNotice("Enter the card number in the field!", "notice-error");
    } else {
      if (cardNumberChecks.cardChecks(card)) {
        this.outputNotice("The card is valid!", "notice-info");
      } else {
        this.outputNotice("The card is not valid!", "notice-error");
      }
    }
  }

  onInput() {
    this.clearNotice();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => this.displayPaymentSystems(), 300);
  }

  displayPaymentSystems() {
    for (const element of this.cardsList) {
      element.classList.add("inactive");
    }
    const card = this.inputValidator.value.trim();
    const paymentSystem = PaymentSystemAffiliations.searchPaymentSystem(card);
    if (paymentSystem) {
      this.container
        .querySelector(`.${paymentSystem}`)
        .classList.remove("inactive");
    }
  }

  outputNotice(notice, type) {
    this.notice.className = "notice";
    this.notice.classList.add(type);
    this.notice.textContent = notice;
  }

  clearNotice() {
    this.notice.className = "notice";
    this.notice.textContent = "";
  }

  createWidget() {
    this.container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="credit-card-validator">
        <ul class="payment-systems">
          <li class="card card-mir inactive"></li>        
          <li class="card card-visa inactive"></li>
          <li class="card card-mastercard inactive"></li>
          <li class="card card-maestro inactive"></li>
          <li class="card card-china-t-union inactive"></li>
          <li class="card card-unionpay inactive"></li>
          <li class="card card-american-express inactive"></li>
          <li class="card card-diners inactive"></li>
          <li class="card card-jcb inactive"></li>
          <li class="card card-discover inactive"></li>
        </ul>      
        <form class="form-validator">
          <input class="input-validator" type="text" placeholder="Credit card number">
          <input class="submit-validator" type="submit" value="Click to Validate">        
        </form>
        <span class="notice"></span>
      </div> 
    `,
    );
    this.formValidator = this.container.querySelector(".form-validator");
    this.inputValidator = this.container.querySelector(".input-validator");
    this.submitValidator = this.container.querySelector(".submit-validator");
    this.cardsList = this.container.querySelectorAll(".card");
    this.notice = this.container.querySelector(".notice");
  }
}
