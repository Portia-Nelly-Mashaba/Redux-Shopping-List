import { combineReducers } from "redux";
import shoppingListReducer from "./Reducer";


const rootReducer = combineReducers({
    data: shoppingListReducer
})

export default rootReducer;