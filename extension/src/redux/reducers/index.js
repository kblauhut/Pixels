import { combineReducers } from "redux";
import pixels from "./pixels";
import color from "./color"
import auth from "./auth"

export default combineReducers({ pixels, color, auth });
