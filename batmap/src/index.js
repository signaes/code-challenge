/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React|Provider|App" }]*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './components/App';
import { initializeStore } from './store';
import registerServiceWorker from './registerServiceWorker';
import load from './utils/load';
import { GOOGLE_MAPS_API_KEY } from './env';
import batman from './resources/batman';

const initialState = maps => ({
  map: {
    mapsApi: maps,
    mapObject: {},
    markers: {
      list: []
    }
  },
  batman: {
    currentPosition: batman.getCurrentPosition()
  },
  villain: {
    name: '',
    location: {},
    targets: {
      active: {},
      list: []
    }
  },
  search: {
    lat: 0,
    lng: 0
  }
});

load(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`)
  .then(({ maps }) => {
    if (typeof maps === 'undefined') {
      throw new Error('maps is undefined');
    }

    const store = initializeStore(initialState(maps));

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
    registerServiceWorker();
  })
  .catch(console.log);
