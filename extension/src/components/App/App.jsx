import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PanZoomContainer from './components/PanZoomContainer';
import BottomBarContainer from './containers/bottomBar';
import { authenticate } from '../../redux/actions';
import './App.css';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.twitch = window.Twitch ? window.Twitch.ext : null;
    this.state = {
      finishedLoading: false,
      theme: 'light',
      isVisible: true,
    };
  }

  visibilityChanged(isVisible) {
    this.setState(() => ({
      isVisible,
    }));
  }

  componentDidMount() {
    const {
      onAuthorized,
      onVisibilityChanged,
      onContext,
    } = this.twitch;
    const { finishedLoading } = this.state;
    const { dispatch } = this.props;

    if (this.twitch) {
      onAuthorized((auth) => {
        if (!finishedLoading) {
          dispatch(auth.token);
          this.setState(() => ({ finishedLoading: true }));
        }
      });

      onVisibilityChanged((isVisible) => {
        this.visibilityChanged(isVisible);
      });

      onContext((context, delta) => {
        this.contextUpdate(context, delta);
      });
    }
  }

  componentWillUnmount() {
    if (this.twitch) {
      this.twitch.unlisten('broadcast', () => console.log('successfully unlistened'));
    }
  }

  contextUpdate(context, delta) {
    if (delta.includes('theme')) {
      this.setState(() => ({ theme: context.theme }));
    }
  }

  render() {
    const { finishedLoading, isVisible } = this.state;
    const { readyState } = this.props;

    if (finishedLoading && isVisible && readyState === 1) {
      return (
        <div className="App">
          <div className={theme === 'light' ? 'App-light' : 'App-dark'}>
            <PanZoomContainer />
            <BottomBarContainer />
          </div>
        </div>
      );
    } if (readyState === 0) {
      return (
        <div className="App">
          <div className={theme === 'light' ? 'Config-light' : 'Config-dark'}>
            <div>Loading...</div>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <div className={theme === 'light' ? 'Config-light' : 'Config-dark'}>
          <div>Could Not Connect to the Server :(</div>
        </div>
      </div>
    );
  }
}

AppComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  readyState: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (token) => {
    dispatch(authenticate(token));
  },
});

export const App = connect(null, mapDispatchToProps)(AppComponent);
