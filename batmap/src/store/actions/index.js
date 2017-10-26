import {
  FETCHING,
  NOT_FETCHING,
  NOT_FOUND,
  INITIALIZE_MAP,
  ADD_MARKER,
  ADD_VILLAIN,
  ADD_TARGETS,
  SELECT_TARGET,
  CHANGE_BATMAN_POSITION
} from './types';
import villains from '../../resources/villains';
import batman from '../../resources/batman';
import { pluck, sortWith, descend, prop } from 'ramda';

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

export const addMarker = ({ lat, lng, title }) => ({
  type: ADD_MARKER,
  payload: { lat, lng, title }
});

export const addVillain = ({ name, location }) => ({
  type: ADD_VILLAIN,
  payload: { name, location }
});

export const addTargets = ({ targets }) => ({
  type: ADD_TARGETS,
  payload: { targets }
});

export const selectTarget = ({ target }) => ({
  type: SELECT_TARGET,
  payload: { target }
});

const sortByMostProbableTarget = sortWith([
  descend(prop('probability'))
]);

const isFirst = i => i === 0;
const isLast = (a, i) => i === a.length - 1;

function attachInstructionText({ stepDisplay, marker, content, map, mapsApi }) {
  console.log(content);
  mapsApi.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(content);
    stepDisplay.open(map, marker);
  });
}

const infoWindowContent = ({ title, instructions }) => `
  ${ title ? `<header><h3>${title}</h3></header>` : '' }
  <p>
    ${instructions}
  </p>
`;

function showSteps({ directionResult, markerArray, stepDisplay, map, mapsApi, villain }) {
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

function calculateAndDisplayRoute({ directionsDisplay, directionsService, markerArray, stepDisplay, map, origin, destination, mapsApi, villain }) {
  // First, remove any existing markers from the map.
  for (let i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  directionsService.route({
    origin,
    destination,
    travelMode: 'DRIVING'
  }, function(response, status) {
    console.log(response, status);
    if (status === 'OK') {
      console.log('response', response);

      directionsDisplay.setDirections(response);
      showSteps({ directionResult: response, markerArray, stepDisplay, map, mapsApi, villain });
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

const fetchVillain = (dispatch, getState, { lat, lng }) => {
  dispatch(fetching);

  villains({ lat, lng })
    .then(({ data }) => {
      console.log(data);

      const { villain, targets } = data;
      const { name, location } = villain;
      const { lat, lng } = location;
      const { map, batman } = getState();
      const { mapsApi, mapObject } = map;
      const targetsByProbability = sortByMostProbableTarget(targets);

      dispatch(addVillain(villain));
      dispatch(addTargets({ targets: targetsByProbability }));

      console.log(pluck('probability')(targets));

      console.log('targetsByProbability', targetsByProbability);

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
        villain,
        origin: new mapsApi.LatLng(batman.currentPosition.lat, batman.currentPosition.lng),
        destination: new mapsApi.LatLng(targetsByProbability[0].location.lat, targetsByProbability[0].location.lng)
      });

      // dispatch(addMarker({ lat, lng, title: `<strong>${name}</strong> is here` }));
      dispatch(addMarker({
        lat: batman.currentPosition.lat,
        lng: batman.currentPosition.lng,
        title: '<strong>Batman</strong>, you are here'
      }));
      dispatch(notFetching);
    })
    .catch(e => {
      console.log(e);
      dispatch(notFound);
      dispatch(notFetching);
    });
};

export const findVillain = params => (dispatch, getState) => fetchVillain(dispatch, getState, params);

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
