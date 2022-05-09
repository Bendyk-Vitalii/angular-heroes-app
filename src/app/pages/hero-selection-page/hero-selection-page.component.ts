import { map } from 'rxjs/operators';
import { Hero } from './../../shared/interfaces';
import { HeroesService } from './../../shared/services/heroes.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { pipe, Subscription, switchMap, tap, Observable } from 'rxjs';
import { ImgNotFoundLink } from 'src/app/shared/constants';

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss'],
})
export class HeroSelectionPageComponent implements OnInit {
  heroes: Array<Hero> = [];
  loading: boolean = false;
  form!: FormGroup;
  imgNotFoundLink: String = ImgNotFoundLink;
  alphabetGeneratorResult: Observable<string[]> | undefined;

  constructor(private heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.form = this.heroesService.formValidator();
    this.alphabetGeneratorResult = this.alphabetGenerator();
    this.fetchHeroes();
  }

  public fetchHeroes(getBy = 'a'): void {
    this.loading = true;
    this.heroesService
      .getByName(getBy)
      .subscribe(({ results }) => (this.heroes = results));
    this.loading = false;
  }

  public alphabetGenerator(): Observable<Array<string>> {
    let letters: Array<string> = [];
    for (let i = 65; i <= 90; i++) {
      letters.push(String.fromCharCode(i));
    }
    return Observable.create((observer: { next: (arg0: string[]) => Number }) =>
      observer.next(letters)
    );
  }

  public submit(): void {
    const { value }: any = this.form.get('searchByName');
    this.fetchHeroes(value);
    this.form.reset();
  }

  public addToFavoriteHero(event: Event): void {
    const e = event.target as HTMLInputElement;
    e.disabled = true;
  }

  public identify(item: Number): Number {
    return item;
  }

  public alphabetButtonHandler(event: Event): void {
    const e = event.target as HTMLElement;
    this.fetchHeroes(e.innerHTML);
  }
}
