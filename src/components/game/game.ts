import { delay } from "../../shared/delay";
import { BaseComponent } from "../base-components";
import { Card } from "../card/card";
import { CardsField } from "../cards-field/cards-field";
import { Cover } from "../registr-form/cover";
import { WinPopup } from "../win-popup/win-popup";
import { BestScore } from "../best-score/best-score";
import { Timer } from "../timer/timer";
import { Database } from "../indexedDB/indexeddb";
import { FLIP_DELAY } from "../constants";

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  public winPopup: WinPopup;

  public cover: Cover;

  public bestScore: BestScore;

  public totalComparisons: number;

  public incorrectComparisons: number;

  public score: number;

  appBody: HTMLElement | null;

  constructor() {
    super("main", ["main-wrapper"]);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.winPopup = new WinPopup();
    this.cover = new Cover();
    this.bestScore = new BestScore();
    this.totalComparisons = 0;
    this.incorrectComparisons = 0;
    this.score = 0;
    this.appBody = document.getElementById("app");
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    this.totalComparisons = 0;
    this.incorrectComparisons = 0;
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener("click", () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation || !card.isFlipped) return;
    this.isAnimation = true;
    this.totalComparisons++;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.getRed();
      card.getRed();
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      this.activeCard.removeRed();
      card.removeRed();
      this.incorrectComparisons++;
    }

    if (this.activeCard.image === card.image) {
      this.activeCard.getGreen();
      card.getGreen();
    }

    if (this.element.querySelectorAll(".flipped").length === 0) {
      this.finishGame();
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }

  finishGame(): void {
    this.appBody?.appendChild(this.winPopup.element);
    this.appBody?.appendChild(this.cover.element);
    document.querySelector(".ok-button")?.addEventListener("click", this.clickOkButton.bind(this));
  }

  clickOkButton(): void {
    const navBtns = document.querySelectorAll(".navigation-button")
    navBtns.forEach((btn) => {
      btn.classList.remove("btn-active");
      navBtns[1].classList.add("btn-active");
    });
    this.winPopup.element.remove();
    this.cover.element.remove();
    this.element.remove();
    document.querySelector(".timerform")?.remove();
    this.appBody?.appendChild(this.bestScore.element);
    document.querySelector(".start-button")?.classList.remove("display-none");
    document.querySelector(".stop-button")?.classList.add("display-none");
    document.querySelectorAll(".navigation-link").forEach((link) => link.classList.remove("disabled"));
  }

  bestScoreUpdate(
    result:
    | {
      name: string;
      lastName: string;
      email: string;
      score: number;
      id: number;
    }[]
    | undefined
  ): void {
    this.bestScore.render(result);
  }

  timerStop(
    timer: Timer,
    base: Database,
    firstName: string,
    lastName: string,
    email: string,
    bestScore: BestScore
  ): void {
    this.element.addEventListener("click", () => {
      if (this.element.querySelectorAll(".flipped").length === 0) {
        timer.Stop();
        const timerValue = document.forms[0].timer.value;
        const arr = timerValue.split(":").map((str: string | number) => +str);
        const seconds = arr[0] * 3600 + arr[1] * 60 + arr[2];
        this.score =
          (this.totalComparisons / 2 - this.incorrectComparisons) * 100 -
          seconds * 10;
        if (this.score < 0) {
          this.score = 0;
        }
        base.write(firstName, lastName, email, this.score, bestScore, this);
      }
    });
  }
}
