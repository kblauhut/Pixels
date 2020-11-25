import * as types from '../../redux/actionTypes'
import { setPixel } from '../../redux/actions'

const setupSocket = (dispatch) => {
    const socket = new WebSocket('ws://localhost:8989')

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
            case types.ADD_PIXEL:
                console.log(data);
                dispatch(setPixel(data.payload.x, data.payload.y, data.payload.color))
                break
            default:
                break
        }
    }

    return socket
}

export default setupSocket