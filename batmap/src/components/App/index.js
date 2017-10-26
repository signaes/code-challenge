/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React|Map|Villain" }]*/
import React from 'react';
import { connect } from 'react-redux';
import Map from '../Map';
import Villain from '../Villain';
import {
  addMarker,
  initializeMap,
  findVillain
} from '../../store/actions';
import displayFloat from '../../utils/displayFloat';
import logo from '../../logo.svg';
import './styles.css';

const App = props => {
  const { map, batman, villain, initializeMap, addMarker, findVillain } = props;
  const { mapsApi } = map;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Greetings Batman</h1>
        <p>
          You are currently at lat: { displayFloat(batman.currentPosition.lat) } & lng: { displayFloat(batman.currentPosition.lng) }
        </p>
      </header>
      { villain ? <Villain villain={villain} /> : null }
      <Map
        mapsApi={mapsApi}
        initializeMap={initializeMap}
        addMarker={addMarker}
        findVillain={findVillain}
        batman={batman} />
    </div>
  );
};

const mapStateToProps = state => ({ map: state.map, batman: state.batman, villain: state.villain });
const mapDispatchToProps = dispatch => ({
  addMarker: ({ lat, lng, title }) => dispatch(addMarker({ lat, lng, title })),
  findVillain: ({ lat, lng }) => dispatch(findVillain({ lat, lng })),
  initializeMap: ({ container, center }) => dispatch(initializeMap({ container, center }))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
