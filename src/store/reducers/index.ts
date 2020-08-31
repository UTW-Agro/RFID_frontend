import { combineReducers } from 'redux'
import {reducer as navegacionReducer, initialState as navegacionInitialState} from './navegacion-reducer'
import {reducer as registrosReducer, initialState as registrosInitialState} from './registros-reducer'


export const combinedReducers = combineReducers({
  navegacion: navegacionReducer,
  registros: registrosReducer
});

export interface IStore {
  navegacion: typeof navegacionInitialState
  registros: typeof registrosInitialState
}
