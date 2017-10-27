import {
  FETCHING,
  NOT_FETCHING,
  NOT_FOUND,
  INITIALIZE_MAP,
  ADD_MARKER,
  ADD_VILLAIN,
  ADD_TARGETS,
  SELECT_TARGET,
  CHANGE_BATMAN_POSITION,
  SET_SEARCH_LAT,
  SET_SEARCH_LNG
} from './types';
import villains from '../../resources/villains';
import batman from '../../resources/batman';
import { sortWith, descend, prop } from 'ramda';

export const fetching = {
  type: FETCHING
};

export const notFetching = {
  type: NOT_FETCHING
};

export const notFound = {
  type: NOT_FOUND
};

export const initializeMap = ({ container, center }) => ({
  type: INITIALIZE_MAP,
  payload: { container, center }
});

export const addMarker = ({ lat, lng, title, open }) => ({
  type: ADD_MARKER,
  payload: { lat, lng, title, open }
});

export const addVillain = ({ name, location }) => ({
  type: ADD_VILLAIN,
  payload: { name, location }
});

export const addTargets = ({ targets }) => ({
  type: ADD_TARGETS,
  payload: { targets }
});

export const setSearchLat = ({ lat }) => ({
  type: SET_SEARCH_LAT,
  payload: { lat }
});

export const setSearchLng = ({ lng }) => ({
  type: SET_SEARCH_LNG,
  payload: { lng }
});

const sortByMostProbableTarget = sortWith([
  descend(prop('probability'))
]);

function attachInstructionText({ stepDisplay, marker, content, map, mapsApi }) {
  mapsApi.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(content);
    stepDisplay.open(map, marker);
  });
}

const infoWindowContent = ({ instructions }) => `
  <p>
    ${instructions}
  </p>
`;

function showSteps({ directionResult, markerArray, stepDisplay, map, mapsApi }) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  const myRoute = directionResult.routes[0].legs[0];
  for (let i = 0; i < myRoute.steps.length; i++) {
    const marker = markerArray[i] = markerArray[i] || new mapsApi.Marker;
    const instructions = myRoute.steps[i].instructions;

    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);

    attachInstructionText({
      stepDisplay,
      marker,
      content: infoWindowContent({ instructions }),
      map,
      mapsApi
    });
  }
}

function calculateAndDisplayRoute({ directionsDisplay, directionsService, markerArray, stepDisplay, map, origin, destination, mapsApi }) {
  // First, remove any existing markers from the map.
  for (let i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  directionsService.route({
    origin,
    destination,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      showSteps({ directionResult: response, markerArray, stepDisplay, map, mapsApi });
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function setTarget({ map, batman, targets, target, dispatch }) {
  const { mapsApi, mapObject } = map;
  const targetsByProbability = sortByMostProbableTarget(targets);

  dispatch(addTargets({ targets: targetsByProbability }));

  const markerArray = [];
  const directionsService = new mapsApi.DirectionsService;
  const directionsDisplay = new mapsApi.DirectionsRenderer({ map: mapObject });
  const stepDisplay = new mapsApi.InfoWindow;

  calculateAndDisplayRoute({
    directionsDisplay,
    directionsService,
    markerArray,
    stepDisplay,
    map: mapObject,
    mapsApi,
    origin: new mapsApi.LatLng(batman.currentPosition.lat, batman.currentPosition.lng),
    destination: new mapsApi.LatLng(target.location.lat, target.location.lng)
  });

  dispatch(addMarker({
    lat: batman.currentPosition.lat,
    lng: batman.currentPosition.lng,
    title: '<strong>Batman</strong>, you are here',
    open: true
  }));
}

const fetchVillain = (dispatch, getState, { lat, lng }) => {
  dispatch(fetching);

  villains({ lat, lng })
    .then(({ data }) => {
      const { villain, targets } = data;
      const { map, batman } = getState();
      const targetsByProbability = sortByMostProbableTarget(targets);

      dispatch(addVillain(villain));
      setTarget({
        map,
        batman,
        targets: targetsByProbability,
        target: targetsByProbability[0],
        dispatch
      });

      dispatch(notFetching);
    })
    .catch(() => {
      dispatch(notFound);
      dispatch(notFetching);
    });
};

const changeTarget = (dispatch, getState, { target }) => {
  const { map, batman, villain } = getState();
  const { targets } = villain;

  setTarget({
    map,
    batman,
    targets: targets.list,
    target,
    dispatch
  });

  dispatch({
    type: SELECT_TARGET,
    payload: { target }
  });
};

export const findVillain = params => (dispatch, getState) => fetchVillain(dispatch, getState, params);

export const selectTarget = params => (dispatch, getState) => changeTarget(dispatch, getState, params);

export const changeBatmanPosition = ({ lat, lng }) => {
  const newPosition = batman.getCurrentPosition();

  return {
    type: CHANGE_BATMAN_POSITION,
    payload: {
      lat: typeof lat === 'undefined' ? newPosition.lat : lat,
      lng: typeof lng === 'undefined' ? newPosition.lng : lng
    }
  };
};

export default {
  findVillain,
  addMarker,
  changeBatmanPosition,
  initializeMap
};
