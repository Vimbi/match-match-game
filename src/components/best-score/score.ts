import { BaseComponent } from "../base-components";
import scoreHtml from "../inner-html/score-html";

export class Score extends BaseComponent {
  constructor(name: string, lastName: string, email: string, score: number) {
    super("div", ["player"]);
    this.element.innerHTML = scoreHtml(name, lastName, email, score);
  }
}
