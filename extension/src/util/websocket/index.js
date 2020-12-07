import * as types from '../../redux/actionTypes'
import { recievedPixel, loadCanvas, userData } from '../../redux/actions'

const setupSocket = (dispatch) => {
    const socket = new WebSocket('wss://localhost:8989')

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
            case types.SET_PIXEL:
                dispatch(recievedPixel(data.message.x, data.message.y, data.message.color))
                break;
            case types.LOAD_CANVAS:
                dispatch(loadCanvas(data.message.x, data.message.y, data.message.canvas))
                break;
            case types.USER_DATA:
                dispatch(userData(data.message.signedIn, data.message.userId, data.message.cooldown, data.message.purchasedPixels))
                break;
            default:
                break;
        }
    }

    return socket
}

export default setupSocket