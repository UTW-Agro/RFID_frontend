import actionTypes from "../actionTypes";
import {INotificacion, ISection} from "../../types";

const update = require('immutability-helper');


export const initialState = {
    notification: null as null | INotificacion,
    section: 'parcelas' as ISection
};

export function reducer(state: typeof initialState=initialState, action: actionTypes) {
    switch (action.type) {
        case 'notify':
            return update(state, {notification: {$set: action.notification}});

        case 'select-section':
            return update(state, {section: {$set: action.section}});

        default:
            return state
    }
}
