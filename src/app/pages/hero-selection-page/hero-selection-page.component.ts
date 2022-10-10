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
  public pageNotFoundUrl = GlobalConstants.pageNotFoundUrl;

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
