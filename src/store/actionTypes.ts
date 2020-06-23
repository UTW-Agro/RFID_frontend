import {INotificacion, ISection} from "../types"


export interface SelectSectionAction {
    type: 'select-section',
    section: ISection
}

interface INotify {
    type: 'notify'
    notification: null | INotificacion
}

type actionTypes = SelectSectionAction | INotify
export default actionTypes
