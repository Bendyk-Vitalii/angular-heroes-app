import { GlobalConstants } from './../../shared/global-constants';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  public heroes$!: Observable<Hero[]>;
  private actualHeroes$$ = this.heroesService.actualHeroes$$;
  public form!: FormGroup;
  private inputSearchByName!: FormControl | AbstractControl | null;
  public alphabetGeneratorResult: Observable<string[]> | undefined;
  public page = 1;
  public pageNotFoundUrl =
    'data:image/png;base64,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';

  constructor(public heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.loadScript();
    this.alphabetGeneratorResult = this.alphabetGenerator();
    this.formInit();
  }

  private loadScript(): void {
    if (!this.actualHeroes$$.getValue().length) {
      this.getAllHeroes();
    }
    this.heroes$ = this.heroesService.actualHeroesData$;
  }

  private formInit(): void {
    this.form = new FormGroup({
      searchByName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        forbiddenValueValidator(/[a-zA-Z]/),
      ]),
    });
  }

  private getAllHeroes(): void {
    this.heroesService
      .getAll()
      .subscribe((heroes) => this.heroesService.setHeroesData(heroes));
  }

  private listenSearchFormChanges(
    form: FormControl | AbstractControl | null
  ): void {
    form!.valueChanges.subscribe((filterValue) => {
      if (filterValue === '') {
        this.heroes$ = this.heroesService.actualHeroesData$;
      }
      if (form?.status === 'INVALID') {
        return;
      }
      debounceTime(900),
        distinctUntilChanged(),
        this.dataFilterByName(filterValue);
    });
  }

  private dataFilterByName(valueForSearch: string): void {
    let filteredHeroesArray: Hero[];
    filteredHeroesArray = this.actualHeroes$$
      .getValue()
      .filter(
        (hero: Hero) =>
          hero.name.toLowerCase().indexOf(valueForSearch.toLowerCase()) !== -1
      );
    this.heroes$ = of(filteredHeroesArray);
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

  public alphabetButtonHandler(event: Event): void {
    const { innerText } = event.target as HTMLElement;
    const heroesArray = this.actualHeroes$$.getValue();

    const filteredHeroes$: Observable<Hero[]> = new Observable(
      function subscribe(subscriber) {
        subscriber.next(
          heroesArray.filter((hero) => Array.from(hero.name)[0] == innerText)
        );
      }
    );
    this.heroes$ = filteredHeroes$;
  }

  public identify(item: Number): Number {
    return item;
  }

  ngAfterViewInit(): void {
    this.inputSearchByName = this.form.get('searchByName');
    this.listenSearchFormChanges(this.inputSearchByName);
  }
}
