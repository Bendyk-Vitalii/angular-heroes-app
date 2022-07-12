import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Hero } from './../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  public selectedHeroes$ = new BehaviorSubject<String[]>([]);
  public actualHeroesArray$ = new BehaviorSubject<Hero[]>([]);
  private previousValue: Array<String> = [];
  private allHeroesUrl = 'http://localhost:3000/api/heroes/all';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.allHeroesUrl);
  }

  public getByName(id: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.allHeroesUrl}?${id}`);
  }

  public addToFavoriteHero(event: Event): void {
    const targetHero = event.target as HTMLInputElement;
    targetHero.disabled = true;
    this.previousValue = [...this.selectedHeroes$.value, targetHero.id];
    this.selectedHeroes$.next(this.previousValue);
  }
}
