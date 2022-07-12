import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HeroesService } from './../../shared/services/heroes.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent implements OnInit, OnDestroy {
  private selectedHeroes!: BehaviorSubject<String[]>;
  public submit: any;
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.selectedHeroes$.subscribe(console.dir);
    this.selectedHeroes = this.heroesService.selectedHeroes$;
  }

  ngOnDestroy(): void {
    this.selectedHeroes.unsubscribe();
    this.heroesService.selectedHeroes$.unsubscribe();
  }
}
