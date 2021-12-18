import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import s from './App.module.scss';
import Repos from './components/Repos/Repos';
import Users from "./components/Users/Users";
import {useDispatch} from "react-redux";
import {setUsers} from './redux/usersReducer';
import {addRepos} from './redux/reposReducer';

function App() {
    const dispatch = useDispatch();
    let previousRepos: any, previousUsers: any, prevReposBeforeParse: string | null,
        prevUsersBeforeParse: string | null;

    const didUserLeavePageByClickingLinkBeforeParse = localStorage.getItem('didUserLeavePageByClickingLink');
    const didUserLeavePageByClickingLink = (didUserLeavePageByClickingLinkBeforeParse === 'true');

    if (didUserLeavePageByClickingLink) {
        prevReposBeforeParse = localStorage.getItem('repos');
        previousRepos = prevReposBeforeParse ? JSON.parse(prevReposBeforeParse) : undefined;
        prevUsersBeforeParse = localStorage.getItem('users')
        previousUsers = prevUsersBeforeParse ? JSON.parse(prevUsersBeforeParse) : undefined;
    }

    useEffect(() => {
        if (didUserLeavePageByClickingLink) {
            dispatch(setUsers(previousUsers));
            dispatch(addRepos(previousRepos));
            localStorage.setItem('didUserLeavePageByClickingLink', 'false');
        }
    }, [previousUsers, previousRepos]);
    return (
        <BrowserRouter>
            <div className={s.app}>
                <Users/>
                <div className={s.reposContainer}>
                    <Routes>
                        <Route path="/searchGitHubUser" element={<Repos/>}/>
                        <Route path="/profile/:login" element={<Repos/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
