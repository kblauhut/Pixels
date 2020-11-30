import React from 'react'
import { PanZoom } from 'react-easy-panzoom'
import { CanvasContainer } from '../containers/Canvas';

export default class PanZoomContainer extends React.PureComponent {
    render() {
        return [
            <PanZoom
                minZoom={0.5}
                maxZoom={40}
                autoCenter={true}
                preventPan={false}
                style={{
                    cursor: "auto"
                }}
                className="panZoom"
            >
                <CanvasContainer />
            </PanZoom>
        ];
    }
}