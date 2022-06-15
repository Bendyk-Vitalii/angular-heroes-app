import { HeroesService } from './../../shared/services/heroes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
    this.heroesService.selectedHeroes$.subscribe(console.log);
    this.selectedHeroes = this.heroesService.selectedHeroes$;
  }

  ngOnDestroy(): void {
    this.selectedHeroes.unsubscribe();
    this.heroesService.selectedHeroes$.unsubscribe();
  }
}
