export const findUserData = (nickName: string) => {
    return fetch(`https://api.github.com/users/${nickName}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Введенный пользователь не найден");
            }
        })
        .catch(() => {
            throw new Error("Something went wrong");
        });
};
export const findReposData = (nickName: string) => {
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
