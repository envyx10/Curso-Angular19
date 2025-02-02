import { Component } from '@angular/core';
import { HeroListComponent } from "./components/hero-list/hero-list.component";
import { HeroNewComponent } from "./components/hero-new/hero-new.component";


@Component({
  selector: 'app-root',
  imports: [HeroListComponent, HeroNewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-renaissance-workshop';
}
