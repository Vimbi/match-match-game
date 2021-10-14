import "./header.scss";
import { BaseComponent } from "../base-components";
import { Logo } from "./logo";
import { IconModel } from "../../models/icon-model";
import { NavPanel } from "./nav-panel";
import { Button } from "./button";
import { names, urls } from "./nav-links";

export class Header extends BaseComponent {

  constructor() {
    super("header", ["header-wrapper"]);
  }

  init(): void {
    this.addLogo();
    this.addNavPanel();
    this.addButtons();
  }

  addLogo(): void {
    const logo = new Logo();
    this.element.appendChild(logo.element);
  }

  addNavPanel(): void {
    const navPanel = new NavPanel();
    this.element.appendChild(navPanel.element);
    Header.addNavButtons(navPanel);
  }

  static async addNavButtons(navPanel: NavPanel): Promise<void> {
    const zap = await fetch("./icons.json");
    const dec: IconModel[] = await zap.json();
    const arr = dec[0];
    const icons = arr.icons.map((name) => `${name}`);
    navPanel.addNavButtons(icons, names, urls);
    navPanel.element.addEventListener("click", (e) => Header.toggleNavLink(e));
  }

  static toggleNavLink(event: Event): void {
    const navBtns = document.querySelectorAll(".navigation-button");
    const link: HTMLLinkElement | null = (<HTMLElement>event.target).closest(".navigation-button");
    if (link?.classList.contains("btn-active")) return;

    navBtns.forEach((btn) => btn.classList.remove("btn-active"));
    link?.classList.add("btn-active");
  }

  addButtons(): void {
    const regBtn = new Button("register-button", "Register new player");
    this.element.appendChild(regBtn.element);
    const startBtn = new Button("start-button", "Start game");
    this.element.appendChild(startBtn.element);
    startBtn.element.classList.add("display-none");
    const stopBtn = new Button("stop-button", "Stop game");
    this.element.appendChild(stopBtn.element);
    stopBtn.element.classList.add("display-none");
  }
}