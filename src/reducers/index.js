import { combineReducers } from "redux";
import { entryReducer } from "./entryReducer";
import { tollsReducer } from "./tollsReducer";

const reducers = combineReducers({
    allTolls:tollsReducer,
    allEntry: entryReducer
})
export default reducers;