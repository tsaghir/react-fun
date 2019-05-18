import React from 'react';
import L from 'leaflet';
import { css } from 'emotion';
import { createMap, setMarker, moveMapView } from './helper';

class Map extends React.Component {
  componentDidMount() {
    const { latitude, longitude } = this.props;
    this.map = createMap();
    this.marker = setMarker(this.map, latitude, longitude);
  }

  componentDidUpdate() {
    const { latitude, longitude } = this.props;
    this.marker.setLatLng(new L.LatLng(latitude, longitude));
    moveMapView(this.map, latitude, longitude);
  }

  render() {
    return <div className={css({ width: '100%', height: 600 })} id="map" />;
  }
}

export default Map;
