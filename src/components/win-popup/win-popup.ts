import "./win-popup.scss";
import { BaseComponent } from "../base-components";
import { Button } from "../header/button";
import winPopupHtml from "../inner-html/win-popup-html";

export class WinPopup extends BaseComponent {
  private readonly ok: Button;

  constructor() {
    super("div", ["win-wrapper"]);
    this.element.innerHTML = winPopupHtml;
    this.ok = new Button("ok-button", "Ok");
    this.element
      .querySelector(".navigation-link")
      ?.appendChild(this.ok.element);
  }
}
