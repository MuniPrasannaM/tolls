import { EntryActionsType } from "./action-types/entryActionType";

export const setEntry = (entry) => {
    return{
        type: EntryActionsType.SET_ENTRY,
        payload: entry
    }
}