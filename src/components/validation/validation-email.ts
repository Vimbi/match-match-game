import { regexpEmail } from "./regular-expressions";

export class ValidationEmail {
  invalidities: string[];

  constructor() {
    this.invalidities = [];
  }

  checkValidity(input: HTMLInputElement | null): void {
    if (input) {
      const { validity } = input;

      if (validity.valueMissing) {
        this.addInvalidity("Отсутствует обязательное значение");
      }

      if (!input.value.match(regexpEmail)) {
        this.addInvalidity(
          "The entered text doesn't match the required pattern"
        );
      }
    }
  }

  addInvalidity(message: string): void {
    this.invalidities.push(message);
  }

  getInvalidities(): string {
    return this.invalidities.join(". \n");
  }
}
