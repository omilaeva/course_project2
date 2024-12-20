let users = [];
let currentId = 1;

const addUser = async (email, password) => {
    users.push({id: currentId++, email: email, admin: false, password: password});
    return 1;
};

const findUserByEmail = async (email) => {
    for (let user of users) {
        if (user.email === email) {
            return user;
        }
    }
    return null;
};

export { addUser, findUserByEmail };