import { Hero } from './../../shared/interfaces';
import { HeroesService } from './../../shared/services/heroes.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss'],
})
export class HeroSelectionPageComponent implements OnInit {
  heroes: Array<Hero> = [];
  loading: boolean = false;
  form!: FormGroup;
  heroesSearchBySub!: Subscription;

  constructor(private heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.form = this.heroesService.formValidator();

    this.alphabetGenerator();
    this.loading = true;
    this.heroesSearchBySub = this.heroesService
      .getBy('a')
      .subscribe((heroes) => {
        this.heroes = heroes.results;
        this.loading = false;
      });
  }

  public alphabetGenerator(): Array<string> {
    let letters = [];
    for (let i = 65; i <= 90; i++) {
      letters.push(String.fromCharCode(i));
    }
    return letters;
  }

  public submit(): void {
    this.loading = true;
    const { value }: any = this.form.get('searchByName');
    this.heroesSearchBySub = this.heroesService
      .getBy(value)
      .subscribe((heroes) => {
        this.heroes = heroes.results;
        this.loading = false;
      });
    this.form.reset();
  }

  public selectHero(t: any): void {
    t.disabled = true;
  }

  public identify(index: any, item: any): any {
    return item.name;
  }

  public alphabetButtonHandler({ innerHTML }: any): any {
    this.loading = true;

    this.heroesSearchBySub = this.heroesService
      .getBy(innerHTML)
      .subscribe((heroes) => {
        this.heroes = heroes.results;
        this.loading = false;
      });
  }

  public ngOnDestroy(): void {
    if (this.heroesSearchBySub) {
      this.heroesSearchBySub.unsubscribe();
    }
  }
}
