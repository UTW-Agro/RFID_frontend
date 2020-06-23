import React from 'react';
import {connect} from "react-redux";
import {IStore} from "../store/reducers";
import actionTypes from "../store/actionTypes";


interface IProps {
}

interface Istate {
}

class Parcelas extends React.Component<IProps, Istate> {



    state = {
    }

    render () {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 15,
                marginTop: 30,
                width: '60vw',
                height: '87vh',
            }}>
                {'SECCIÓN DE PARCELAS'}
            </div>
        )
    }
}


const mapStateToProps = (state: IStore) => ({
});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Parcelas);
