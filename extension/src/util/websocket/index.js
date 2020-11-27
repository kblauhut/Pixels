import * as types from '../../redux/actionTypes'
import { recievedPixel, pixelDownload } from '../../redux/actions'

const setupSocket = (dispatch) => {
    const socket = new WebSocket('ws://localhost:8989')

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch (data.type) {
            case types.SET_PIXEL:
                dispatch(recievedPixel(data.message.x, data.message.y, data.message.color))
                break
            case types.PIXEL_DOWNLOAD:
                dispatch(pixelDownload(data.message))
                break
            default:
                break
        }
    }

    return socket
}

export default setupSocket