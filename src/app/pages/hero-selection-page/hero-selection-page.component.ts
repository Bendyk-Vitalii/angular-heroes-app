import { ImgNotFoundLink } from 'src/app/shared/constants';
import { Hero, ServerResponse } from './../../shared/interfaces';
import { HeroesService } from './../../shared/services/heroes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { map, Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { NgIfContext } from '@angular/common';
import { forbiddenValueValidator } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent implements OnInit {
  public loader!: TemplateRef<NgIfContext<Hero[] | null>>;
  public form!: FormGroup;
  public imgNotFoundLink!: String;
  public alphabetGeneratorResult: Observable<string[]> | undefined;
  public getHeroes$!: Observable<Hero[]>;
  public nameForSearch!: string;
  public selectedHeroes$ = new BehaviorSubject<String[]>([]);
  public addToFavoriteHeroes!: (event: Event) => void;
  constructor(public heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.formInit();
    this.followFormChanges();
    this.alphabetGeneratorResult = this.alphabetGenerator();
    this.imgNotFoundLink = ImgNotFoundLink;
    this.getHeroes$ = this.getHeroes();
    this.getHeroes();
    this.addToFavoriteHeroes = this.heroesService.addToFavoriteHero;
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

  private followFormChanges(): Subscription {
    return this.form.valueChanges.subscribe((changes) => {
      this.nameForSearch = changes.searchByName;
    });
  }

  public getHeroes(getBy = 'a'): Observable<Hero[]> {
    return this.heroesService
      .getByName(getBy)
      .pipe(map((response: ServerResponse) => response.results));
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

  // export interface Hero {
  //   appearance: Object;
  //   biography: Object;
  //   connections: Object;
  //   id: string;
  //   image: any;
  //   name: string;
  //   powerstats: any;
  //   work: Object;
  // }
  // public addToFavoriteHero(event: Event): void {
  //   const targetHero = event.target as HTMLInputElement;
  //   targetHero.disabled = true;
  //   this.selectedHeroes$.subscribe({
  //     next: (previousArray) => previousArray.push(targetHero.id),
  //   });
  // }

  public identify(item: Number): Number {
    return item;
  }

  public alphabetButtonHandler(event: Event): void {
    const { innerText } = event.target as HTMLElement;
    this.getHeroes$ = this.getHeroes(innerText);
  }

  onsubmit(getBy: string) {
    this.getHeroes$ = this.getHeroes(getBy);
  }
}
