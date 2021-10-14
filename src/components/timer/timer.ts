import "./timer.scss";
import { BaseComponent } from "../base-components";
import timerHtml from "../inner-html/timer-html";

export class Timer extends BaseComponent {
  base: number;

  clocktimer: ReturnType<typeof setTimeout> | undefined;

  dateObj: Date;

  dh: string;

  dm: string;

  ds: string;

  mS: string;

  readout: string;

  h: number;

  m: number;

  tm: number;

  s: number;

  ts: number;

  ms: number;

  init: number;

  constructor() {
    super("form", ["timerform"]);
    this.element.innerHTML = timerHtml;
    this.base = 60;
    this.dateObj = new Date();
    this.dh = "";
    this.dm = "";
    this.ds = "";
    this.mS = "";
    this.readout = "";
    this.h = 1;
    this.m = 1;
    this.tm = 1;
    this.s = 0;
    this.ts = 0;
    this.ms = 0;
    this.init = 0;
  }

  ClearClock(): void {
    if (this.clocktimer) clearTimeout(this.clocktimer);
    this.h = 1;
    this.m = 1;
    this.tm = 1;
    this.s = 0;
    this.ts = 0;
    this.ms = 0;
    this.init = 0;
    this.readout = "00:00:00";
    document.forms[0].timer.value = this.readout;
  }

  Start(): void {
    this.ClearClock();
    this.dateObj = new Date();
    this.StartTime();
    this.init = 1;
  }

  Stop(): void {
    if (this.clocktimer) clearTimeout(this.clocktimer);
    this.init = 0;
  }

  StartTime(): void {
    const cdateObj = new Date();
    const t = cdateObj.getTime() - this.dateObj.getTime() - this.s * 1000;
    if (t > 999) this.s++;
    if (this.s >= this.m * this.base) {
      this.ts = 0;
      this.m++;
    } else {
      this.ts = Math.floor(this.ms / 100 + this.s);
      if (this.ts >= this.base) this.ts -= (this.m - 1) * this.base;
    }
    if (this.m > this.h * this.base) {
      this.tm = 1;
      this.h++;
    } else {
      this.tm = Math.floor(this.ms / 100 + this.m);
      if (this.tm >= this.base) this.tm -= (this.h - 1) * this.base;
    }
    this.ms = Math.round(t / 10);
    if (this.ms > 99) this.ms = 0;
    if (this.ms === 0) this.mS = "00";
    if (this.ms > 0 && this.ms <= 9) this.mS = `0${this.ms}`;
    if (this.ts > 0) {
      this.ds = String(this.ts);
      if (this.ts < 10) this.ds = `0${this.ts}`;
    } else {
      this.ds = "00";
    }
    const dm = this.tm - 1;
    if (dm > 0) {
      if (dm < 10) {
        this.dm = `0${dm}`;
      }
    } else {
      this.dm = "00";
    }
    const dh = this.h - 1;
    if (dh > 0) {
      if (dh < 10) {
        this.dh = `0${dh}`;
      }
    } else {
      this.dh = "00";
    }
    this.readout = `${this.dh}:${this.dm}:${this.ds}`;
    document.forms[0].timer.value = this.readout;
    this.clocktimer = setTimeout(this.StartTime.bind(this), 1);
  }
}
