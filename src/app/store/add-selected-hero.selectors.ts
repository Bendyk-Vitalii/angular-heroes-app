import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectNode, SelectedHeroesState } from './add-selected-hero.reducer';

export const selectHeroFeature =
  createFeatureSelector<SelectedHeroesState>(selectNode);

export const selectHero = createSelector(
  selectHeroFeature,
  (state: SelectedHeroesState): Array<string> => state.selected
);

export const selectUpdatedAt = createSelector(
  selectHeroFeature,
  (state: SelectedHeroesState): number => state.updatedAt
);
