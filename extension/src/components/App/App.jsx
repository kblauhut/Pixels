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
      authToken: ''
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

    if (this.twitch) {
      onAuthorized((auth) => {
        const { dispatch, userData } = this.props;
        if (!userData.signedIn) {
          dispatch(auth.token);
          this.setState({
            authToken: auth.token
          });
        }
        if (!this.state.finishedLoading) {
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

  reconnect() {
    this.props.retry();
    setTimeout(() => {
      if (this.props.readyState === 1) {
        this.props.dispatch(this.state.authToken);
      }
    }, 500)
  }

  render() {
    const { finishedLoading, isVisible, theme } = this.state;
    const { readyState } = this.props;

    if (finishedLoading && isVisible && readyState === 1) {
      return (
        <div className="App">
          <div className={theme === 'light' ? 'App-light' : 'App-dark'}>
            <PanZoomContainer signedIn={this.props.userData.signedIn} />
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
          <div className="errorMessage">
            Could not connect to the server :(
            <button className="retryButton" onClick={this.reconnect.bind(this)}>Retry</button>
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.propTypes = {
  retry: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  readyState: PropTypes.number.isRequired,
  userData: PropTypes.shape({
    signedIn: PropTypes.bool,
    userId: PropTypes.string,
    cooldown: PropTypes.number,
    purchasedPixels: PropTypes.number,
  }),
};


AppComponent.defaultProps = {
  userData: PropTypes.shape({
    signedIn: false,
    userId: 'def',
    cooldown: 0,
    purchasedPixels: 0,
  }),
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: (token) => {
    dispatch(authenticate(token));
  },
});

function mapStateToProps(state) {
  const { user } = state;
  return { userData: user.userData };
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
