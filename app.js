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
                    fs.rename(path.join(defPath, dir, file),
                        path.join(defPath, `girls`, file),
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                }
                if (dir === "girls" && (user.gender === "Male" || user.gender === "male")) {
                    fs.rename(path.join(defPath, dir, file),
                        path.join(defPath, `boys`, file),
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

