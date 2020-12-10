import React from 'react';
import { PanZoom } from 'react-easy-panzoom';
import CanvasContainer from '../containers/Canvas';

export default class PanZoomContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cursor: 'auto',
      pixelated: false,
      isPanning: false,
      zoomedToPlace: false,
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
      this.panzoom.current.zoomIn(18);
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

    if (state.scale >= 6) {
      this.setState({
        zoomedToPlace: true,
      });
    } else {
      this.setState({
        zoomedToPlace: false,
      });
    }
  }

  render() {
    const { pixelated, isPanning, zoomedToPlace } = this.state;
    return (
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
    );
  }
}
