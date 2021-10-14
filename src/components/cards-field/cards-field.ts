import "./cards-field.scss";
import { BaseComponent } from "../base-components";
import { Card } from "../card/card";
import { SHOW_TIME } from "../constants";

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super("div", ["cards-field"]);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = "";
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    this.flipCards();
  }

  flipCards(): void {
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
