import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero, PowerStats } from '../../shared/interfaces/Hero.interface';

@Component({
  selector: 'app-hero-new',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-new.component.html',
  styleUrl: './hero-new.component.scss'
})
export class HeroNewComponent {

  readonly #formBuilder = inject(FormBuilder);
  message = "" ;

  heroForm = this.#formBuilder.group({
    name:['Joker', Validators.required],
    image:[
      "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/370-joker.jpg"
    ],
    aligment:['bad'],
    powerstats: this.#formBuilder.group({
      intelligence: [100, Validators.required],
      strength:     [10,  Validators.required],
      speed:        [100, Validators.required],
      durability:   [100, Validators.required],
      power:        [100, Validators.required],
      combat:       [100, Validators.required],
      })

  });

  addHero(){

    if(this.heroForm.invalid) {

      this.message = "Please correct all errors and resubmit the form";

    } else {

      const hero: Hero = {
        id: Math.floor( Math.random() * 1000 ) + 1 ,
        ...this.heroForm.value
      } as Hero

    }
  }

}
