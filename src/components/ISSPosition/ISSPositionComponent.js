import React from 'react';
import Map from './Map';
import Button from '../common/Button';
import Container from '../common/Container';
import { getLocationAPI } from '../../helpers/dataFetcher';

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

  handleRefresh = () => {
    this.setLocation();
  };

  buttons = [
    <Button key="1" buttonText="Refresh" onClick={this.handleRefresh} />,
    <Button key="2" buttonText="Auto sync" />,
  ];

  render() {
    const { latitude, longitude } = this.state;
    return (
      longitude &&
      latitude && (
        <Container
          containerTitle="ISS position 🌍"
          component={<Map latitude={latitude} longitude={longitude} />}
          buttons={this.buttons}
          withFooter
        />
      )
    );
  }
}

export default ISSPositionComponent;
