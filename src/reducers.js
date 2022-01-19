import {combineReducers} from 'redux';
import userDetails from './store/reducers/userDetailsReducer';

const rootReducers = combineReducers({
  userDetails,
});

export default rootReducers;
