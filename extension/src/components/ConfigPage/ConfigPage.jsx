import React from 'react';
import './Config.css';

export default class ConfigPage extends React.Component {
  constructor(props) {
    super(props);

    this.twitch = window.Twitch ? window.Twitch.ext : null;
    this.state = {
      finishedLoading: false,
      theme: 'light',
    };
  }

  componentDidMount() {
    const { finishedLoading } = this.state;

    if (this.twitch) {
      this.twitch.onAuthorized(() => {
        if (!finishedLoading) {
          this.setState(() => ({ finishedLoading: true }));
        }
      });

      this.twitch.onContext((context, delta) => {
        this.contextUpdate(context, delta);
      });
    }
  }

  contextUpdate(context, delta) {
    const { theme } = this.state;

    if (delta.includes('theme')) {
      this.setState(() => ({ theme }));
    }
  }

  render() {
    const { theme, finishedLoading } = this.state;

    if (finishedLoading) {
      return (
        <div className="Config">
          <div
            className={theme === 'light' ? 'Config-light' : 'Config-dark'}
          >
            There is no configuration needed for this extension!
          </div>
        </div>
      );
    }

    return (
      <div className="Config">
        <div
          className={theme === 'light' ? 'Config-light' : 'Config-dark'}
        >
          Loading...
        </div>
      </div>
    );
  }
}
