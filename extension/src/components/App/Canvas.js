import React from 'react'

export default class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.canvas.current.getContext('2d');
        for (let x = 0; x < 600; x++) {
            for (let y = 0; y < 900; y++) {
                ctx.fillStyle = random_rgba();
                ctx.fillRect(x, y, 1, 1);

            }
        }
    }


    render() {
        return (
            <canvas ref={this.canvas} style={{ imageRendering: "pixelated" }} width={600} height={900} />
        );
    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 255 + ')';
}