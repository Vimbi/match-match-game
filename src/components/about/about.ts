import "./about.scss";
import { BaseComponent } from "../base-components";
import aboutHtml from "../inner-html/about-html";

export class About extends BaseComponent {
  constructor() {
    super("div", ["about"]);
    this.element.innerHTML = aboutHtml;
  }
}
