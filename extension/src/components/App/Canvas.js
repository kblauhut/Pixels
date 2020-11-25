import React from 'react'
import PropTypes from 'prop-types'

export default class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        console.log(props);
    }
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {

        const ctx = this.canvas.current.getContext('2d', { antialias: false, });
        const fillStyles = ['yellow', 'orange', 'red', 'pink', 'purple', 'blue', 'cyan', 'lime', 'green', 'lime']
        var styleSelect = 0;
        for (let x = 0; x < 300; x++) {
            for (let y = 0; y < 450; y++) {
                styleSelect++;
                if (styleSelect == fillStyles.length) styleSelect = 0;
                ctx.fillStyle = fillStyles[styleSelect];
                ctx.fillRect(x, y, 1, 1);
            }
        }

    }
    onClick = (e) => {
        const rect = this.canvas.current.getBoundingClientRect()

        const x = Math.floor((e.clientX - rect.left) * this.canvas.current.width / rect.width)
        const y = Math.floor((e.clientY - rect.top) * this.canvas.current.height / rect.height)
        console.log("x: " + x + " y: " + y)

        const ctx = this.canvas.current.getContext('2d', { antialias: true, depth: false });

        ctx.fillStyle = random_rgba();
        ctx.fillRect(x, y, 1, 1);
        this.props.dispatch("a", "823922")
    }

    render() {
        return (
            <canvas ref={this.canvas} onDragEnd={this.onDragEnd} onClick={this.onClick} style={{ imageRendering: "pixelated" }} width={300} height={450} />
        );
    }
}

CanvasComponent.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 255 + ')';
}
