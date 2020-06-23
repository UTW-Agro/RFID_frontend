import { combineReducers } from 'redux'
import {reducer as navegacionReducer, initialState as navegacionInitialState} from './navegacion-reducer'


export const combinedReducers = combineReducers({
  navegacion: navegacionReducer
});

export interface IStore {
  navegacion: typeof navegacionInitialState
}
