import React, {ReactNode} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import {PrivateRoute} from "./components/PrivateRoute";
import NavBar from "./navigation/NavBar";
import CustomSnackbar from "./navigation/CustomSnackbar";
import {IStore} from "./store/reducers";
import actionTypes from "./store/actionTypes";
import {INotificacion, ISection} from "./types";
import {connect} from "react-redux";
import Registros from "./sections/Registros";
import Menu from "./sections/Menu";
import {userService} from "./services/UserService";
import axios from "axios";

const config = require('./config.json');


interface IProps {
    closeNotification(): void
    setRegistros(registros: Record<string, any>[]):void
    setMostrar(mostrar: Record<string, any>[]):void
    selectSection(section: ISection): void
    setSelection(selection: string): void
    notification: INotificacion | null
    registros: Record<string, any>[]
    mostrar: Record<string, any>[]
    section: ISection
}

interface IState {

}

class App extends React.Component<IProps, IState> {

    componentDidMount() {
        axios.get(
            config.url+'/registros',
            {auth: {
                    username: `${userService.getUser()}`,
                    password: `${userService.getPass()}`
                }})
            .then((res: { data: Record<string, any>[] }) => {
                this.props.setRegistros(res.data)
                if (userService.getUser() === 'julio' || userService.getUser() === 'jesus') {
                    this.props.selectSection('Menu')
                } else {
                    this.props.setMostrar(this.props.registros)
                    this.props.setSelection(`${userService.getUser()}`)
                    this.props.selectSection('Registros')
                }
            })
            .catch(() => {console.log('error')})

    }

    chooseSection = (section: ISection): ReactNode => {
        switch (section) {
            case 'Menu':
                return <Menu/>;
            case 'Registros':
                return <Registros/>;
            default:
                return <div style={{marginTop: 20}}>{`Sección ${section} desconocida`}</div>
        }
    };

    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                width: '100vw',
                height: '100vh',
                alignItems: 'center',
                // backgroundColor: '#eeeeee'  //todo: quitar
            }}>
                <NavBar/>
                <CustomSnackbar
                    open={this.props.notification != null}
                    variant={(this.props.notification != null) ? this.props.notification.variant: "info"}
                    message={this.props.notification && this.props.notification.message}
                    autoHideDuration={2000}
                    onClose={this.props.closeNotification}
                />
                {this.chooseSection(this.props.section)}
            </div>
        )
    }
}

const mapStateToProps = (state: IStore) => ({
    section: state.navegacion.section,
    notification: state.navegacion.notification,
    registros: state.registros.registros,
    mostrar: state.registros.mostrar
});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({
    closeNotification: () => dispatch({type: "notify", notification: null}),
    setRegistros: (registros: Record<string, any>[]) => dispatch({type: "set-registros", registros}),
    setMostrar: (mostrar: Record<string, any>[]) => dispatch({type: "set-mostrar", mostrar}),
    selectSection: (section: ISection) => dispatch({type: "select-section", section}),
    setSelection: (selection: string) => dispatch({type: "set-selection", selection})
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


const Home = () => {
    return(
        <BrowserRouter basename={config.basename}>
            <PrivateRoute exact path='/' component={ConnectedApp}/>
            <Route path='/login' component={LoginPage}/>
        </BrowserRouter>
    )
};

export default Home;
