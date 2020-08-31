import React from "react";
import {connect} from "react-redux";
import {Button, Typography} from '@material-ui/core';
import {IStore} from "../store/reducers";
import actionTypes from "../store/actionTypes";

import {ISection} from "../types";


interface IProps {
    setMostrar(mostrar: Record<string, any>[]):void
    selectSection(section: ISection): void
    setSelection(selection: string): void
    registros: Record<string, any>[]
}

interface Istate {
    selected:string
}

class Menu extends React.Component<IProps, Istate> {
    state:Istate = {
        selected: ''
    }

    getNames = () => {
        const nombres: string [] = []
        for (let k of Object.keys(this.props.registros)) {
            if (typeof this.props.registros[parseInt(k)] !== 'object') continue;
            nombres.push(Object.keys(this.props.registros[parseInt(k)])[0])
        }
        return nombres
    }

    getRegistros = (nombre: string) => {
        for (let k of Object.keys(this.props.registros)) {
            if (typeof this.props.registros[parseInt(k)] !== 'object') continue;
            if (Object.keys(this.props.registros[parseInt(k)])[0] === nombre) {
                this.props.setMostrar(this.props.registros[parseInt(k)][nombre])
            }
        }
        return
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

        let data = this.props.registros

        const toDownload = []
        for (const e in data) {
            for (const e2 in data[e][Object.keys(data[e])[0]]) {
                if (data[e][Object.keys(data[e])[0]].hasOwnProperty(e2)) {
                    data[e][Object.keys(data[e])[0]][e2]['nombre'] = Object.keys(data[e])[0]
                    toDownload.push(data[e][Object.keys(data[e])[0]][e2])
                }
            }
        }
        const jsonObject = JSON.stringify(toDownload);
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



    render() {
        const nombres = this.getNames()
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '80vw',
                    height: '90vh',
                    marginTop: 30,
                    justifyContent: "space-between"
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {nombres.map((nombre) => (
                        <Button
                            key={nombre}
                            variant="contained"
                            style={{
                                backgroundColor:"#ffffff",
                                margin: 10,
                                width: 300
                            }}
                            onClick={() => {
                                this.getRegistros(nombre)
                                this.props.setSelection(nombre)
                                this.props.selectSection('Registros')}
                            }
                            onMouseEnter={() => this.setState({selected: nombre})}
                            onMouseLeave={() => this.setState({selected: ''})}
                        >
                            <Typography
                                style={{
                                    fontWeight: nombre === this.state.selected? "bold": "unset",
                                    fontSize: 20
                                }}
                            >
                                {nombre}
                            </Typography>
                        </Button>
                    ))}
                </div>

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
        )
    }
}

const mapStateToProps = (state: IStore) => ({
    registros: state.registros.registros
});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({
    setMostrar: (mostrar: Record<string, any>[]) => dispatch({type: "set-mostrar", mostrar}),
    selectSection: (section: ISection) => dispatch({type: "select-section", section}),
    setSelection: (selection: string) => dispatch({type: "set-selection", selection})
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);