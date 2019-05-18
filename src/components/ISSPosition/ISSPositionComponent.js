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
} from '../../redux-store/actions';
import { doDataPolling } from '../../helpers/dataPolling';

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
    const data = await getLocationAPI();
    this.setState({
      latitude: Number(data.iss_position.latitude),
      longitude: Number(data.iss_position.longitude),
    });
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

  render() {
    const { latitude, longitude } = this.getLocationVariables();
    return (
      longitude &&
      latitude && (
        <div>
          <Container
            containerTitle="ISS current position 🌍"
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
