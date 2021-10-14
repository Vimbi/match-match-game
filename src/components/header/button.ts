import "./button.scss";
import { BaseComponent } from "../base-components";

export class Button extends BaseComponent {
  constructor(readonly className: string, readonly text: string) {
    super("button", [`${className}`]);
    this.element.innerHTML = `${text}`;
    this.element.setAttribute("type", "button");
  }
}
