export interface INotificacion {
    message: string
    variant: 'info' | 'warning' | 'error' | 'success'
}

export type ISection = 'Menu' | 'Registros'