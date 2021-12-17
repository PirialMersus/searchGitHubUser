import {Dispatch} from "redux";
import { findUserData } from "../api/API";
// import { usersAPI } from "../api/API";
import {AppThunk} from "./store";

export type UserType = {
    avatar_url: string | null
    bio: string | null
    blog: string | null
    company: string | null
    created_at: string | null
    email: string | null
    events_url: string | null
    followers: number
    followers_url: string | null
    following: number
    following_url: string | null
    gists_url: string | null
    gravatar_id: string | null
    hireable: string | null
    html_url: string | null
    id: number
    location: string | null
    login: string | null
    name: string | null
    node_id: string | null
    organizations_url: string | null
    public_gists: number
    public_repos: number
    received_events_url: string | null
    repos_url: string | null
    site_admin: boolean
    starred_url: string | null
    subscriptions_url: string | null
    twitter_username: string | null
    type: string | null
    updated_at: string | null
    url: string | null
}

export interface UsersState {
    users: UserType[];
}

const initialState: UsersState  = {
    users: [],
};

export type AddUserActionType = { type: "ADD_USER"; payload: UserType };

export const addUser = (user: UserType): AddUserActionType => ({
    type: "ADD_USER",
    payload: user,
});

export const usersReducer = (
    state = initialState,
    action: AddUserActionType
): UsersState => {
    switch (action.type) {
        case "ADD_USER": {
            return {...state, users: [action.payload, ...state.users]};
        }
        default:
            return state;
    }
};

export const getUserThunkCreator = (user: string): AppThunk => async dispatch => {
    try {
        // const response = await usersAPI.getUserProfile(user)
        const response = await findUserData(user)
        console.log(response);
        dispatch(addUser(response));
    } catch (e: any) {
        throw new Error(e);
    }
}

//     => {
//     console.log('getUserThunkCreator')
//     return (dispatch: Dispatch) => {
//         findUserData(user)
//             .then((data: any)=>{
//                 console.log('data', data);
//             })
//
//         // usersAPI.getUsers(currentPage, pageSize)
//         //     .then((data: DataResponseType) => {
//         //         dispatch(setUsers(data.items))
//         //         dispatch(setTotalUsersCount(data.totalCount))
//         //         dispatch(setIsFetching(false))
//         //     })
//     }
// }
