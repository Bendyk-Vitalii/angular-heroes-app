import { BehaviorSubject, combineLatest, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

import { Hero } from './../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  public selectedHeroes$ = new BehaviorSubject<String[]>([]);
  public actualHeroesSubject = new BehaviorSubject<Hero[]>([]);
  public actualHeroesData$ = this.actualHeroesSubject.asObservable();
  private previousValue: Array<String> = [];
  private allHeroesUrl = 'http://localhost:3000/api/heroes/all';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.allHeroesUrl);
  }

  public setHeroesData(dataResponse: Hero[]): void {
    this.actualHeroesSubject.next(dataResponse);
  }

  public addToFavoriteHero(event: Event): void {
    const targetHero = event.target as HTMLInputElement;
    targetHero.disabled = true;
    this.previousValue = [...this.selectedHeroes$.value, targetHero.id];
    this.selectedHeroes$.next(this.previousValue);
  }
}
