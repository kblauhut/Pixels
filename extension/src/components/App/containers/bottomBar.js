import { connect } from 'react-redux';
import BottomBarComponent from '../components/bottomBar';
import { purchase, updateColor, canPlace } from '../../../redux/actions';

const mapDispatchToProps = (dispatch) => ({
  dispatchColor: (color) => {
    dispatch(updateColor(color));
  },
  dispatchPurchase: (transaction) => {
    dispatch(purchase(transaction));
  },
  dispatchCanPlace: (placeable) => {
    dispatch(canPlace(placeable));
  },
});

function mapStateToProps(state) {
  const { color, user } = state;
  return { color: color.color, userData: user.userData };
}

const BottomBarContainer = connect(mapStateToProps, mapDispatchToProps)(BottomBarComponent);
export { BottomBarContainer as default };
