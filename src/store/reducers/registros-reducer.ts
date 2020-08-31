import actionTypes from "../actionTypes";


const update = require('immutability-helper');


export const initialState = {
    registros: [] as Record<string, any>[],
    mostrar: [] as Record<string, any>[]
};

export function reducer(state: typeof initialState=initialState, action: actionTypes) {
    switch (action.type) {
        case 'set-registros':
            return update(state, {registros: {$set: action.registros}});

        case 'set-mostrar':
            return update(state, {mostrar: {$set: action.mostrar}});

        default:
            return state
    }
}