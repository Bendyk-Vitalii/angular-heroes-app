import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from 'src/app/shared/interfaces';
import { HeroesService } from './../../shared/services/heroes.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent implements OnInit {
  public selectedHeroes$!: Observable<Hero[]>;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.getSelectedHeroesData();
  }

  private getSelectedHeroesData(
    heroesIdArray = this.heroesService.selectedHeroes$.getValue(),
    allHeroesData = this.heroesService.actualHeroesSubject.getValue()
  ) {
    this.selectedHeroes$ = of(
      allHeroesData.filter((hero) =>
        heroesIdArray.includes(hero._id.toString())
      )
    );
  }
}
