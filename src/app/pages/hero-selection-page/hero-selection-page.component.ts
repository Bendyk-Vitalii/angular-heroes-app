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
  form!: FormGroup;
  heroesSearchBySub!: Subscription;

  constructor(private heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      searchById: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(1),
        Validators.required,
      ]),
      searchByName: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
        Validators.pattern(/[^!@#\$%\^&\(\),\.+=\/\{\}?><":;|\d]/),
      ]),
    });
  }

  public submit(): void {
    const { value }: any = this.form.get('searchByName');
    this.heroesSearchBySub = this.heroesService
      .getBy(value)
      .subscribe((heroes) => {
        this.heroes = heroes.results;
        console.dir(this.heroes);
      });
    this.form.reset();
  }

  public selectHero({ id }: any): void {
    this.heroesService.selectHero(id);
  }

  public identify(index: any, item: any): any {
    return item.name;
  }

  private ngOnDestroy(): void {
    if (this.heroesSearchBySub) {
      this.heroesSearchBySub.unsubscribe();
    }
  }
}
