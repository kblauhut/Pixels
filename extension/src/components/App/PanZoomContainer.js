import React from 'react'
import StyledReactPanZoom from '@ajainarayanan/react-pan-zoom';
import CanvasComponent from './Canvas.js';

export default class PanZoomContainer extends React.PureComponent {
    state = {
        dx: 0,
        dy: 0,
        zoom: 1
    };

    zoomEvent = (e) => {
        if (e.nativeEvent.wheelDelta > 0 && this.state.zoom < 30) {
            if (this.state.zoom < 1) {
                this.setState({
                    zoom: this.state.zoom + 0.1
                });
            } else {
                this.setState({
                    zoom: this.state.zoom + 2
                });
            }

        } else if (e.nativeEvent.wheelDelta < 0) {
            if (this.state.zoom - 2 > 0) {
                this.setState({
                    zoom: this.state.zoom - 2
                });
            } else if (this.state.zoom - 0.1 > 0.4) {
                this.setState({
                    zoom: this.state.zoom - 0.1,
                });
            }
        }
    }


    onPan = (dx, dy) => {
        this.setState({
            dx,
            dy
        });
    };

    render() {
        return [
            <div onWheelCapture={this.zoomEvent}>
                <StyledReactPanZoom
                    zoom={this.state.zoom}
                    pandx={this.state.dx}
                    pandy={this.state.dy}
                    onPan={this.onPan}
                >
                    <CanvasComponent >
                    </CanvasComponent>
                </StyledReactPanZoom>
            </div>,

        ];
    }
}