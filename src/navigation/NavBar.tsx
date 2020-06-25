import React from 'react';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import {Menu, ExitToApp, ArrowBack, Person} from '@material-ui/icons';
import {userService} from "../services/UserService";
import {connect} from "react-redux";
import moment from "moment";
import 'moment/locale/es';
import {IStore} from "../store/reducers";
import actionTypes from "../store/actionTypes";
import {ISection} from "../types";

moment.locale('es');


interface FProps {
    seccion: ISection
}

function NavBar(props: FProps){
    let title: string = props.seccion;

    return (
        <AppBar style={{
            display: "flex",
            position: 'relative',
            height: '6vh',
            flexDirection: 'row',
            alignItems: "center"
        }}>
            <Toolbar style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}} disableGutters>

                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: '90%'}}>

                    <Typography
                        color="inherit"
                        style={{
                            marginLeft: 60,
                            width: '90%',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            fontSize: 24
                        }}
                    >
                        {title}
                    </Typography>
                </div>

                <Person style={{marginRight: 10}}/>
                {userService.getUser()}

                <IconButton style={{color: 'white', marginLeft:20, marginRight: 20}} onClick={() => userService.logout()}>
                    <ExitToApp />
                </IconButton>

            </Toolbar>
        </AppBar>
    )
}


const mapStateToProps = (state: IStore) => ({
    seccion: state.navegacion.section
});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
