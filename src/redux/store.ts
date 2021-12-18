import {applyMiddleware, combineReducers, createStore} from "redux";
import {AddUserActionType, SetUsersActionType, usersReducer} from "./usersReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {AddReposActionType, reposReducer } from "./reposReducer";

const rootReducer = combineReducers({
    usersState: usersReducer,
    reposState: reposReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof rootReducer>

export type AppActionsType = AddUserActionType | AddReposActionType | SetUsersActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>