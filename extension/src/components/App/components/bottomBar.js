import React from 'react';
import { GithubPicker, TwitterPicker } from 'react-color';

export default class BottomBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showColorChooser: false
        }
    }

    render() {
        return [
            <div className={'bottomBarWrapper'} >
                {this.state.showColorChooser ? <GithubPicker /> : null}
                <div className={'bottomBar'}>
                    {/*<div className={'pixelsRemaining'}>10px remaining</div>
                     */}
                    <button className={'colorButton'} onClick={() => this.setState({ showColorChooser: !this.state.showColorChooser })}>Color
                    <div className={'colorButtonCircle'} />
                    </button>
                    <button className={'purchaseButton'} >Purchase Pixels</button>
                </div>
            </div >
        ];
    }
}