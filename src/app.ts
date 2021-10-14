import { About } from "./components/about/about";
import { GameSettings } from "./components/game-settings/game-settings";
import { Game } from "./components/game/game";
import { Header } from "./components/header/header";
import { Cover } from "./components/registr-form/cover";
import { RegistrForm } from "./components/registr-form/registr-form";
import { ImageCategoryModel } from "./models/image-category-model";
import { Database } from "./components/indexedDB/indexeddb";
import { BestScore } from "./components/best-score/best-score";
import { Timer } from "./components/timer/timer";

export class App {
  private readonly header: Header;

  private readonly game: Game;

  private readonly about: About;

  private readonly gameSettings: GameSettings;

  private readonly bestScore: BestScore;

  private readonly cover: Cover;

  private readonly regForm: RegistrForm;

  public iDB: Database;

  public cardsType: string | undefined;

  public difficulty: string | undefined;

  public timer: Timer;

  // public arrInputs: NodeListOf<HTMLInputElement>;

  public fName: string;

  public lName: string;

  public email: string;

  startBtn: HTMLButtonElement | null;

  stopBtn: HTMLButtonElement | null;

  regBtn: HTMLButtonElement | null;

  constructor(private readonly rootElement: HTMLElement) {
    this.timer = new Timer();
    this.header = new Header();
    this.header.init();
    this.about = new About();
    this.game = new Game();
    this.gameSettings = new GameSettings();
    this.bestScore = new BestScore();
    this.cover = new Cover();
    this.regForm = new RegistrForm();
    this.regForm.init();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.about.element);
    this.iDB = new Database(this);
    this.iDB.init("Vimbi");
    this.cardsType = "0";
    this.difficulty = "0";
    // this.arrInputs = document.querySelectorAll(".registr-input");
    this.fName = "";
    this.lName = "";
    this.email = "";
    this.startBtn = document.querySelector(".start-button");
    this.stopBtn = document.querySelector(".stop-button");
    this.regBtn = document.querySelector(".register-button");
  }

  lunch(): void {
    this.selectOptions();
    this.initRoutes();
    this.renderRoute();
    this.addRegFormListeners();
    this.addStartBtnListener();
    this.pressStop();
  }

  selectOptions(): void {
    const cardsTypeSelect: HTMLSelectElement | null =
      this.gameSettings.element.querySelector(".cards-type");
    cardsTypeSelect?.addEventListener("change", () => {
      this.cardsType = cardsTypeSelect?.value;
    });
    const difficultySelect: HTMLSelectElement | null =
      this.gameSettings.element.querySelector(".difficulty");
    difficultySelect?.addEventListener("change", () => {
      this.difficulty = difficultySelect?.value;
    });
  }

  initRoutes(): void {
    window.addEventListener("hashchange", this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute(): void {
    this.bestScoreUpdate();
    const routes = [
      { path: "/", component: this.about },
      { path: "/best-score", component: this.bestScore },
      { path: "/game-settings", component: this.gameSettings },
      { path: "/game", component: this.game },
    ];
    const url = window.location.hash.slice(1);
    const route = routes.find((r) => r.path === url);
    if (route?.component && this.rootElement.lastChild) {
      this.rootElement.replaceChild(
        route?.component.element,
        this.rootElement.lastChild
      );
    }
  }

  addRegFormListeners(): void {
    this.regBtn?.addEventListener("click", this.addRegFormAndCover.bind(this));
    this.cover.element.addEventListener("click", this.removeRegFormAndCover.bind(this));
    this.regForm.element
      .querySelector(".cancel-button")?.addEventListener("click", this.removeRegFormAndCover.bind(this));
    this.regForm.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.registrationSuccess.bind(this)();
    });
  }

  addRegFormAndCover(): void {
    this.rootElement.appendChild(this.cover.element);
    this.rootElement.appendChild(this.regForm.element);
  }

  removeRegFormAndCover(): void {
    this.rootElement.removeChild(this.cover.element);
    this.rootElement.removeChild(this.regForm.element);
    this.regForm.clear();
  }

  registrationSuccess(): void {
    const arrInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".registr-input");
    this.fName = arrInputs[0].value;
    this.lName = arrInputs[1].value;
    this.email = arrInputs[2].value;
    this.removeRegFormAndCover();
    this.regBtn?.classList.add("display-none");
    this.startBtn?.classList.remove("display-none");
  }

  async startGame(): Promise<void> {
    const res = await this.readLocalResource("./images.json");
    const categories: ImageCategoryModel[] = await res.json();
    if (this.cardsType) {
      const cat = categories[+this.cardsType];
      if (this.difficulty) {
        const images = cat.images[+this.difficulty].map(
          (name) => `${cat.category}/${name}`
        );
        this.game.newGame(images);
      }
    }
  }

  readLocalResource = (path: string): Promise<Response> => new Promise((resolve, reject) => {
    try {
      const result = fetch(path);
      return resolve(result);
    } catch (error) {
      console.error(`Read local resources error: ${error}`);
      return reject(new Error(`Read local resources error: ${error}`));
    }
  })

  // addStartBtnListener(): void {
  //   this.startBtn?.addEventListener("click", () => {
  //     if (this.rootElement.lastChild) {
  //       this.rootElement.replaceChild(
  //         this.timer.element,
  //         this.rootElement.lastChild
  //       );
  //     }
  //     this.timer.Start();
  //     this.rootElement.appendChild(this.game.element);
  //     this.startBtn?.classList.toggle("display-none");
  //     this.stopBtn?.classList.toggle("display-none");
  //     this.startGame();
  //     document
  //       .querySelectorAll(".navigation-link")
  //       .forEach((link) => link.classList.add("disabled"));
  //     this.game.timerStop(
  //       this.timer,
  //       this.iDB,
  //       this.fName,
  //       this.lName,
  //       this.email,
  //       this.bestScore
  //     );
  //   });
  // }

  addStartBtnListener(): void {
    this.startBtn?.addEventListener("click", this.lunchGame.bind(this));
  }

  lunchGame(): void {
    this.addStartStopTimer();
    this.rootElement.appendChild(this.game.element);
    this.toggleStartStopBtns();
    this.startGame();
    App.switchLinks();
    // document
    //   .querySelectorAll(".navigation-link")
    //   .forEach((link) => link.classList.add("disabled"));
  }

  addStartStopTimer(): void {
    if (this.rootElement.lastChild) {
      this.rootElement.replaceChild(
        this.timer.element,
        this.rootElement.lastChild
      );
    }
    this.timer.Start();
    this.game.timerStop(
      this.timer,
      this.iDB,
      this.fName,
      this.lName,
      this.email,
      this.bestScore
    );
  }

  toggleStartStopBtns(): void {
    this.startBtn?.classList.toggle("display-none");
    this.stopBtn?.classList.toggle("display-none");
  }

  static switchLinks(): void {
    document
      .querySelectorAll(".navigation-link")
      .forEach((link) => link.classList.toggle("disabled"));
  }

  // pressStop(): void {
  //   this.stopBtn?.addEventListener("click", () => {
  //     this.timer.Stop();
  //     this.timer.element.remove();

  //     if (this.rootElement.lastChild) {
  //       this.rootElement.replaceChild(
  //         this.bestScore.element,
  //         this.rootElement.lastChild
  //       );
  //     }
  //     this.startBtn?.classList.remove("display-none");
  //     this.stopBtn?.classList.add("display-none");
  //     document
  //       .querySelectorAll(".navigation-link")
  //       .forEach((link) => link.classList.remove("disabled"));
  //   });
  // }

  pressStop(): void {
    this.stopBtn?.addEventListener("click", this.addStopBtnListener.bind(this));
  }

  addStopBtnListener(): void {
    this.stopGame();
    this.removeTimer();
    this.transitionToScore();
    this.toggleStartStopBtns();
    App.switchLinks();
  }

  stopGame(): void {
    this.removeTimer();
  }

  removeTimer(): void {
    this.timer.Stop();
    this.timer.element.remove();
  }

  transitionToScore(): void {
    this.bestScoreUpdate();
    window.location.hash = "/best-score";
    const navBtns = document.querySelectorAll(".navigation-button");
    navBtns.forEach((btn) => btn.classList.remove("btn-active"));
    navBtns[1].classList.add("btn-active");
  }

  bestScoreUpdate(): void {
    this.iDB.readFilteredStart();
  }

  test(
    result:
    | {
      name: string;
      lastName: string;
      email: string;
      score: number;
      id: number;
    }[]
    | undefined
  ): void {
    this.bestScore.render(result);
  }
}
