/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const setContainerHeight = container => {
  container.style.height = `${document.body.offsetHeight}px`;
};

class Map extends Component {
  componentDidMount() {
    const { initializeMap, addMarker, findVillain } = this.props;
    const { currentPosition } = this.props.batman;
    const { lat, lng } = currentPosition;

    setContainerHeight(this.container);

    window.addEventListener('resize', () => {
      setContainerHeight(this.container);
    });

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
