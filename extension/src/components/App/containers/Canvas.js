import { connect } from 'react-redux'
import CanvasComponent from '../Canvas'
import { setPixel } from '../../../redux/actions'

const mapDispatchToProps = dispatch => ({
    dispatch: (id, color) => {
        dispatch(setPixel(id, color))
    }
})

export const CanvasContainer = connect(() => ({}), mapDispatchToProps)(CanvasComponent)