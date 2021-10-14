import "./card.scss";
import { BaseComponent } from "../base-components";
import cardHtml from "../inner-html/card-html";
import { FLIP_CLASS } from "../constants";

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super("div", ["card-container"]);
    this.element.innerHTML = cardHtml(image);
  }

  getRed(): void {
    this.element.querySelector(".card")?.classList.add("red");
  }

  removeRed(): void {
    this.element.querySelector(".card")?.classList.remove("red");
  }

  getGreen(): void {
    this.element.querySelector(".card")?.classList.add("green");
  }

  flipToBack(): Promise<void> {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener("transitionend", () => resolve(), {
        once: true,
      });
    });
  }
}
