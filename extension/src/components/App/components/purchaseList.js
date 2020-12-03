import React from 'react';
import { CirclePicker } from 'react-color'
import { palette } from './color/colorPalette';

export default class PurchaseList extends React.PureComponent {
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
                <div className={'listContainer'}>
                    <ol>
                        <div className={'listElement'}>
                            1 Pixel
                        <button className={'bitButton'} onClick={() => this.props.purchase("pixels1bit")}>1 Bit</button>
                        </div>
                        <div className={'listElement'}>
                            10 Pixels
                            <button className={'bitButton'} onClick={() => this.props.purchase("pixels10bit")}>10 Bits</button>
                        </div>
                        <div className={'listElement'}>
                            100 Pixels
                            <button className={'bitButton'} onClick={() => this.props.purchase("pixels100bit")}>100 Bits</button>
                        </div>
                        <div className={'listElement'}>
                            250 Pixels
                            <button className={'bitButton'} onClick={() => this.props.purchase("pixels250bit")}>250 Bits</button>
                        </div>
                        <div className={'listElement'}>
                            500 Pixels
                            <button className={'bitButton'} onClick={() => this.props.purchase("pixels500bit")}>500 Bits</button>
                        </div>
                        <div className={'listElement'}>
                            1000 Pixels
                            <button className={'bitButton'} onClick={() => this.props.purchase("pixels1000bit")}>1000 Bits</button>
                        </div>

                        {/* 
                <CirclePicker
                    className={'colors'}
                    width={300}
                    circleSize={30}
                    circleSpacing={20}
                    colors={this.getColors()}
                    color={this.props.color}
                    onChange={(color) => this.props.colorUpdate(color.hex)}
                />
                     */}
                    </ol>
                </div>
            </div >
        ];
    }
}