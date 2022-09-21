import { TollsActionsType } from "./action-types/TollsActionsType";

export const setTolls = (tolls) => {
    return{
        type: TollsActionsType.SET_TOLLS,
        payload: tolls
    }
}