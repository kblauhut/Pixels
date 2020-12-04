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

    dispatchColorToState(color) {
        this.props.dispatchColor(get_color_index(color))
    }

    confirmPurchase(sku) {
        function callback(transaction, props) {
            props.dispatchPurchase(transaction)
        }

        this.props.twitch.bits.setUseLoopback(true);
        window.Twitch.ext.bits.useBits(sku);

        this.props.twitch.bits.onTransactionComplete((transaction) => callback(transaction, this.props));
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
                            this.dispatchColorToState(color)
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
    dispatchColor: PropTypes.func.isRequired,
    dispatchPurchase: PropTypes.func.isRequired,
    color: PropTypes.number.isRequired,
    userData: PropTypes.shape({
        signedIn: PropTypes.bool,
        userId: PropTypes.string,
        cooldown: PropTypes.number,
        purchasedBits: PropTypes.number
    }),
}
