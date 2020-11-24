import React from 'react'
import { PanZoom } from 'react-easy-panzoom'
import CanvasComponent from './Canvas.js';

export default class PanZoomContainer extends React.PureComponent {
    render() {
        return [
            <PanZoom
                boundaryRatioVertical={0.5}
                boundaryRatioHorizontal={0.5}
                enableBoundingBox={true}
                minZoom={0.5}
                maxZoom={40}
                preventPan={false}
                style={{ cursor: "auto" }}
            >
                <CanvasComponent zoom={this.zoom} />
            </PanZoom>
        ];
    }
}