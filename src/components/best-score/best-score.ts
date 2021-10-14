import "./best-score.scss";
import { BaseComponent } from "../base-components";
import { Score } from "./score";
import bestScoreHtml from "../inner-html/best-score-html";

export class BestScore extends BaseComponent {
  arrScore:
  | { name: string; lastName: string; email: string; score: number }[]
  | undefined;

  constructor() {
    super("div", ["score"]);
  }

  static getTopTen(arrScore: { name: string; lastName: string; email: string;
    score: number }[] | undefined): Score[] | undefined {
    if (Array.isArray(arrScore)) {
      return arrScore
        ?.map((obj) => new Score(obj.name, obj.lastName, obj.email, obj.score))
        .reverse()
        .slice(0, 10);
    }
    throw Error('arrScore is not an array');
  }

  render(
    arrScore:
    | { name: string; lastName: string; email: string; score: number }[]
    | undefined
  ): void {
    this.element.innerHTML = bestScoreHtml;
    BestScore.getTopTen(arrScore)?.forEach((score) => {
      this.element.appendChild(score.element);
    });
  }
}
