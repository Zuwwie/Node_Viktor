const fs = require('fs');
const path = require('path');

const defPath = path.join(__dirname, '..', 'dataBase', 'users.json');

const writeFile = (newArr) => {
    fs.writeFile(defPath, JSON.stringify(newArr), (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('file written successfully');
    });
};

const readFile = () => {
    return new Promise((res, rej) => {
        fs.readFile(defPath,
            (err, data) => {
                if (err) {
                    console.log(err);
                    rej(err);
                    return
                }

                const users = JSON.parse(data);

                res(users);
            }
        );
    });
};

const createUser = async (newUser) => {
    const users = await readFile();

    newUser.id = users[users.length - 1].id + 1;

    users.push(newUser);
    writeFile(users);
    return users;
};

const deleteUser = async (user_id) => {
    let users = await readFile();

    users = users.filter(user => user.id != user_id);

    writeFile(users);
    return users;
};

const getUserById = async (user_id) => {
    const users = await readFile();

    let userById = users.find(user => user.id == user_id);

    return userById;
};

module.exports = {createUser, deleteUser, getUserById, readFile};

