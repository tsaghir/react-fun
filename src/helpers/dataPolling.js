import React from 'react';
import { connect } from 'react-redux';

export const doDataPolling = (pollingAction, duration = 1000) => Component => {
  const Wrapper = () =>
    class extends React.Component {
      componentDidMount() {
        this.props.pollingAction();
        this.dataPolling = setInterval(() => {
          this.props.pollingAction();
        }, duration);
      }

      componentWillUnmount() {
        clearInterval(this.dataPolling);
      }

      render() {
        return <Component {...this.props} />;
      }
    };

  const mapStateToProps = () => ({});
  const mapDispatchToProps = { pollingAction };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Wrapper());
};
