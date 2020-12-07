import React from 'react';
import PropTypes from 'prop-types'
import ColorChooser from './colorChooser';
import PurchaseList from './purchaseList'
import UserInfo from './userInfo'
import { get_color_index, get_color_hex } from '../components/color/colorPalette'

export default class BottomBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.timeout;
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            showColorChooser: false,
            showPurchaseList: false,
            color: get_color_hex(props.color),
            cooldown: 0,
            purchasedPixels: 0
        }
    }

    dispatchColorToState(color) {
        this.props.dispatchColor(get_color_index(color))
    }

    countDownTimer() {
        if (this.state.cooldown > 0) {
            this.setState({ cooldown: this.state.cooldown - 1 })
            this.timeout = setTimeout(() => { this.countDownTimer() }, 1000)
            if (this.state.purchasedPixels == 0 && this.state.cooldown == 0) {
                this.setState({
                    purchasedPixels: 1
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userData !== prevProps.userData) {
            clearTimeout(this.timeout);
            this.setState({
                cooldown: Math.ceil(this.props.userData.cooldown / 1000) + 1,
                purchasedPixels: this.props.userData.purchasedPixels
            }, () => {
                if (this.state.purchasedPixels == 0) {
                    this.countDownTimer.bind(this)()
                }
            })
        }
        if (this.state.cooldown == 0 || this.state.purchasedPixels != 0) {
            this.props.dispatchCanPlace(true)
        }
    }


    confirmPurchase(sku) {
        console.log(this.props.userData);
        function callback(transaction, props) {
            props.dispatchPurchase(transaction)
        }

        this.twitch.bits.useBits(sku);
        this.twitch.bits.onTransactionComplete((transaction) => callback(transaction, this.props));
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

                        <button
                            className={'colorButton'}
                            onClick={() => this.setState({ showColorChooser: !this.state.showColorChooser, showPurchaseList: false })}
                        >Color
                    <div className={'colorButtonCircle'} style={{ backgroundColor: this.state.color }} />
                        </button>
                        {this.twitch.features.isBitsEnabled ? <button
                            className={'purchaseButton'}
                            onClick={() => this.setState({ showPurchaseList: !this.state.showPurchaseList, showColorChooser: false })}
                        >Buy Pixels</button>
                            : null
                        }
                        {this.props.userData.signedIn ? <UserInfo
                            premiumPixels={this.state.purchasedPixels}
                            cooldown={this.state.cooldown}
                        /> : null}
                    </div>
                </div >
            </div>
        ];
    }
}

BottomBarComponent.propTypes = {
    dispatchColor: PropTypes.func.isRequired,
    dispatchPurchase: PropTypes.func.isRequired,
    dispatchCanPlace: PropTypes.func.isRequired,
    color: PropTypes.number.isRequired,
    userData: PropTypes.shape({
        signedIn: PropTypes.bool,
        userId: PropTypes.string,
        cooldown: PropTypes.number,
        purchasedPixels: PropTypes.number
    }),
}
