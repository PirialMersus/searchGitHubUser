import React from 'react';
import {BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';
import s from './App.module.scss';
import Repos from './components/Repos/Repos';
import Users from "./components/Users/Users";

function App() {
    return (
        <BrowserRouter>
            <div className={s.app}>
                <Users/>
                <div className={s.reposContainer}>
                    {/*<Route path='/profile/:userId?'><Repos/></Route>*/}
                    {/*<Route path='/login' component={Login}/>*/}
                    <Routes>
                        <Route path="/searchGitHubUser" element={<Repos />} />
                        <Route  path="/profile/:login" element={<Repos />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
