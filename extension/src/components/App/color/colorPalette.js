const white = "#ffffff"
const black = "#000000"
const red = "#fc2c03"

export default function get_color_hex(color) {
    switch (color) {
        case 0:
            return black
        case 1:
            return white
        default:
            return red
    }
}

