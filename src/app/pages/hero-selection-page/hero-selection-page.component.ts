import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, map, of, share } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { forbiddenValueValidator } from 'src/app/shared/custom-validators.directive';
import { Hero } from './../../shared/interfaces';
import { HeroesService } from './../../shared/services/heroes.service';

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent implements OnInit {
  public form!: FormGroup;
  public heroes$!: Observable<Hero[]>;
  public alphabetGeneratorResult: Observable<string[]> | undefined;

  public page: number = 1;

  constructor(public heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.formInit();
    this.searchByName(this.form.get('searchByName'));

    this.alphabetGeneratorResult = this.alphabetGenerator();

    this.getAllHeroes();
    this.heroes$ = this.heroesService.actualHeroesData$;
  }

  private formInit(): FormGroup {
    return (this.form = new FormGroup({
      searchByName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        forbiddenValueValidator(/[a-zA-Z]/),
      ]),
    }));
  }

  private searchByName(searchForm = this.form.get('searchByName')): void {
    let filteredHeroesArray: Hero[];
    searchForm?.valueChanges.subscribe((filterValue) => {
      if (filterValue === '') {
        this.heroes$ = this.heroesService.actualHeroesData$;
      }
      if (searchForm?.status === 'INVALID') {
        return;
      }
      debounceTime(900), distinctUntilChanged(), dataFilter(filterValue);
    });

    const dataFilter = (valueForSearch: string): void => {
      filteredHeroesArray = this.heroesService.actualHeroesSubject
        .getValue()
        .filter(
          (hero: Hero) =>
            hero.name.toLowerCase().indexOf(valueForSearch.toLowerCase()) !== -1
        );
      this.heroes$ = of(filteredHeroesArray);
    };
  }

  private getAllHeroes(): void {
    this.heroesService
      .getAll()
      .subscribe((heroes) => this.heroesService.setHeroesData(heroes), share());
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

  public identify(item: Number): Number {
    return item;
  }

  public alphabetButtonHandler(event: Event): void {
    const { innerText } = event.target as HTMLElement;
    const heroesArray = this.heroesService.actualHeroesSubject.getValue();

    const filtered: Observable<Hero[]> = new Observable(function subscribe(
      subscriber
    ) {
      subscriber.next(
        heroesArray.filter((hero) => Array.from(hero.name)[0] == innerText)
      );
    });
    this.heroes$ = filtered;
  }
}
