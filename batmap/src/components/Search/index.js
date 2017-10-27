/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React from 'react';
import './styles.css';
import { lat, lng } from '../../resources/gotham';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.setSearchLat = this.setSearchLat.bind(this);
    this.setSearchLng = this.setSearchLng.bind(this);
    this.initializeMap = this.initializeMap.bind(this);
  }

  setSearchLat() {
    this.props.setSearchLat({ lat: this.lat.value });
  }

  setSearchLng() {
    this.props.setSearchLng({ lng: this.lng.value });
  }

  initializeMap() {
    if (this.props.search.lat && this.props.search.lng) {
      this.props.initializeMap({
        container: this.props.map.container,
        center: {
          lat: this.props.search.lat,
          lng: this.props.search.lng
        }
      });

      this.props.findVillain({
        lat: this.props.search.lat,
        lng: this.props.search.lng
      });
    }
  }

  render() {
    return (
      <div className="Search">
        <div className="Search__inputs-container">
          <div className="Search__lat">
            <input
              type="number"
              name="lat"
              min={lat.min}
              max={lat.max}
              ref={lat => this.lat = lat}
              onChange={this.setSearchLat}
              placeholder="lat" />
          </div>
          <div className="Search__lng">
            <input
              type="number"
              name="lng"
              min={lng.min}
              max={lng.max}
              ref={lng => this.lng = lng}
              onChange={this.setSearchLng}
              placeholder="lng" />
          </div>
        </div>
        <button
          className="Button Button--search"
          onClick={this.initializeMap}>
          Search this location
        </button>
      </div>
    );
  }
}

export default Search;
