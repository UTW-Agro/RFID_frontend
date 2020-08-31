import React from 'react';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import {ExitToApp, ArrowBack, Person} from '@material-ui/icons';
import {userService} from "../services/UserService";
import {connect} from "react-redux";
import moment from "moment";
import 'moment/locale/es';
import {IStore} from "../store/reducers";
import actionTypes from "../store/actionTypes";
import {ISection} from "../types";

moment.locale('es');


interface FProps {
    selectSection(section: ISection): void
    seccion: ISection
    selection: string
}

function NavBar(props: FProps){

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

                    {props.seccion === 'Registros' && (userService.getUser() === 'julio' || userService.getUser() === 'jesus')?
                    <IconButton style={{marginLeft: 20, color: 'white'}} onClick={() => props.selectSection('Menu')}>
                        <ArrowBack/>
                    </IconButton>
                        :
                        null
                    }

                    {props.seccion === 'Registros'?
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
                            Registro de horas de {props.selection}
                        </Typography>
                        :
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
                            Menu
                        </Typography>
                    }

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
    seccion: state.navegacion.section,
    selection: state.navegacion.selection
});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({
    selectSection: (section: ISection) => dispatch({type: "select-section", section})
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
