import React from 'react';
import PropTypes from 'prop-types'
import ColorChooser from './colorChooser';
import PurchaseList from './purchaseList'
import { get_color_index, get_color_hex } from '../components/color/colorPalette'

export default class BottomBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showColorChooser: false,
            showPurchaseList: false,
            color: get_color_hex(props.color)
        }
    }

    dispatchColorTostate(color) {
        this.props.dispatch(get_color_index(color))
    }

    confirmPurchase(sku) {
        this.props.twitch.bits.setUseLoopback(true)
        console.log(this.props.twitch);
        console.log(this.props.twitch.features.isBitsEnabled)
        window.Twitch.ext.bits.useBits(sku);
        this.props.twitch.bits.onTransactionComplete(function (transaction) {
            console.log(transaction);
        }
        )
    }

    render() {
        return [
            <div className={this.state.showColorChooser || this.state.showPurchaseList ?
                'controlWrapper-active' : 'controlWrapper'}>
                {this.state.showColorChooser ?
                    <ColorChooser
                        close={() => this.setState({ showColorChooser: !this.state.showColorChooser })}
                        color={this.state.color}
                        colorUpdate={(color) => {
                            this.setState({ color: color })
                            this.dispatchColorTostate(color)
                        }}
                    /> : null
                }
                {this.state.showPurchaseList ?
                    <PurchaseList
                        close={() => this.setState({ showPurchaseList: !this.state.showPurchaseList })}
                        purchase={(sku) => {
                            this.confirmPurchase(sku)
                        }}
                    /> : null
                }
                < div className={'bottomBarWrapper'} >
                    <div className={'bottomBar'}>
                        {/*<div className={'pixelsRemaining'}>10px remaining</div>
                     */}
                        <button
                            className={'colorButton'}
                            onClick={() => this.setState({ showColorChooser: !this.state.showColorChooser, showPurchaseList: false })}
                        >Color
                    <div className={'colorButtonCircle'} style={{ backgroundColor: this.state.color }} />
                        </button>
                        {this.props.twitch.features.isBitsEnabled ? <button
                            className={'purchaseButton'}
                            onClick={() => this.setState({ showPurchaseList: !this.state.showPurchaseList, showColorChooser: false })}
                        >Purchase Pixels</button>
                            : null
                        }
                    </div>
                </div >
            </div>
        ];
    }
}

BottomBarComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    color: PropTypes.number.isRequired
}
