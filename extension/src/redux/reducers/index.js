import { combineReducers } from 'redux';
import pixels from './pixels';
import color from './color';
import auth from './auth';
import user from './user';
import purchase from './purchase';

export default combineReducers({
  pixels, color, auth, user, purchase,
});
