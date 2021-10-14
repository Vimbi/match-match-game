import { BaseComponent } from "../base-components";
import "./pageButton.scss";
import pageButtonHtml from "../inner-html/page-button-html";

export class PageButton extends BaseComponent {
  constructor(
    readonly icon: string,
    readonly name: string,
    readonly url: string
  ) {
    super("div", ["navigation-button"]);
    this.element.innerHTML = pageButtonHtml(icon, name, url);
  }
}
