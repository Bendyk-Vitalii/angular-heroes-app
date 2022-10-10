import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/global-constants';

import { Hero } from 'src/app/shared/interfaces';
import { HeroesService } from './../../shared/services/heroes.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent implements OnInit {
  public selectedHeroes$!: Observable<Hero[]>;
  public firstBoot: boolean = true;
  public pageNotFoundUrl = GlobalConstants.pageNotFoundUrl;
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.loadScript();
  }

  private loadScript(): void {
    if (!this.heroesService.actualHeroes$$.getValue().length) {
      this.getAllHeroes();
      const heroesIdArray = JSON.parse(
        localStorage.getItem('selected-heroes') || '[]'
      );
      this.heroesService.selectedHeroes$.next(heroesIdArray);
    } else {
      this.getSelectedHeroesData(
        this.heroesService.selectedHeroes$.getValue(),
        this.heroesService.actualHeroes$$.getValue()
      );
    }
  }

  private getAllHeroes(): void {
    this.heroesService
      .getAll()
      .pipe(
        switchMap(
          async (allHeroes) => (
            this.getSelectedHeroesData(
              this.heroesService.selectedHeroes$.getValue(),
              allHeroes
            ),
            this.heroesService.setHeroesData(allHeroes)
          )
        )
      );
  }

  private getSelectedHeroesData(
    heroesIdArray: string[] = this.heroesService.selectedHeroes$.getValue(),
    allHeroesData = this.heroesService.actualHeroes$$.getValue()
  ) {
    return (this.selectedHeroes$ = of(
      allHeroesData.filter((hero) =>
        heroesIdArray.includes(hero._id.toString())
      )
    ));
  }
}
