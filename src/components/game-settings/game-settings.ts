import "./game-settings.scss";
import { BaseComponent } from "../base-components";
import gameSettingsHtml from "../inner-html/game-settings-html";

export class GameSettings extends BaseComponent {
  constructor() {
    super("div", ["settings"]);
    this.element.innerHTML = gameSettingsHtml;
  }
}
