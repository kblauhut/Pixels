import { connect } from 'react-redux';
import CanvasComponent from '../components/Canvas';
import { setPixel, canPlace } from '../../../redux/actions';

const mapDispatchToProps = (dispatch) => ({
  dispatchPixel: (x, y, color) => {
    dispatch(setPixel(x, y, color));
  },
  dispatchCanPlace: (placeable) => {
    dispatch(canPlace(placeable));
  },
});

function mapStateToProps(state) {
  const { pixels, color, user } = state;
  return {
    pixels: pixels.pixelArray, canvas: pixels.canvas, color: color.color, canPlace: user.canPlace,
  };
}

const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);
export { CanvasContainer as default };
