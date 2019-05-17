import React from 'react';
import L from 'leaflet';
import { css } from 'emotion';
import { createMap, setMarkerAndMoveMapView } from './helper';

class Map extends React.Component {
  componentDidMount() {
    const { latitude, longitude } = this.props;
    this.map = createMap();
    this.marker = setMarkerAndMoveMapView(this.map, latitude, longitude);
  }

  componentDidUpdate() {
    const { latitude, longitude } = this.props;
    this.marker.setLatLng(new L.LatLng(latitude, longitude));
  }

  render() {
    return <div className={css({ width: '100%', height: 600 })} id="map" />;
  }
}

export default Map;
