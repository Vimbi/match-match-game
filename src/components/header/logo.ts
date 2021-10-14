import "./logo.scss";
import { BaseComponent } from "../base-components";
import logoHtml from "../inner-html/logo-html";

export class Logo extends BaseComponent {
  constructor() {
    super("div", ["logo"]);
    this.element.innerHTML = logoHtml;
  }
}
