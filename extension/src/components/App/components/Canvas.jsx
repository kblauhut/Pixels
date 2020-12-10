import React from 'react';
import PropTypes from 'prop-types';
import { getColorHex } from './color/colorPalette';

export default class CanvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      lastPixelBuffer: { x: -1, y: -1, color: '#000000' },
    };
  }

  componentDidMount() {
    const { canvas, pixels } = this.props;

    if (pixels.length !== 0) {
      pixels.forEach((element) => {
        this.updatePixel(element.x, element.y, getColorHex(element.color));
      });
    }
    if (canvas !== undefined) {
      this.loadCanvas(canvas.x, canvas.y, canvas.canvas);
    }
  }

  componentDidUpdate(prevProps) {
    const { canvas, pixels, blockPixelPlace } = this.props;

    if (canvas !== undefined && canvas !== prevProps.canvas) {
      this.loadCanvas(canvas.x, canvas.y, canvas.canvas);
    }
    if (pixels.length !== 0) {
      pixels.forEach((element) => {
        this.updatePixel(element.x, element.y, getColorHex(element.color));
      });
    }
    if (blockPixelPlace && prevProps.blockPixelPlace !== blockPixelPlace) {
      this.resetPixelHover();
    }
  }

  onClick(e) {
    const {
      color,
      canPlace,
      blockPixelPlace,
      dispatchPixel,
      dispatchCanPlace,
    } = this.props;

    if (!canPlace || blockPixelPlace) return;
    const rect = this.canvas.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (this.canvas.current.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (this.canvas.current.height / rect.height));
    dispatchPixel(x, y, color);
    dispatchCanPlace(false);
    this.setState({
      lastPixelBuffer: { x: -1, y: -1, color: '#000000' },
    });
  }

  onHover(e) {
    const {
      color,
      canvas,
      canPlace,
      blockPixelPlace,
    } = this.props;

    const {
      lastPixelBuffer,
    } = this.state;

    if (!canPlace || blockPixelPlace) return;

    const rect = this.canvas.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (this.canvas.current.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (this.canvas.current.height / rect.height));

    if (x === lastPixelBuffer.x && y === lastPixelBuffer.y) return;

    const index = (canvas.y * (x + 1)) - canvas.y + y;
    const lastPixelColor = canvas.canvas[index];

    const newLastPixelBuffer = { x, y, color: getColorHex(lastPixelColor) };

    this.resetPixelHover();
    this.setState({
      lastPixelBuffer: newLastPixelBuffer,
    }, () => {
      this.updatePixel(x, y, getColorHex(color));
    });
  }

  onMouseDown() {
    this.resetPixelHover();
  }

  resetPixelHover() {
    const {
      lastPixelBuffer,
    } = this.state;

    this.updatePixel(
      lastPixelBuffer.x,
      lastPixelBuffer.y,
      lastPixelBuffer.color,
    );
  }

  loadCanvas(Xsize, Ysize, canvasArray) {
    const ctx = this.canvas.current.getContext('2d');
    let i = 0;
    for (let x = 0; x < Xsize; x += 1) {
      for (let y = 0; y < Ysize; y += 1) {
        ctx.fillStyle = getColorHex(canvasArray[i]);
        ctx.fillRect(x, y, 1, 1);
        i += 1;
      }
    }
  }

  updatePixel(x, y, color) {
    const ctx = this.canvas.current.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }

  render() {
    const {
      canvas,
      pixelated,
    } = this.props;

    return (
      <canvas
        className={pixelated ? 'canvas pixelated' : 'canvas'}
        ref={this.canvas}
        onClick={this.onClick.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseMove={this.onHover.bind(this)}
        width={canvas.x}
        height={canvas.y}
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
    color: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  canvas: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    canvas: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  color: PropTypes.number.isRequired,
  canPlace: PropTypes.bool.isRequired,
  blockPixelPlace: PropTypes.bool.isRequired,
  pixelated: PropTypes.bool.isRequired,
};
