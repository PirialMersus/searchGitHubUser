import React, {useEffect, useState} from 'react';
import s from './Repos.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUserThunkCreator, UsersState} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/store";
import SearchUserForm from "../SearchUserForm/SearchUserForm";
import {useParams} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import {getReposThunkCreator, RepoType} from '../../redux/userRepos';

function Repos() {
    const dispatch = useDispatch()

    const users = useSelector((state: AppStateType) => state.usersState.users);
    const repos = useSelector((state: AppStateType) => state.reposState.repos);

    const [updatedRepos, setUpdatedRepos] = useState<RepoType[]>([]);
    const [searchRepoValue, setSearchRepoValue] = useState<string>('');
    const {login} = useParams();
    const user = users.find(user => user.login?.toLowerCase() === login?.toLowerCase());


    useEffect(() => {
        setUpdatedRepos(repos);
    }, [repos]);

    useEffect(() => {
        if (user?.login) {
            dispatch(getReposThunkCreator(user.login));
        }
    }, [login]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSearchRepoValue(text)
        const filteredRepos = repos.filter(repo => repo.name?.toLowerCase().includes(text))
        setUpdatedRepos(filteredRepos)
    }


    const handleSubmit = (searchText: string) => {
        if (searchText) {
            dispatch(getUserThunkCreator(searchText));
        }
    }

    return (
        <div className={s.reposAndFormContainer}>
            <h3>Second screen</h3>
            <div className={s.forBorderWrap}>
                <div className={s.formContainer}>
                    <h4>GitGub Searcher</h4>
                    <SearchUserForm
                        searchRepoValue={searchRepoValue}
                        onChangeHandler={onChangeHandler}
                        handleSubmit={handleSubmit}
                        inputText={"Search for User's repositories"}/>
                </div>
                {updatedRepos.map(repo => {
                    return <div className={s.repo} key={repo.id}>
                        <a href={repo.html_url ? repo.html_url : 'https://github.com/'}>
                            <p>RepoName:</p>
                            <span>{repo.name}</span>
                            <div className={s.repoStats}>
                                <p>Forks: {<span>{repo.forks_count}</span>}</p>
                                <p>Stars: {<span>{repo.stargazers_count}</span>}</p>
                            </div>
                        </a>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Repos;