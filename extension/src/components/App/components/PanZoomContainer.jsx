import React from 'react';
import { PanZoom } from 'react-easy-panzoom';
import CanvasContainer from '../containers/Canvas';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default class PanZoomContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cursor: 'auto',
      pixelated: false,
      isPanning: false,
      zoomedToPlace: false,
      showInfo: true
    };
    this.panzoom = React.createRef();
  }

  onPanStart() {
    this.setState({
      cursor: 'pointer',
      isPanning: true,
    });
  }

  onPanEnd() {
    const { isPanning, zoomedToPlace } = this.state;

    this.setState({
      cursor: 'auto',
    });

    if (isPanning) {
      setTimeout(() => this.setState({
        isPanning: false,
      }), 100);
    } else if (!zoomedToPlace) {
      this.panzoom.current.zoomIn(40);
    }
  }

  onStateChange(state) {
    if (state.scale >= 3) {
      this.setState({
        pixelated: true,
      });
    } else {
      this.setState({
        pixelated: false,
      });
    }

    let timer;
    if (state.scale >= 6) {
      timer = setTimeout(() => {
        this.setState({
          zoomedToPlace: true,
        })
      }, 100)
    } else {
      clearTimeout(timer)
      this.setState({
        zoomedToPlace: false,
      });
    }
  }

  render() {
    const { pixelated, isPanning, zoomedToPlace, showInfo } = this.state;
    return (
      <div className={"panZoomWrapper"}>
        <PanZoom
          ref={this.panzoom}
          minZoom={0.5}
          maxZoom={40}
          autoCenter
          disableDoubleClickZoom
          style={{
            cursor: this.state.cursor,
          }}
          className="panZoom"
          onStateChange={this.onStateChange.bind(this)}
          onPanStart={this.onPanStart.bind(this)}
          onPanEnd={this.onPanEnd.bind(this)}
        >
          <CanvasContainer
            pixelated={pixelated}
            blockPixelPlace={(isPanning || !zoomedToPlace)}
          />
        </PanZoom>
        {showInfo && this.props.signedIn ?
          <div className={'shareIdentityBanner'}>
            <div
              className={'closeBanner'}
              onClick={() => this.setState({ showInfo: false })}
            >
              close</div>
            Zoom in using your mousewheel, then left click to place pixels
          {zoomedToPlace ?
              <FaCheck className="icon check" /> : null
            }
          </div> : null
        }
      </div>
    );
  }
}

PanZoomContainer.propTypes = {
  signedIn: PropTypes.bool.isRequired,
};