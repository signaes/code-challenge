/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React|Map" }]*/
import React from 'react';
import { connect } from 'react-redux';
import Map from '../Map';
import {
  addMarker,
  initializeMap,
  findVillain
} from '../../store/actions';
import logo from '../../logo.svg';
import './styles.css';

const App = props => {
  const { map, batman, initializeMap, addMarker, findVillain } = props;
  const { mapsApi } = map;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <Map
        mapsApi={mapsApi}
        initializeMap={initializeMap}
        addMarker={addMarker}
        findVillain={findVillain}
        batman={batman} />
    </div>
  );
};

const mapStateToProps = state => ({ map: state.map, batman: state.batman });
const mapDispatchToProps = dispatch => ({
  addMarker: ({ lat, lng, title }) => dispatch(addMarker({ lat, lng, title })),
  findVillain: ({ lat, lng }) => dispatch(findVillain({ lat, lng })),
  initializeMap: ({ container, center }) => dispatch(initializeMap({ container, center }))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
