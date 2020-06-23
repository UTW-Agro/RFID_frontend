import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { userService } from '../services/UserService';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

interface IProps {
    location?: any
    history?: any
}

interface IState {
    user: string
    password: string
    error: null | string
}


class LoginPage extends React.Component<IProps, IState> {
    state = {
        user: '',
        password: '',
        error: null
    };

    async handleSubmit(e: any) {
        e.preventDefault();
        console.log('submitted');
        const logged = await userService.login(this.state.user, this.state.password);
        if (logged) {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            this.props.history.push(from);
        } else {
            this.setState({error: 'error'});
            setTimeout(() => this.setState({error: null}), 2000)
        }
    }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start'}}>
                <AppBar style={{display: "flex", position: 'relative'}}>
                    <Toolbar style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} disableGutters>
                        <Typography color="inherit" style={{marginLeft: 60, fontSize: 25}}>
                            Login
                        </Typography>
                    </Toolbar>
                </AppBar>

                <TextField
                    style={{margin: 8}}
                    value={this.state.user}
                    error={this.state.error != null}
                    label={this.state.error ? this.state.error:"usuario"}
                    placeholder={"usuario"}
                    onChange={(e) => this.setState({user: e.target.value})}
                />
                <TextField
                    style={{margin: 8}}
                    value={this.state.password}
                    type={'password'}
                    error={this.state.error != null}
                    label={this.state.error ? this.state.error:"contraseña"}
                    placeholder={"contraseña"}
                    onChange={(e) => this.setState({password: e.target.value})}
                    onKeyPress={(e) => (e.key === 'Enter') && this.handleSubmit(e)}
                />
                <Button variant={'contained'} color={'primary'} onClick={(e) => this.handleSubmit(e)}>Login</Button>
            </div>
        );
    }
}

export default LoginPage;
