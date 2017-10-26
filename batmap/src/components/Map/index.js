/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Map extends Component {
  componentDidMount() {
    const { initializeMap, addMarker, findVillain } = this.props;
    const { currentPosition } = this.props.batman;
    const { lat, lng } = currentPosition;

    this.container.style.height = `${document.body.offsetHeight}px`;

    initializeMap({
      container: this.container,
      center: currentPosition
    });
    addMarker({
      lat,
      lng,
      title: 'Batman'
    });
    findVillain(currentPosition);
  }

  render() {
    return (
      <div className="Map" ref={ div => this.container = div }>
      </div>
    );
  }
}

Map.propTypes = {
  mapsApi: PropTypes.object,
  batman: PropTypes.object,
  initializeMap: PropTypes.func
};

export default Map;
