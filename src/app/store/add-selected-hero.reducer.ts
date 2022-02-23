import {
  SelectedHeroesActions,
  selectHeroActionsType,
} from './add-selected-hero.actions';

export const selectNode = 'select';

export interface SelectedHeroesState {
  selected: Array<string>;
  updatedAt: number;
}

const initialState: SelectedHeroesState = {
  selected: [],
  updatedAt: Date.now(),
};

export const selectHeroReducer = (
  state = initialState,
  action: SelectedHeroesActions
) => {
  switch (action.type) {
    case selectHeroActionsType.select:
      return {
        ...state,
        selected: state.selected.push('1'),
      };
    case selectHeroActionsType.updatedAt:
      return {
        ...state,
        updatedAt: action.payload.updatedAt,
      };
    default:
      return state;
  }
};
