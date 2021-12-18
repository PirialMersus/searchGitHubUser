import React, {useEffect, useState} from 'react';
import s from './Repos.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getUserThunkCreator, UsersState} from "../../redux/usersReducer";
import {AppStateType} from "../../redux/store";
import SearchUserForm from "../SearchUserForm/SearchUserForm";
import {useParams} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import {getReposThunkCreator, RepoType} from '../../redux/reposReducer';

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

    const onClickHandler = () => {
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('repos', JSON.stringify(repos));
        localStorage.setItem('didUserLeavePageByClickingLink', 'true');
    }

    return (
        <div className={s.reposAndFormContainer}>
            <h3>Second screen</h3>
            <div className={s.forBorderWrap}>
                <div className={s.formContainer}>
                    <h4>GitGub Searcher</h4>
                    <div className={s.userData}>
                        <img src={user?.avatar_url ?
                            user?.avatar_url :
                            'https://gba.business.ru/wp-content/uploads/2021/10/userm2.png'}
                             alt="ava"/>
                        <p>UserName: <span>{user?.login ? user?.login : ''}</span></p>
                        <p>Email: <span>{user?.email ? user?.email : ''}</span></p>
                        <p>Location: <span>{user?.location ? user?.location : ''}</span></p>
                        <p>Join Date: <span>{user?.created_at ? user?.created_at : ''}</span></p>
                        <p>Followers: <span>{user?.followers ? user?.followers : ''}</span></p>
                        <p>Following: <span>{user?.following ? user?.following : ''}</span></p>
                        <p>Biography: <span>{user?.bio ? user?.bio : ''}</span></p>
                    </div>
                    <SearchUserForm
                        searchRepoValue={searchRepoValue}
                        onChangeHandler={onChangeHandler}
                        handleSubmit={handleSubmit}
                        inputText={"Search for User's repositories"}/>
                </div>
                {updatedRepos.map(repo => {
                    return <div onClick={onClickHandler} className={s.repo} key={repo.id}>
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