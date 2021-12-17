import {Dispatch} from "redux";
import {findReposData, findUserData } from "../api/API";
import {AppThunk} from "./store";

export type RepoType = {
    id: number
    node_id: string | null
    name: string | null
    full_name: string | null
    private: boolean,
    owner: {
        login: string | null
        id: number
        node_id: string | null
        avatar_url: string | null
        gravatar_id: string | null
        url: string | null
        html_url: string | null
        followers_url: string | null
        following_url: string | null
        gists_url: string | null
        starred_url: string | null
        subscriptions_url: string | null
        organizations_url: string | null
        repos_url: string | null
        events_url: string | null
        received_events_url: string | null
        type: string | null
        site_admin: boolean
    },
    html_url: string | null
    description: string | null
    fork: boolean
    url: string | null
    forks_url: string | null
    keys_url: string | null
    collaborators_url: string | null
    teams_url: string | null
    hooks_url: string | null
    issue_events_url: string | null
    events_url: string | null
    assignees_url: string | null
    branches_url: string | null
    tags_url: string | null
    blobs_url: string | null
    git_tags_url: string | null
    git_refs_url: string | null
    trees_url: string | null
    statuses_url: string | null
    languages_url: string | null
    stargazers_url: string | null
    contributors_url: string | null
    subscribers_url: string | null
    subscription_url: string | null
    commits_url: string | null
    git_commits_url: string | null
    comments_url: string | null
    issue_comment_url: string | null
    contents_url: string | null
    compare_url: string | null
    merges_url: string | null
    archive_url: string | null
    downloads_url: string | null
    issues_url: string | null
    pulls_url: string | null
    milestones_url: string | null
    notifications_url: string | null
    labels_url: string | null
    releases_url: string | null
    deployments_url: string | null
    created_at: string | null
    updated_at: string | null
    pushed_at: string | null
    git_url: string | null
    ssh_url: string | null
    clone_url: string | null
    svn_url: string | null
    homepage: string | null
    size: number
    stargazers_count: number
    watchers_count: number
    language: string | null
    has_issues: boolean
    has_projects: boolean
    has_downloads: boolean
    has_wiki: boolean
    has_pages: boolean
    forks_count: number
    mirror_url: string | null
    archived: boolean
    disabled: boolean
    open_issues_count: number
    license: string | null
    allow_forking: boolean
    is_template: boolean
    topics: any[]
    visibility: string | null
    forks: number
    open_issues: number
    watchers: number
    default_branch: string | null
}

export interface ReposState {
    repos: RepoType[];
}

const initialState: ReposState  = {
    repos: [],
};

export type AddReposActionType = { type: "ADD_REPOS"; payload: RepoType[] | [] };

export const addRepos = (repos: RepoType[] | []): AddReposActionType => ({
    type: "ADD_REPOS",
    payload: repos,
});

export const reposReducer = (
    state = initialState,
    action: AddReposActionType
): ReposState => {
    switch (action.type) {
        case "ADD_REPOS": {
            return {...state, repos: action.payload};
        }
        default:
            return state;
    }
};

export const getReposThunkCreator = (user: string ): AppThunk => async dispatch => {
    console.log('getReposThunkCreator')
    try {
        // const response = await usersAPI.getUserProfile(user)
        const response = await findReposData(user)
        console.log(response);
        dispatch(addRepos(response));
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
