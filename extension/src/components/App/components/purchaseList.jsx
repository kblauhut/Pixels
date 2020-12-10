import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

export default class PurchaseList extends React.PureComponent {
  render() {
    const { close, purchase } = this.props;

    return [
      <div className="card" key={shortid.generate()}>
        <div className="closeButton" onClick={close} key={shortid.generate()}>Close</div>
        <div className="listContainer" key={shortid.generate()}>
          <ol>
            <div className="listElement">
              1 Pixel
              <button
                className="bitButton"
                onClick={() => purchase('pixels1bit')}
                key={shortid.generate()}
              >
                1 Bit
              </button>
            </div>
            <div className="listElement">
              10 Pixels
              <button
                className="bitButton"
                onClick={() => purchase('pixels10bit')}
                key={shortid.generate()}
              >
                10 Bits
              </button>
            </div>
            <div className="listElement">
              100 Pixels
              <button
                className="bitButton"
                onClick={() => purchase('pixels100bit')}
                key={shortid.generate()}
              >
                100 Bits
              </button>
            </div>
            <div className="listElement">
              250 Pixels
              <button
                className="bitButton"
                onClick={() => purchase('pixels250bit')}
                key={shortid.generate()}
              >
                250 Bits
              </button>
            </div>
            <div className="listElement">
              500 Pixels
              <button
                className="bitButton"
                onClick={() => purchase('pixels500bit')}
                key={shortid.generate()}
              >
                500 Bits
              </button>
            </div>
            <div className="listElement">
              1000 Pixels
              <button
                className="bitButton"
                onClick={() => purchase('pixels1000bit')}
                key={shortid.generate()}
              >
                1000 Bits
              </button>
            </div>
          </ol>
        </div>
      </div>,
    ];
  }
}

PurchaseList.propTypes = {
  close: PropTypes.func.isRequired,
  purchase: PropTypes.func.isRequired,
};
