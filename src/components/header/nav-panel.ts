import "./nav-panel.scss";
import { BaseComponent } from "../base-components";
import { PageButton } from "./pageButton";

export class NavPanel extends BaseComponent {
  private buttons: PageButton[] = [];

  constructor() {
    super("div", ["nav-wrapper"]);
  }

  addNavButtons(icons: string[], names: string[], urls: string[]): void {
    for (let i = 0; i < icons.length; i++) {
      this.buttons.push(new PageButton(icons[i], names[i], urls[i]));
    }
    this.buttons.forEach((button) => this.element.appendChild(button.element));
  }
}
