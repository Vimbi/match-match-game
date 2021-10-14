import "./input.scss";
import { BaseComponent } from "../base-components";
import inputHtml from "../inner-html/input-html";

export class Input extends BaseComponent {
  constructor(readonly className: string, readonly placeholder: string) {
    super("div", [`${className}`]);
    this.element.innerHTML = inputHtml(placeholder);
  }
}
