import s from './SearchUserForm.module.scss';
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {addUser, getUserThunkCreator} from "../../redux/usersReducer";

type SearchUserFormPropsType = {
    handleSubmit: (text: string) => void,
    inputText: string
    onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
    searchRepoValue?: string
}

function SearchUserForm(props: SearchUserFormPropsType) {
    const [searchText, setSearchText] = useState<string>('');

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userName = event.target.value;
        setSearchText(userName);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchText) {
            props.handleSubmit(searchText);
            setSearchText('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className={s.formContainer}>

            <input
                value={props.onChangeHandler ? props.searchRepoValue : searchText}
                onChange={props.onChangeHandler ? props.onChangeHandler : onChangeHandler}
                id="inputData"
                type="text"
                placeholder={props.inputText}
            />
            <button type="submit" className="btn">Find</button>
        </form>
    );
}

export default SearchUserForm;