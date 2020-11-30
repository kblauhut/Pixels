import { connect } from 'react-redux'
import BottomBarComponent from '../components/bottomBar'
import { updateColor } from '../../../redux/actions'

const mapDispatchToProps = dispatch => ({
    dispatch: (color) => {
        dispatch(updateColor(color))
    }
})

function mapStateToProps(state, ownProps) {
    const { color } = state
    return { color: color.color }
}

export const BottomBarContainer = connect(mapStateToProps, mapDispatchToProps)(BottomBarComponent)