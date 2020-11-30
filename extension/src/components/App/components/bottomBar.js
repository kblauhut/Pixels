import React from 'react';
import PropTypes from 'prop-types'
import ColorChooser from './colorChooser';
import { get_color_index, get_color_hex } from '../components/color/colorPalette'

export default class BottomBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showColorChooser: false,
            color: get_color_hex(props.color)
        }
    }

    dispatchColorTostate(color) {
        this.props.dispatch(get_color_index(color))
    }

    render() {
        return [
            <div className={this.state.showColorChooser ? 'controlWrapper-active' : 'controlWrapper'}>
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
                < div className={'bottomBarWrapper'} >
                    <div className={'bottomBar'}>
                        {/*<div className={'pixelsRemaining'}>10px remaining</div>
                     */}
                        <button
                            className={'colorButton'}
                            onClick={() => this.setState({ showColorChooser: !this.state.showColorChooser })}
                        >Color
                    <div className={'colorButtonCircle'} style={{ backgroundColor: this.state.color }} />
                        </button>
                        <button className={'purchaseButton'} >Purchase Pixels</button>
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
