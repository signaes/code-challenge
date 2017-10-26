import {
  INITIALIZE_MAP,
  ADD_MARKER,
  ADD_VILLAIN,
  ADD_TARGETS,
  SELECT_TARGET,
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

const initialVillainState = {
  name: '',
  location: {},
  targets: {
    active: {},
    list: []
  }
};


const map = (state = initialMapState, action) => {
  const reducers = {};

  reducers[INITIALIZE_MAP] = state => {
    const { mapsApi } = state;
    const { container, center } = action.payload;
    const mapObject = new mapsApi.Map(
      container,
      { zoom: 16, center }
    );

    return getNewState(state, { mapObject, container });
  };

  reducers[ADD_MARKER] = state => {
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
    const infoWindow = new mapsApi.InfoWindow;

    mapsApi.event.addListener(marker, 'click', function() {
      infoWindow.setContent(action.payload.title);
      infoWindow.open(mapObject, marker);
    });

    list.push({ marker, lat: action.payload.lat, lng: action.payload.lng });
    list.forEach(({ marker, lat, lng }) => {
      marker.setMap(mapObject);
      marker.setPosition({ lat, lng });
    });

    const markers = { list };

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

const villain = (state = initialVillainState, action) => {
  const reducers = {};

  reducers[ADD_VILLAIN] = state => getNewState(
    state,
    {
      name: action.payload.name,
      location: action.payload.location
    }
  );

  reducers[ADD_TARGETS] = state => getNewState(
    state,
    {
      targets: {
        active: action.payload.targets[0],
        list: action.payload.targets
      }
    }
  );

  reducers[SELECT_TARGET] = state => getNewState(
    state,
    {
      targets: {
        active: action.payload.target
      }
    }
  );

  return createReducer(reducers)(getCurrentState(state), action);
};

export default { map, batman, villain };
