import {
  INITIALIZE_MAP,
  ADD_MARKER,
  CHANGE_BATMAN_POSITION
} from '../actions/types';
import { getCurrentState, createReducer, getNewState } from '../utils';
import { clone } from 'ramda';
import { Maybe } from 'spirals';

const initialMapState = {
  mapsApi: {},
  mapObject: {},
  markers: {
    list: []
  }
};

const initialBatmanState = {
  currentPosition: {
    lat: 40.746422,
    lng: -73.994753
  }
};

const map = (state = initialMapState, action) => {
  const reducers = {};

  reducers[INITIALIZE_MAP] = state => {
    const { mapsApi } = state;
    console.log(mapsApi);
    const { container, center } = action.payload;
    console.log(container, center);
    const mapObject = new mapsApi.Map(
      container,
      { zoom: 16, center }
    );

    return getNewState(state, { mapObject, container });
  };

  reducers[ADD_MARKER] = state => {
    console.log('ADD_MARKER state === ', state);

    const { mapsApi, mapObject } = state;
    const list = clone(
      Maybe(state)
        .get('markers')
        .get('list')
        .value || []
    );
    const marker = new mapsApi.Marker({
      position: {
        lat: action.payload.lat,
        lng: action.payload.lng
      },
      map: mapObject,
      title: Maybe(action.payload).get('title').value
    });

    marker.setMap(mapObject);

    console.log('\n\n\n\n\nmapObject is =', mapObject, '\n\n\n\n\n');

    list.push(marker);

    const markers = { list };

    console.log('getNewState ===',
      getNewState(state, { markers })
    );

    return getNewState(state, { markers, mapObject });
  };

  return createReducer(reducers)(state, action);
};

const batman = (state = initialBatmanState, action) => {
  const reducers = {};

  reducers[CHANGE_BATMAN_POSITION] = state => getNewState(
    state,
    {
      currentPosition: action.payload.position
    }
  );

  return createReducer(reducers)(getCurrentState(state), action);
};

export default { map, batman };
