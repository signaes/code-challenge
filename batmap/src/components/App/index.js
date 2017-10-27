/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React|Map|Villain|Search|Batlogo" }]*/
import React from 'react';
import { connect } from 'react-redux';
import Map from '../Map';
import Villain from '../Villain';
import Search from '../Search';
import Batlogo from '../Batlogo';
import {
  addMarker,
  initializeMap,
  findVillain,
  selectTarget,
  setSearchLat,
  setSearchLng
} from '../../store/actions';
import displayFloat from '../../utils/displayFloat';
import './styles.css';

const App = props => {
  const {
    map,
    batman,
    villain,
    search,
    initializeMap,
    addMarker,
    findVillain,
    selectTarget,
    setSearchLat,
    setSearchLng
  } = props;
  const { mapsApi } = map;

  return (
    <div className="App">
      <header className="App__header">
        <Batlogo />
      </header>
      <Search
        initializeMap={initializeMap}
        findVillain={findVillain}
        map={map}
        search={search}
        setSearchLat={setSearchLat}
        setSearchLng={setSearchLng} />
      <div className="Batman--info">
        <h1 className="App__title">Batmap</h1>
        <p className="App__current-position">
          <span className="App__current-position__prefix">You are now at: </span>{ displayFloat(batman.currentPosition.lat) }, { displayFloat(batman.currentPosition.lng) }
        </p>
      </div>
      { villain ? <Villain villain={villain} selectTarget={selectTarget} /> : null }
      <Map
        mapsApi={mapsApi}
        initializeMap={initializeMap}
        addMarker={addMarker}
        findVillain={findVillain}
        batman={batman} />
    </div>
  );
};

const mapStateToProps = state => ({
  map: state.map,
  batman: state.batman,
  villain: state.villain,
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  addMarker: ({ lat, lng, title }) => dispatch(addMarker({ lat, lng, title })),
  findVillain: ({ lat, lng }) => dispatch(findVillain({ lat, lng })),
  initializeMap: ({ container, center }) => dispatch(initializeMap({ container, center })),
  selectTarget: params => dispatch(selectTarget(params)),
  setSearchLat: params => dispatch(setSearchLat(params)),
  setSearchLng: params => dispatch(setSearchLng(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
