import { regexpNameNumbers, regexpNameSymbols } from "./regular-expressions";

export class ValidationName {
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

      if (input.value.match(regexpNameNumbers)) {
        this.addInvalidity("Имя не может начинаться и состоять из цифр");
      }

      if (input.value.match(regexpNameSymbols)) {
        this.addInvalidity("Имя не может содержать служебные символы");
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
