import React from 'react'
import { PanZoom } from 'react-easy-panzoom'
import { CanvasContainer } from '../containers/Canvas';

export default class PanZoomContainer extends React.PureComponent {
    render() {
        return [
            <PanZoom
                boundaryRatioVertical={0.5}
                boundaryRatioHorizontal={0.5}
                enableBoundingBox={true}
                minZoom={0.5}
                maxZoom={40}
                autoCenter={true}
                preventPan={false}
                style={{
                    cursor: "auto"
                }}
            >
                <CanvasContainer />
            </PanZoom>
        ];
    }
}