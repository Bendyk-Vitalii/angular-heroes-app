// import { Injectable } from '@angular/core';
// import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
// import { map } from 'rxjs/operators';
// import {
//   selectHeroActionsType,
//   SelectedHeroesActions,
// } from './store/add-selected-hero.actions';

// @Injectable()
// export class AppEffects {
//   constructor(private actions$: Actions) {}

//   @Effect()
//   updatedAt$() {
//     return this.actions$.pipe(
//       ofType(selectHeroActionsType.select),
//       map(() => {
//         return new SelectedHeroesAction({
//           updatedAt: Date.now(),
//         });
//       })
//     );
//   }
// }
