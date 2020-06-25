import React from "react";
import {connect} from "react-redux";
import {IStore} from "../store/reducers";
import actionTypes from "../store/actionTypes";
import {withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps";


const api_key = "AIzaSyCCOh1DTzNM1668p0amF09KANk143mLHc0"


interface IProps {
}

interface Istate {
}

class Parcelas extends React.Component<IProps, Istate> {

    render () {

        const MyMapComponent: any = withScriptjs(
            withGoogleMap(props => {
                return (
                    <GoogleMap
                        defaultZoom={7}
                        defaultCenter={{ lat: 40, lng: -3.5 }}
                    >
                    </GoogleMap>
                );
            })
        );

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // margin: 15,
                    width: '100vw',
                    height: '94vh',
                }}
            >
                <MyMapComponent
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key="+api_key+"&v=3.exp&libraries=geometry,drawing,places"}
                    loadingElement={<div style={{height: '100%', width: '100%'}} />}
                    containerElement={<div style={{height: '100%', width: '100%'}} />}
                    mapElement={<div style={{height: '100%', width: '100%'}} />}
                />
            </div>
        )
    }
}


const mapStateToProps = (state: IStore) => ({
});

const mapDispatchToProps = (dispatch: (action: actionTypes) => void) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Parcelas);


