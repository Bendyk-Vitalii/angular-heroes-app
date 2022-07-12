import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, map } from 'rxjs';

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
  public imgNotFoundLink!: String;
  public alphabetGeneratorResult: Observable<string[]> | undefined;
  public getHeroes$!: any;
  public getAllHeroes$!: Observable<Hero[]>;
  public heroes!: Hero[];
  public p: number = 1;

  constructor(public heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.formInit();
    this.alphabetGeneratorResult = this.alphabetGenerator();
    if (!this.heroes) {
      this.getAllHeroes();
    }
  }

  private formInit(): FormGroup {
    return (this.form = new FormGroup({
      searchByName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        forbiddenValueValidator(/[^A-Za-z]+/),
      ]),
    }));
  }

  // private followFormChanges(): Subscription {
  //   return this.form.valueChanges.subscribe((changes) => {
  //     this.nameForSearch = changes.searchByName;
  //   });
  // }

  private getAllHeroes(): void {
    this.heroesService.getAll().subscribe((heroes) => (this.heroes = heroes));
  }

  public getHeroesByName(getBy: string) {
    this.heroesService
      .getByName(getBy)
      .pipe(map((heroes: Hero[]) => (this.heroes = heroes)));
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
    this.getHeroes$ = this.getHeroesByName(innerText);
  }

  onsubmit(getBy: string) {
    this.getHeroes$ = this.getHeroesByName(getBy);
  }
}
