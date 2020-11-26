import React from 'react'
import PropTypes from 'prop-types'

export default class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }
    componentDidUpdate() {
        if (this.props.pixels.length != 0) {
            let lastPixel = this.props.pixels.pop()
            this.updatePixel(lastPixel.x, lastPixel.y, lastPixel.color)
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.canvas.current.getContext('2d');

        for (let x = 0; x < 300; x++) {
            for (let y = 0; y < 450; y++) {
                ctx.fillStyle = 'lightgrey';
                ctx.fillRect(x, y, 1, 1);
            }
        }

    }
    onClick = (e) => {
        const rect = this.canvas.current.getBoundingClientRect()
        const x = Math.floor((e.clientX - rect.left) * this.canvas.current.width / rect.width)
        const y = Math.floor((e.clientY - rect.top) * this.canvas.current.height / rect.height)
        const color = random_rgba();
        this.props.dispatch(x, y, color)
    }
    updatePixel(x, y, color) {
        const ctx = this.canvas.current.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    }

    render() {
        return (
            <canvas ref={this.canvas} onDragEnd={this.onDragEnd} onClick={this.onClick} style={{ imageRendering: "pixelated" }} width={300} height={450} />
        );
    }
}

CanvasComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    pixels: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
    }).isRequired
    ).isRequired
}


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 255 + ')';
}
