import React from 'react';
import { FaRegClock, FaRegStar } from 'react-icons/fa';
import shortid from 'shortid';
import PropTypes from 'prop-types';

export default class UserInfo extends React.PureComponent {
  render() {
    const { cooldown, premiumPixels } = this.props;

    return [
      <div className="userInfo" key={shortid.generate()}>
        <div className="premiumPixels">
          <FaRegStar className="icon" />
          {premiumPixels}
        </div>
        <div className="cooldown" key={shortid.generate()}>
          <FaRegClock className="icon" />
          {`${cooldown}s`}
        </div>
      </div>,
    ];
  }
}

UserInfo.propTypes = {
  cooldown: PropTypes.number.isRequired,
  premiumPixels: PropTypes.number.isRequired,
};
