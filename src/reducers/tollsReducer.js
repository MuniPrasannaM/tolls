import { TollsActionsType } from "../actions/action-types/TollsActionsType"

const initialState = {
    tolls:[
        {
            "TOLL NAME":"Chengalpattu",
            "CAR/JEEP/VAN":"60/30",
            "LCV":"90/50",
            "TRUCK/BUS":"205/100",
            "HEAVY VEHICLES":"320/160"
        },
        {
            "TOLL NAME":"Chennai",
            "CAR/JEEP/VAN":"75/50",
            "LCV":"125/80",
            "TRUCK/BUS":"260/120",
            "HEAVY VEHICLES":"400/200"
        },
        {
            "TOLL NAME":"Andhra",
            "CAR/JEEP/VAN":"70/40",
            "LCV":"100/65",
            "TRUCK/BUS":"235/130",
            "HEAVY VEHICLES":"365/200"
        }
    ]
}
export const tollsReducer = (state = initialState, {type, payload}) => {
    console.log("state before update ",state)
    switch(type){
        case TollsActionsType.SET_TOLLS:
            return {tolls:[...state.tolls, payload]};
        default:
            return state;
    }
}