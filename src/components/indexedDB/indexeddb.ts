import { App } from "../../app";
import { BestScore } from "../best-score/best-score";
import { Game } from "../game/game";

export class Database {
  public db: IDBDatabase | null = null;

  app: App;

  constructor(app: App) {
    this.db = null;
    this.app = app;
  }

  init(dbName: string): void {
    const iDB = window.indexedDB;
    const openRequest = iDB.open(dbName);
    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;
      const store = database.createObjectStore("Scores", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("name", "name");
      store.createIndex("lastName", "lastName");
      store.createIndex("email", "email");
      store.createIndex("score", "score");
      this.db = database;
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
  }

  write(
    FirstName: string,
    LastName: string,
    email: string,
    score: number,
    bestScore: BestScore,
    game: Game
  ): void {
    const transaction = this.db?.transaction("Scores", "readwrite");
    const store = transaction?.objectStore("Scores");
    store?.put({
      name: FirstName,
      lastName: LastName,
      email,
      score,
    });
    transaction?.addEventListener("complete", () => {
      console.log("complete");
      this.readFiltered(bestScore, game);
    });
    transaction?.addEventListener("error", () => {
      console.log("error");
    });
    transaction?.addEventListener("abort", () => {
      console.log("abort");
    });
  }

  readFiltered(bestScore: BestScore, game: Game): void {
    const transaction = this.db?.transaction("Scores", "readonly");
    const store = transaction?.objectStore("Scores");
    const request = store?.index("score").getAll();

    request?.addEventListener("success", () => {
      bestScore.render(request?.result);
      game.bestScoreUpdate(request?.result);
    });

    transaction?.addEventListener("complete", () => {
      console.log("complete");
    });
  }

  readFilteredStart(): void {
    const transaction = this.db?.transaction("Scores", "readonly");
    const store = transaction?.objectStore("Scores");
    const request = store?.index("score").getAll();

    request?.addEventListener("success", () => {
      this.app.test(request?.result);
    });

    transaction?.addEventListener("complete", () => {
      console.log("complete");
    });
  }
}
