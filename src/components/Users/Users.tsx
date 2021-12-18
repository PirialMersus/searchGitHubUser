import React from 'react';
import s from './Users.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUserThunkCreator, UsersState} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/store";
import SearchUserForm from "../SearchUserForm/SearchUserForm";
import {NavLink} from 'react-router-dom';

function Users() {
    const dispatch = useDispatch();

    const users = useSelector((state: AppStateType) => state.usersState.users);

    const handleSubmit = (searchText: string) => {
        if (searchText && !users.some(user => user.login?.toLowerCase() === searchText.toLowerCase())) {
            dispatch(getUserThunkCreator(searchText));
        }
    }

    return (
        <div className={s.usersAndFormContainer}>
            <h3>First screen</h3>
            <div className={s.forBorderWrap}>
                <div className={s.formContainer}>
                    <h4>GitGub Searcher</h4>
                    <SearchUserForm handleSubmit={handleSubmit} inputText={'Search for user'}/>
                </div>
                {users.map(user => {
                    return <div className={s.user} key={user.id}>
                        <NavLink to={`/profile/${user.login}`}>
                            {user.avatar_url ?
                                <img src={user.avatar_url}
                                     alt="user"/> :
                                <img src="https://cdn.freelogovectors.net/wp-content/uploads/2013/02/administrator.png"
                                     alt="user"/>}
                            <span>{user.login}</span>
                            <div className={s.repos}>Repos: {<span>{user.public_repos}</span>}</div>
                        </NavLink>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Users;