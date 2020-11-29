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
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                {this.state.showColorChooser ? <GithubPicker /> : null}
                <div style={{ backgroundColor: 'lightgrey', height: 50, margin: 'auto', width: '100%' }}>
                    <div>10px remaining</div>
                    <button>Purchase Pixels</button>
                    <button onClick={() => this.setState({ showColorChooser: !this.state.showColorChooser })}>Choose Color</button>
                </div>
            </div >
        ];
    }
}