import { Action } from '@ngrx/store';

export enum selectHeroActionsType {
  select = '[SELECTEDHEROES] select',
  updatedAt = '[SELECTEDHEROES] updated at',
}

export class CountIncreaseAction implements Action {
  readonly type = selectHeroActionsType.select;
}

export class SelectedUpdatedAtAction implements Action {
  readonly type = selectHeroActionsType.updatedAt;

  constructor(
    public payload: {
      updatedAt: number;
    }
  ) {}
}

export type SelectedHeroesActions =
  | CountIncreaseAction
  | SelectedUpdatedAtAction;
