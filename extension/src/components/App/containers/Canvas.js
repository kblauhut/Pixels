import { connect } from 'react-redux'
import CanvasComponent from '../components/Canvas'
import { setPixel } from '../../../redux/actions'

const mapDispatchToProps = dispatch => ({
    dispatch: (x, y, color) => {
        dispatch(setPixel(x, y, color))
    }
})

function mapStateToProps(state, ownProps) {
    const { pixels, color } = state
    return { pixels: pixels.pixelArray, canvas: pixels.canvas, color: color.color }
}


export const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)