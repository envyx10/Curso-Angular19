import { Hero, PowerStat } from './Hero.interface';

export interface  HeroPowerStatsChange {
  hero: Hero;
  powerStat: PowerStat;
  value: number
}

