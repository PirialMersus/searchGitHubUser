// import axios, {AxiosResponse} from "axios";
//
// const instance = axios.create({
//     withCredentials: true,
//     baseURL: 'https://api.github.com/users/',
//     // headers: {
//     //     "API-KEY": "58f1b79a-5b08-4add-9043-639dedc61352"
//     // }
// })
//
// export const usersAPI = {
//     getUserProfile(userName: string) {
//         return instance.get(`${userName}`)
//             .then((response: AxiosResponse) => {
//                 console.log('response from api',response)
//                 return response.data
//             })
//     }
// }
export const findUserData = (nickName: string) => {
    console.log('findUserData')
    return fetch(`https://api.github.com/users/${nickName}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Введенный пользователь не найден");
            }
        })
        .catch((event) => {
            throw new Error("Something went wrong");
        });
};
export const findReposData = (nickName: string) => {
    console.log('findReposData')
    return fetch(`https://api.github.com/users/${nickName}/repos`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Введенный пользователь не найден");
            }
        })
        .catch((event) => {
            throw new Error("Something went wrong");
        });
};
