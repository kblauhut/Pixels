import { connect } from 'react-redux'
import BottomBarComponent from '../components/bottomBar'
import { purchase, updateColor } from '../../../redux/actions'

const mapDispatchToProps = dispatch => ({
    dispatchColor: (color) => {
        dispatch(updateColor(color))
    },
    dispatchPurchase: (transaction) => {
        dispatch(purchase(transaction))
    }
})

function mapStateToProps(state, ownProps) {
    const { color, user } = state
    return { color: color.color, userData: user.userData }
}

export const BottomBarContainer = connect(mapStateToProps, mapDispatchToProps)(BottomBarComponent)