import {
  FETCHING,
  NOT_FETCHING,
  NOT_FOUND,
  INITIALIZE_MAP,
  ADD_MARKER,
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

const sortByMostProbableTarget = sortWith([
  descend(prop('probability'))
]);

const fetchVillain = (dispatch, getState, { lat, lng }) => {
  dispatch(fetching);

  villains({ lat, lng })
    .then(({ data }) => {
      console.log(data);

      const { villain, targets } = data;
      const { name, location } = villain;
      const { lat, lng } = location;

      console.log(pluck('probability')(targets));

      console.log(
        sortByMostProbableTarget(targets)
      );

      // dispatch(addMarker({ lat, lng }));
      dispatch(notFetching);
    })
    .catch(() => {
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
