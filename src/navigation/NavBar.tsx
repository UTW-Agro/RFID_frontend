import React from 'react';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import {connect} from "react-redux";
import {IStore} from "../store/reducers";
import actionTypes from "../store/actionTypes";


interface FProps {
}

function NavBar(props: FProps){
    return (
        <AppBar style={{
            display: "flex",
            position: 'relative',
            height: '7vh',
            flexDirection: 'row',
            alignItems: "center"
        }}>
            <Toolbar style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}} disableGutters>

            </Toolbar>
        </AppBar>
    )
}


const mapStateToProps = (state: IStore) => ({

});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
