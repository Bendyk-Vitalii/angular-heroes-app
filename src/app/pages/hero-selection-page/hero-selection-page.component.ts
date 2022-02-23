import { Hero } from './../../shared/interfaces';
import { HeroesService } from './../../shared/services/heroes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss'],
})
export class HeroSelectionPageComponent implements OnInit {
  heroes: Array<Hero> = [];
  selected = false;
  form!: FormGroup;
  heroesSearchBySub!: Subscription;

  constructor(private heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.form = this.heroesService.formValidator();
  }

  public submit(): void {
    const { value }: any = this.form.get('searchByName');
    this.heroesSearchBySub = this.heroesService
      .getBy(value)
      .subscribe((heroes) => {
        this.heroes = heroes.results;
      });
    this.form.reset();
  }

  public selectHero({ id }: any): void {
    this.selected = true;
    this.heroesService.selectHero(id);
  }

  public identify(index: any, item: any): any {
    return item.name;
  }

  public ngOnDestroy(): void {
    if (this.heroesSearchBySub) {
      this.heroesSearchBySub.unsubscribe();
    }
  }
}
