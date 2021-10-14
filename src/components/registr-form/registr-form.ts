import "./registr-form.scss";
import { BaseComponent } from "../base-components";
import { Button } from "../header/button";
import { Input } from "./input";
import { ValidationName } from "../validation/validation-name";
import { ValidationEmail } from "../validation/validation-email";
import registrFormHtml from "../inner-html/registr-from-html";

export class RegistrForm extends BaseComponent {

  inputFirstName: Input;

  inputLastName: Input;

  inputEmail: Input;

  validation: ValidationName | undefined;

  regInputsWrapper: HTMLElement | null;

  inputName: HTMLInputElement | null;

  inputLName: HTMLInputElement | null;

  inputMail: HTMLInputElement | null;

  constructor() {
    super("form", ["registration-wrapper"]);
    this.element.innerHTML = registrFormHtml;
    this.inputFirstName = new Input("first-name__wrapper", "First Name");
    this.inputLastName = new Input("last-name__wrapper", "Last Name");
    this.inputEmail = new Input("email-input__wrapper", "E-mail");
    this.regInputsWrapper = this.element.querySelector(".registration-inputs__wrapper");
    this.inputName =
      this.inputFirstName.element.querySelector(".registr-input");
    this.inputLName =
      this.inputLastName.element.querySelector(".registr-input");
    this.inputMail = this.inputEmail.element.querySelector(".registr-input");
  }

  init(): void {
    this.addInputs();
    this.addButtons();
    this.addValidation();
  }

  addInputs(): void {
    this.regInputsWrapper?.appendChild(this.inputFirstName.element);
    this.regInputsWrapper?.appendChild(this.inputLastName.element);
    this.regInputsWrapper?.appendChild(this.inputEmail.element);
  }

  addButtons(): void {
    const addButton = new Button("add-button", "Add User");
    addButton.element.setAttribute("type", "submit");
    const cancelButton = new Button("cancel-button", "Cancel");
    const regButtonsWrapper = this.element.querySelector(".registration-buttons");
    regButtonsWrapper?.appendChild(addButton.element);
    regButtonsWrapper?.appendChild(cancelButton.element);
  }


  validationNameFunc(node: HTMLInputElement | null): void {
    this.validation = new ValidationName();
    this.validation.invalidities = [];
    this.validation.checkValidity(node);
    RegistrForm.toggleInputValidity(this.validation, node);
  }

  validationEmailFunc(node: HTMLInputElement | null): void {
    this.validation = new ValidationEmail();
    this.validation.invalidities = [];
    this.validation.checkValidity(node);
    RegistrForm.toggleInputValidity(this.validation, node);
  }

  static toggleInputValidity(validation: ValidationName, node: HTMLInputElement | null): void {
    if (validation.invalidities.length === 0 && node?.value !== "") {
      node?.setCustomValidity("");
      node?.classList.add("valid");
      node?.classList.remove("invalid");
    } else {
      const message = validation.getInvalidities();
      node?.setCustomValidity(message);
      node?.classList.add("invalid");
      node?.classList.remove("valid");
    }
  }

  addValidation(): void {
    this.inputName?.addEventListener("input", () => this.validationNameFunc(this.inputName));
    this.inputLName?.addEventListener("input", () => this.validationNameFunc(this.inputLName));
    this.inputMail?.addEventListener("input", () => this.validationEmailFunc(this.inputMail));
  }

  clear(): void {
    this.element.querySelectorAll(".registr-input").forEach((el) => {
      (<HTMLInputElement>el).value = "";
      el.classList.remove("invalid");
      el.classList.remove("valid");
    });
  }
}
