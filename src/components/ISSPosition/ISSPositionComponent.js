import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import Map from './Map';
import Button from '../common/Button';
import Container from '../common/Container';
import { getLocationAPI } from '../../helpers/dataFetcher';
import {
  loadIssLocationData,
  DO_DATA_POLLING,
  LOCATION,
} from '../../redux-store/actions';
import { doDataPolling } from '../../helpers/dataPolling';
import { css } from 'emotion';

class ISSPositionComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      longitude: null,
      latitude: null,
    };
  }

  componentDidMount() {
    this.setLocation();
  }

  setLocation = async () => {
    const { dispatch } = this.props;
    const data = await getLocationAPI();
    const latitude = Number(data.iss_position.latitude);
    const longitude = Number(data.iss_position.longitude);

    this.setState({
      latitude,
      longitude,
    });

    const currentLocation = {
      latitude,
      longitude,
    };
    dispatch({ type: LOCATION, currentLocation });
  };

  getLocationVariables = () => {
    const { locationData } = this.props;
    const { latitude, longitude } = this.state;
    if (locationData)
      return {
        latitude: Number(locationData.iss_position.latitude),
        longitude: Number(locationData.iss_position.longitude),
      };
    return { latitude, longitude };
  };

  handleRefreshClick = () => {
    this.setLocation();
  };
  handleAutoSyncClick = () => {
    const { dispatch, doDataPolling } = this.props;
    dispatch({ type: DO_DATA_POLLING, doDataPolling });
  };

  buttons = ({ doDataPolling }) => [
    <Button key="1" buttonText="Refresh" onClick={this.handleRefreshClick} />,
    <Button
      key="2"
      buttonText={
        doDataPolling ? <Spinner size="sm" color="light" /> : 'Auto sync'
      }
      onClick={this.handleAutoSyncClick}
    />,
  ];

  customTitle = (latitude, longitude) => (
    <div>
      <span>{`ISS current position 🌍`}</span>
      <span
        className={css({ float: 'right', fontSize: 20, paddingTop: 20 })}
      >{`latitude: ${latitude}  longitude: ${longitude}`}</span>
    </div>
  );

  render() {
    const { latitude, longitude } = this.getLocationVariables();
    return (
      longitude &&
      latitude && (
        <div>
          <Container
            containerTitle={this.customTitle(latitude, longitude)}
            component={<Map latitude={latitude} longitude={longitude} />}
            buttons={this.buttons(this.props)}
            withFooter
          />
        </div>
      )
    );
  }
}

const mapStateToProps = state => {
  const { locationData, doDataPolling } = state;
  const newState = { locationData, doDataPolling };
  return doDataPolling ? newState : { doDataPolling };
};

export default doDataPolling(loadIssLocationData)(
  connect(mapStateToProps)(ISSPositionComponent),
);
