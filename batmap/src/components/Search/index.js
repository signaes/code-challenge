/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React from 'react';
import './styles.css';
import { lat, lng } from '../../resources/gotham';

const Search = () => (
  <div className="Search">
    <div className="Search__inputs-container">
      <div className="Search__lat">
        <input type="number" name="lat" min={lat.min} max={lat.max} placeholder="lat" />
      </div>
      <div className="Search__lng">
        <input type="number" name="lng" min={lng.min} max={lng.max} placeholder="lng" />
      </div>
    </div>
    <button className="Button Button--search">Search this location</button>
  </div>
);

export default Search;
