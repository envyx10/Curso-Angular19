import { Component, computed, input, output } from '@angular/core';
import { Hero, PowerStat, PowerStats } from '../../shared/interfaces/Hero.interface';
import { HeroPowerStatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-item',
  imports: [CommonModule],
  templateUrl: './hero-item.component.html',
  styleUrl: './hero-item.component.scss'
})
export class HeroItemComponent {

  hero = input.required<Hero>();
  PowerStatChange = output<HeroPowerStatsChange>()

  /**
   * Si es villano se le asigna bad
   */
  isHeroVillain = computed(() => this.hero().alignment === 'bad')

  /**
   * Decrementa el valor si es mayor a 0
   * @param PowerStat
   */
  decrementPowerStats(powerStat: PowerStat): void {
    this.PowerStatChange.emit({hero: this.hero(), powerStat, value: -1})
  }

  /**
   * Incremaneta el valor si es menos a 100
   * @param PowerStat
   */
  incrementPowerStats(powerStat: PowerStat): void {
    this.PowerStatChange.emit({hero: this.hero(), powerStat, value: +1})
  }





}
