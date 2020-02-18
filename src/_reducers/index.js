import {combineReducers} from 'redux';
import alert from './alert/alert.reducer';
import user from './user/user.reducer';

const rootReducer = combineReducers({
  user,
  alert
});

export default rootReducer;
