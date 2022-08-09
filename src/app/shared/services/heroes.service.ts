import { GlobalConstants } from './../global-constants';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Hero } from './../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  public selectedHeroes$ = new BehaviorSubject<string[]>([]);
  public actualHeroes$$ = new BehaviorSubject<Hero[]>([]);
  public actualHeroesData$ = this.actualHeroes$$.asObservable();
  private previousValue: Array<string> = [];
  private allHeroesUrl = GlobalConstants.allHeroesUrl;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.allHeroesUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  public setHeroesData(dataResponse: Hero[]): void {
    this.actualHeroes$$.next(dataResponse);
  }

  public addToFavoriteHero(event: Event): void {
    const targetHero = event.target as HTMLInputElement;
    targetHero.disabled = true;

    this.previousValue = [...this.selectedHeroes$.value, targetHero.id];
    this.selectedHeroes$.next(this.previousValue);
    localStorage.setItem(
      'selected-heroes',
      JSON.stringify([...this.selectedHeroes$.getValue()])
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
