import {INotificacion, ISection} from "../types"


export interface SelectSectionAction {
    type: 'select-section',
    section: ISection
}

interface INotify {
    type: 'notify'
    notification: null | INotificacion
}

interface SetRegistros {
    type: 'set-registros'
    registros: Record<string, any>[]
}

interface SetMostrar {
    type: 'set-mostrar'
    mostrar: Record<string, any>[]
}

interface SetSelection {
    type: 'set-selection'
    selection: string
}

type actionTypes = SelectSectionAction | INotify | SetRegistros | SetMostrar | SetSelection
export default actionTypes
