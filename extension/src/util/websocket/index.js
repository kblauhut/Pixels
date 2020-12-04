import * as types from '../../redux/actionTypes'
import { recievedPixel, loadCanvas } from '../../redux/actions'

const setupSocket = (dispatch) => {
    const socket = new WebSocket('wss://localhost:8989')

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
            case types.SET_PIXEL:
                dispatch(recievedPixel(data.message.x, data.message.y, data.message.color))
                break
            case types.LOAD_CANVAS:
                dispatch(loadCanvas(data.message.x, data.message.y, data.message.canvas))
            default:
                break
        }
    }

    return socket
}

export default setupSocket