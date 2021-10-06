const fs = require(`fs`);
const path = require(`path`);

const defPath = path.join(__dirname, `dataBase`, `users.json`);

const writeFile = (newArr) => {
    fs.writeFile(defPath, JSON.stringify(newArr), (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`file written successfully`)
    });
};

readFile = () => {
    return new Promise((res, rej) => {
        fs.readFile(defPath,
            (err, data) => {
                if (err) {
                    console.log(err);
                    rej(err);
                    return
                }

                const users = JSON.parse(data);
                console.log(users);
                res(users);
            }
        );
    });
};

const createUser = async (newUser) => {
    // fs.readFile(defPath, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //
    //     const users = (JSON.parse(data));

    const users = await readFile();

    newUser.id = users[users.length - 1].id + 1;

    users.push(newUser);

    writeFile(users);
    // });
};

const deleteUser = async (user_id) => {
    // fs.readFile(defPath, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //
    //     const users = (JSON.parse(data));

    const users = await readFile();

    for (let i = 0; i < users.length; i++) {

        const user = users[i];

        if (user.id == user_id) {
            users.splice(i, 1);
            break;
        }
    }
    console.log(users);

    writeFile(users);

    // });
};

module.exports = {createUser, deleteUser}

