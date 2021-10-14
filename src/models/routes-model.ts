import { About } from "../components/about/about";
import { GameSettings } from "../components/game-settings/game-settings";

export interface RoutesModel {
  path: string;
  component: GameSettings | About;
}
