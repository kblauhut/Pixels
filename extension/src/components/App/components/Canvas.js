import React from 'react'
import PropTypes from 'prop-types'
import { get_color_hex } from './color/colorPalette'


export default class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();

        this.state = {
            lastPixelBuffer: { x: -1, y: -1, color: '#000000' }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.canvas != undefined && this.props.canvas !== prevProps.canvas) {
            this.loadCanvas(this.props.canvas.x, this.props.canvas.y, this.props.canvas.canvas)
        }
        if (this.props.pixels.length != 0) {
            this.props.pixels.forEach(element => {
                this.updatePixel(element.x, element.y, get_color_hex(element.color))
            });
        }
    }

    componentDidMount() {
        if (this.props.pixels.length != 0) {
            this.props.pixels.forEach(element => {
                this.updatePixel(element.x, element.y, get_color_hex(element.color))
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

    onHover = (e) => {
        if (!this.props.canPlace || this.props.blockPixelPlace) return;

        const rect = this.canvas.current.getBoundingClientRect()
        const x = Math.floor((e.clientX - rect.left) * this.canvas.current.width / rect.width)
        const y = Math.floor((e.clientY - rect.top) * this.canvas.current.height / rect.height)

        if (x === this.state.lastPixelBuffer.x && y === this.state.lastPixelBuffer.y) return;

        const index = (this.props.canvas.y * (x + 1)) - this.props.canvas.y + y;
        const color = this.props.canvas.canvas[index]

        const lastPixelBuffer = { x: x, y: y, color: get_color_hex(color) }

        this.resetPixelHover()
        this.setState({
            lastPixelBuffer: lastPixelBuffer
        }, () => {
            this.updatePixel(x, y, get_color_hex(this.props.color))
        })

    }

    onMouseDown = () => {
        this.resetPixelHover()
    }

    resetPixelHover() {
        this.updatePixel(this.state.lastPixelBuffer.x, this.state.lastPixelBuffer.y, this.state.lastPixelBuffer.color)
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
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    }

    render() {
        return (
            <canvas
                className={this.props.class}
                ref={this.canvas}
                onClick={this.onClick}
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onHover}
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