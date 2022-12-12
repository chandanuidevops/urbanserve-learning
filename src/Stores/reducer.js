import { combineReducers } from "redux";
import AuthReducer from "./Auth/reducer";
import AlertReducer from "./Alerts/reducer";
import UserReducer from './Users/reducer'
import RoleReducer from './Roles/reducer'
const rootReducer = combineReducers({
    AuthReducer,
    AlertReducer,
    UserReducer,
    RoleReducer
});
export default rootReducer