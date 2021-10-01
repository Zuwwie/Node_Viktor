const fs = require(`fs`);
const path = require(`path`);

const defPath = path.join(__dirname, `data`);
const gender = [`boys`, `girls`];

gender.forEach(dir => {
    fs.readdir(path.join(defPath, dir), (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        data.forEach(file => {
            fs.readFile(path.join(defPath, dir, file), (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const user = (JSON.parse(data));

                if (dir === "boys" && (user.gender === "Female" || user.gender === "female")) {
                    changeFile(`girls`);
                }
                if (dir === "girls" && (user.gender === "Male" || user.gender === "male")) {
                    changeFile(`boys`);
                }

                function changeFile(userGender) {
                    fs.rename(path.join(defPath, dir, file),
                        path.join(defPath, userGender, file),
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                }
            });
        });
    });
});

