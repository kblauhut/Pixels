import React from 'react';
import { FaRegClock, FaRegStar } from 'react-icons/fa';

export default class UserInfo extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return [
            <div className={'userInfo'}>
                <div className={'premiumPixels'}>
                    <FaRegStar className={'icon'} />
                    {this.props.premiumPixels}
                </div>
                <div className={'cooldown'}>
                    <FaRegClock className={'icon'} />
                    {this.props.cooldown + 's'}
                </div>

            </div >
        ];
    }
}