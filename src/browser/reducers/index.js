import {combineReducers} from 'redux';
import UserReducer from './reducer-users';

const users=(state = UserReducer, action)=> {

  return state;
}
 const allReducers=combineReducers(
            {
             users
            }
        );
export default allReducers;
