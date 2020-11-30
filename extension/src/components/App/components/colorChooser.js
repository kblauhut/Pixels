import React from 'react';
import { CirclePicker } from 'react-color'
import { palette } from './color/colorPalette';

export default class ColorChooser extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    getColors() {
        return palette;
    }


    render() {
        return [
            <div className={'card'}>
                <div className={'closeButton'} onClick={this.props.close}>Close</div>
                <CirclePicker
                    className={'colors'}
                    width={300}
                    circleSize={30}
                    circleSpacing={20}
                    colors={this.getColors()}
                    color={this.props.color}
                    onChange={(color) => this.props.colorUpdate(color.hex)}
                />
            </div>
        ];
    }
}