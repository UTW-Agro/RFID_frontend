import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import {PrivateRoute} from "./components/PrivateRoute";
import NavBar from "./navigation/NavBar";
import CustomSnackbar from "./navigation/CustomSnackbar";
import {IStore} from "./store/reducers";
import actionTypes from "./store/actionTypes";
import {INotificacion} from "./types";
import {connect} from "react-redux";
import Parcelas from "./sections/Parcelas";

const config = require('./config.json');


interface IProps {
    notification: INotificacion | null
    closeNotification(): void
}

interface IState {

}

class App extends React.Component<IProps, IState> {

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", flex: 1, height: '100%', alignItems: 'center', width: '100%'}}>
                <NavBar/>
                <CustomSnackbar
                    open={this.props.notification != null}
                    variant={(this.props.notification != null) ? this.props.notification.variant: "info"}
                    message={this.props.notification && this.props.notification.message}
                    autoHideDuration={2000}
                    onClose={this.props.closeNotification}
                />
                <Parcelas/>
            </div>
        )
    }
}

const mapStateToProps = (state: IStore) => ({
    section: state.navegacion.section,
    notification: state.navegacion.notification
});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({
    closeNotification: () => dispatch({type: "notify", notification: null})
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
