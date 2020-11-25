import { connect } from 'react-redux'
import CanvasComponent from '../Canvas'
import { setPixel } from '../../../redux/actions'

const mapDispatchToProps = dispatch => ({
    dispatch: (x, y, color) => {
        dispatch(setPixel(x, y, color))
    }
})

function mapStateToProps(state, ownProps) {
    const { pixels } = state
    return { pixels: pixels.pixelArray }
}


export const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)