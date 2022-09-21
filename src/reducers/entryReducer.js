import { EntryActionsType } from "../actions/action-types/entryActionType"

const initialState = {
    entry:[
        {
            "VEHICLE TYPE":"Car/Jeep/Van",
            "VEHICLE NUMBER":"TN87T5667",
            "DATE TIME":"2022-02-29T17:16:50",
            "TOLL NAME":"ChengalPattu",
            "TRAFFIC":"3456"
        },
        {
            "VEHICLE TYPE":"Car/Jeep/Van",
            "VEHICLE NUMBER":"TN",
            "DATE TIME":"2022-09-21T21:40:50",
            "TOLL NAME":"Chennai",
            "TRAFFIC":"3453"
        },
        {
            "VEHICLE TYPE":"Heavy Vehicles",
            "VEHICLE NUMBER":"TN87T5437",
            "DATE TIME":"2022-02-30T17:16:50",
            "TOLL NAME":"Andhra",
            "TRAFFIC":"16"
        }
    ]
}

export const entryReducer = (state = initialState, {type, payload}) => {
    // console.log("state before update ",state)
    switch(type){
        case EntryActionsType.SET_ENTRY:
            return {entry:[...state.entry, payload]};
        default:
            return state;
    }
}