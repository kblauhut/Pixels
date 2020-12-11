import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import ColorChooser from './colorChooser';
import PurchaseList from './purchaseList';
import UserInfo from './userInfo';
import { getColorHex, getColorIndex } from './color/colorPalette';

export default class BottomBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.timeout;
    this.twitch = window.Twitch ? window.Twitch.ext : null;
    this.state = {
      showColorChooser: false,
      showPurchaseList: false,
      color: getColorHex(props.color),
      cooldown: 60,
      purchasedPixels: 0,
    };
  }

  countDownTimer() {
    const { cooldown, purchasedPixels } = this.state;

    if (cooldown > 0) {
      this.setState({ cooldown: cooldown - 1 });
      this.timeout = setTimeout(() => { this.countDownTimer(); }, 1000);
      if (purchasedPixels === 0 && cooldown === 0) {
        this.setState({
          purchasedPixels: 1,
        });
      }
    }
  }

  componentDidMount() {
    this.twitch.actions.requestIdShare();
  }

  componentDidUpdate(prevProps) {
    const { userData, dispatchCanPlace } = this.props;
    const { cooldown, purchasedPixels } = this.state;

    if (!userData.signedIn) return;

    if (userData !== prevProps.userData) {
      clearTimeout(this.timeout);
      this.setState({
        cooldown: userData.purchasedPixels !== 0 ? 0 : Math.ceil(this.props.userData.cooldown / 1000) + 1,
        purchasedPixels: userData.purchasedPixels,
      }, () => {
        if (purchasedPixels === 0) {
          this.countDownTimer.bind(this)();
        }
      });
    } else if (cooldown === 0 || purchasedPixels !== 0) {
      dispatchCanPlace(true);
    }

    if (purchasedPixels === 0 && cooldown === 0) {
      this.setState({
        purchasedPixels: 1,
      });
    }
  }

  dispatchColorToState(color) {
    const { dispatchColor } = this.props;

    dispatchColor(getColorIndex(color));
  }

  confirmPurchase(sku) {
    function callback(transaction, props) {
      props.dispatchPurchase(transaction);
    }

    this.twitch.bits.useBits(sku);
    this.twitch.bits.onTransactionComplete((transaction) => callback(transaction, this.props));
  }

  render() {
    const {
      cooldown,
      color,
      purchasedPixels,
      showColorChooser,
      showPurchaseList,
    } = this.state;

    const {
      userData,
    } = this.props;

    return [
      <div key={shortid.generate()}>
        {userData.signedIn ? (
          <UserInfo
            premiumPixels={purchasedPixels}
            cooldown={cooldown}
            key={shortid.generate()}
          />
        ) : null}

        <div
          className={showColorChooser || showPurchaseList
            ? 'controlWrapper-active' : 'controlWrapper'}
          key={shortid.generate()}
        >
          {showColorChooser
            ? (
              <ColorChooser
                close={() => this.setState({ showColorChooser: !showColorChooser })}
                color={this.state.color}
                colorUpdate={(color) => {
                  this.setState({ color });
                  this.dispatchColorToState(color);
                }}
                key={shortid.generate()}
              />
            ) : null}
          {showPurchaseList
            ? (
              <PurchaseList
                close={() => this.setState({ showPurchaseList: !showPurchaseList })}
                purchase={(sku) => {
                  this.confirmPurchase(sku);
                }}
                key={shortid.generate()}
              />
            ) : null}

          <div className="bottomBarWrapper" key={shortid.generate()}>
            <div className="bottomBar" key={shortid.generate()}>

              <div
                className="colorButton"
                style={{
                  border: `3.5px solid ${color}`,
                }}
                onClick={() => this.setState({ showColorChooser: !showColorChooser, showPurchaseList: false })}
                key={shortid.generate()}
              />

              {this.twitch.features.isBitsEnabled && userData.signedIn ? (
                <button
                  className="purchaseButton"
                  onClick={() => this.setState({ showPurchaseList: !showPurchaseList, showColorChooser: false })}
                  key={shortid.generate()}
                >
                  Purchase Pixels
                </button>
              )
                : null}
            </div>
          </div>
        </div>
      </div>,
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
    purchasedPixels: PropTypes.number,
  }),
};
