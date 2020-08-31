import React from "react";
import {connect} from "react-redux";
import {IStore} from "../store/reducers";
import actionTypes from "../store/actionTypes";
import {Paper, Typography, Button} from "@material-ui/core";
import {userService} from "../services/UserService";
import axios from "axios";
import {INotificacion} from "../types";

const config = require('../config.json');


interface IProps {
    setRegistros(registros: Record<string, any>[]):void
    setMostrar(mostrar: Record<string, any>[]):void
    notify: (notification: INotificacion) => void
    mostrar: Record<string, any>[]
    registros: Record<string, any>[]
    selection: string
}

interface Istate {

}

class Registros extends React.Component<IProps, Istate> {

    state:Istate = {
    }

    formData = () => {
        const data: string[][] = []
        let row: string[] = []
        let dia: string = ''

        for (const key in Object.keys(this.props.mostrar)) {
            if (dia !== this.props.mostrar[parseInt(key)].timestamp.substring(0,10)) {
                dia = this.props.mostrar[parseInt(key)].timestamp.substring(0,10)
                if (row.length) {
                    if ((row.length-1)%2) {
                        row.push('No has desfichado!')
                    } else {
                        let total:number = 0
                        let entrada:number = 0
                        let salida:number = 0
                        for (let i = 0; i < row.length; i++) {
                            if (i === 0) continue
                            let s = row[i]
                            if (row[i].substring(0,6) === 'online') s = row[i].substring(6)
                            if (i%2 !== 0) {
                                entrada =
                                    parseInt(s.split(':')[0])*3600 +
                                    parseInt(s.split(':')[1])*60 +
                                    parseInt(s.split(':')[0])
                            } else {
                                salida =
                                    parseInt(s.split(':')[0])*3600 +
                                    parseInt(s.split(':')[1])*60 +
                                    parseInt(s.split(':')[0])
                                total += salida - entrada
                            }
                        }
                        row.push(`Total: ${Math.round(total/36)/100} h`)
                    }
                    data.push(row)
                }
                row = []
                row.push(this.props.mostrar[parseInt(key)].timestamp.substring(0,10))
                if (parseInt(this.props.mostrar[parseInt(key)].oficina) === 0) {
                    row.push('online' + this.props.mostrar[parseInt(key)].timestamp.split(' ')[1].substring(0,8))
                } else {
                    row.push(this.props.mostrar[parseInt(key)].timestamp.split(' ')[1].substring(0,8))
                }
            } else {
                if (parseInt(this.props.mostrar[parseInt(key)].oficina) === 0) {
                    row.push('online' + this.props.mostrar[parseInt(key)].timestamp.split(' ')[1].substring(0,8))
                } else {
                    row.push(this.props.mostrar[parseInt(key)].timestamp.split(' ')[1].substring(0,8))
                }
            }
        }
        if (row.length) {
            if ((row.length-1)%2) {
                row.push('No has desfichado!')
            } else {
                let total:number = 0
                let entrada:number = 0
                let salida:number = 0
                for (let i = 0; i < row.length; i++) {
                    if (i === 0) continue
                    let s = row[i]
                    if (row[i].substring(0,6) === 'online') s = row[i].substring(6)
                    if (i%2 !== 0) {
                        entrada =
                            parseInt(s.split(':')[0])*3600 +
                            parseInt(s.split(':')[1])*60 +
                            parseInt(s.split(':')[0])
                    } else {
                        salida =
                            parseInt(s.split(':')[0])*3600 +
                            parseInt(s.split(':')[1])*60 +
                            parseInt(s.split(':')[0])
                        total += salida - entrada
                    }
                }
                row.push(`Total: ${Math.round(total/36)/100} h`)
            }
            data.push(row)
        }

        return data
    }

    handleClick = () => {
        axios.post(
            config.url+'/registro',
            {id: this.props.mostrar[0]['id']},
            {auth: {
                    username: `${userService.getUser()}`,
                    password: `${userService.getPass()}`
                }})
            .then((res: { data: Record<string, any>[] }) => {

                axios.get(
                    config.url+'/registros',
                    {auth: {
                            username: `${userService.getUser()}`,
                            password: `${userService.getPass()}`
                        }})
                    .then((res: { data: Record<string, any>[] }) => {
                        this.props.setRegistros(res.data)
                        if (userService.getUser() === 'julio' || userService.getUser() === 'jesus') {
                            for (let k of Object.keys(this.props.registros)) {
                                if (typeof this.props.registros[parseInt(k)] !== 'object') continue;
                                if (Object.keys(this.props.registros[parseInt(k)])[0] === `${userService.getUser()}`) {
                                    this.props.setMostrar(this.props.registros[parseInt(k)][`${userService.getUser()}`])
                                }
                            }
                        } else {
                            this.props.setMostrar(this.props.registros)
                        }
                        this.props.notify({message: 'Has fichado correctamente!', variant: 'success'});
                    })
                    .catch(() => {this.props.notify({message: 'Ha ocurrido un error interno', variant: 'error'});})

            })
            .catch(() => {console.log('error')})
    }

    convertToCSV = (objArray: any) => {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }

    handleDownload = () => {
        const jsonObject = JSON.stringify(this.props.mostrar);
        const csv = this.convertToCSV(jsonObject);
        const exportedFilenmae = 'registros.csv' || 'export.csv';
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    render () {
        const data = this.formData()
        console.log(data)
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    width: '90vw',
                    height: '90vh',
                    marginTop: 20,
                    alignSelf: 'initial',
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "space-between"
                    }}
                >
                    {this.props.selection === userService.getUser() && this.props.mostrar.length > 0?
                    <Button
                        style={{
                            margin: 10,
                        }}
                        color={'secondary'}
                        variant={"contained"}
                        onClick={() => this.handleClick()}
                    >
                        <Typography style={{fontWeight: "bold"}}>
                            Fichar OnLine
                        </Typography>
                    </Button>
                        :
                        <div/>
                    }

                    <Button
                        style={{
                            marginTop: 10,
                            width: 'fit-content',
                            height: 'fit-content'
                        }}
                        variant={"outlined"}
                        color={"secondary"}
                        onClick={async () => await this.handleDownload()}
                    >
                        <Typography color={"secondary"} style={{fontWeight: "bold"}}>
                            Descargar Datos
                        </Typography>
                    </Button>

                </div>
                <div
                    style={{
                        overflow: "auto"
                    }}
                >
                    {Object.keys(data).map((k1) =>(
                        <Paper
                            key={k1}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: 'fit-content',
                                margin: 10,
                            }}
                        >
                            {Object.keys(data[parseInt(k1)]).map((k2) =>(
                                <div
                                    key={k2}
                                    style={{
                                        margin: 10,
                                        marginRight: 30
                                    }}
                                >
                                    {data[parseInt(k1)][parseInt(k2)].length === 10?
                                        <Typography
                                            style={{fontWeight: "bold", marginRight: 20}}
                                        >
                                            {data[parseInt(k1)][parseInt(k2)]}
                                        </Typography>
                                        :
                                        data[parseInt(k1)][parseInt(k2)] === 'No has desfichado!'?
                                            <Typography
                                                style={{color: "red"}}
                                            >
                                                {data[parseInt(k1)][parseInt(k2)]}
                                            </Typography>
                                            :
                                            data[parseInt(k1)][parseInt(k2)].substring(0,6) === 'Total:'?
                                                <Typography
                                                    style={{color: 'rgba(34,113,0,0.5)', fontWeight: "bold", marginLeft: 20}}
                                                >
                                                    {data[parseInt(k1)][parseInt(k2)]}
                                                </Typography>
                                                :
                                                data[parseInt(k1)][parseInt(k2)].substring(0,6) === 'online'?
                                                    <div>
                                                        <Typography
                                                            style={{color: '#a30000', fontSize: 12, marginTop: -12}}
                                                        >
                                                            online
                                                        </Typography>
                                                        <Typography
                                                            style={{color: parseInt(k2)%2 !== 0? '#804C00':'#000000'}}
                                                        >
                                                            {data[parseInt(k1)][parseInt(k2)].substring(6)}
                                                        </Typography>
                                                    </div>
                                                    :
                                                    <Typography
                                                        style={{color: parseInt(k2)%2 !== 0? '#804C00':'#000000'}}
                                                    >
                                                        {data[parseInt(k1)][parseInt(k2)]}
                                                    </Typography>
                                    }
                                </div>
                            ))}
                        </Paper>
                    ))}

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state: IStore) => ({
    mostrar: state.registros.mostrar,
    selection: state.navegacion.selection,
    registros: state.registros.registros,
});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({
    setRegistros: (registros: Record<string, any>[]) => dispatch({type: "set-registros", registros}),
    setMostrar: (mostrar: Record<string, any>[]) => dispatch({type: "set-mostrar", mostrar}),
    notify: (notification: INotificacion) => dispatch({type: 'notify', notification})
});

export default connect(mapStateToProps, mapDispatchToProps)(Registros);


