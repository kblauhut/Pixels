import React from 'react'
import PropTypes from 'prop-types'
import { get_color_hex } from './color/colorPalette'


export default class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.canvas != undefined && this.props.canvas !== prevProps.canvas) {
            this.loadCanvas(this.props.canvas.x, this.props.canvas.y, this.props.canvas.canvas)
        }
        if (this.props.pixels.length != 0) {
            this.props.pixels.forEach(element => {
                this.updatePixel(element.x, element.y, element.color)
            });
        }
    }

    componentDidMount() {
        if (this.props.pixels.length != 0) {
            this.props.pixels.forEach(element => {
                this.updatePixel(element.x, element.y, element.color)
            });
        }
        if (this.props.canvas != undefined) {
            this.loadCanvas(this.props.canvas.x, this.props.canvas.y, this.props.canvas.canvas)
        }
    }

    onClick = (e) => {
        if (!this.props.canPlace || this.props.blockPixelPlace) return;
        const rect = this.canvas.current.getBoundingClientRect()
        const x = Math.floor((e.clientX - rect.left) * this.canvas.current.width / rect.width)
        const y = Math.floor((e.clientY - rect.top) * this.canvas.current.height / rect.height)
        this.props.dispatchPixel(x, y, this.props.color)
        this.props.dispatchCanPlace(false)
    }

    loadCanvas(x_size, y_size, canvasArray) {
        const ctx = this.canvas.current.getContext('2d');
        let i = 0;
        for (let x = 0; x < x_size; x++) {
            for (let y = 0; y < y_size; y++) {
                ctx.fillStyle = get_color_hex(canvasArray[i]);
                ctx.fillRect(x, y, 1, 1);
                i++;
            }
        }
    }
    updatePixel(x, y, color) {
        const ctx = this.canvas.current.getContext('2d');
        ctx.fillStyle = get_color_hex(color);
        ctx.fillRect(x, y, 1, 1);
    }

    render() {
        return (
            <canvas
                className={this.props.class}
                ref={this.canvas}
                onClick={this.onClick}
                width={this.props.canvas.x}
                height={this.props.canvas.y}
            />
        );
    }
}

CanvasComponent.propTypes = {
    dispatchPixel: PropTypes.func.isRequired,
    dispatchCanPlace: PropTypes.func.isRequired,
    pixels: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: PropTypes.number.isRequired
    }).isRequired
    ).isRequired,
    canvas: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        canvas: PropTypes.arrayOf(PropTypes.number)
    }),
    color: PropTypes.number.isRequired,
    canPlace: PropTypes.bool.isRequired
}


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 255 + ')';
}
