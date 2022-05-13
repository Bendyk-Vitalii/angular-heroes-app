import { ImgNotFoundLink } from 'src/app/shared/constants';
import { Hero, ServerResponse } from './../../shared/interfaces';
import { HeroesService } from './../../shared/services/heroes.service';
import { FormGroup } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent implements OnInit {
  heroes: Array<Hero> = [];
  loader!: TemplateRef<any>;
  form!: FormGroup;
  imgNotFoundLink!: String;
  alphabetGeneratorResult: Observable<string[]> | undefined;
  fetchHeroes$!: Observable<any>;

  constructor(private heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.form = this.heroesService.formValidator();
    this.alphabetGeneratorResult = this.alphabetGenerator();
    this.imgNotFoundLink = ImgNotFoundLink;
    this.fetchHeroes$ = this.fetchHeroes();
  }

  public fetchHeroes(getBy = 'a'): Observable<ServerResponse> {
    return this.heroesService.getByName(getBy);
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
    this.fetchHeroes$ = this.fetchHeroes(value);
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
    this.fetchHeroes$ = this.fetchHeroes(e.innerHTML);
  }
}
