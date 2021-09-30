const fs = require(`fs`);
const path = require(`path`)


fs.readdir(path.join(__dirname, `data`), (err, data) => {
    if (err) {
        console.log(err)
        return;
    }
    data.forEach(dir => {
        fs.readdir(path.join(__dirname, `data`, dir), (err, data) => {
            if (err) {
                console.log(err)
                return;
            }
            data.forEach(file => {
                fs.readFile(path.join(__dirname, `data`, dir, file), (err, data) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    const user = (JSON.parse(data));
                    if (dir === "boys" && (user.gender === "Female" || user.gender === "female")) {
                        fs.rename(path.join(__dirname, `data`, dir, file),
                            path.join(__dirname, `data`, `girls`, file),
                            (err) => {
                                if (err) {
                                    console.log(err)
                                }
                            });
                    }
                    if (dir === "girls" && (user.gender === "Male" || user.gender === "male")) {
                        fs.rename(path.join(__dirname, `data`, dir, file),
                            path.join(__dirname, `data`, `boys`, file),
                            (err) => {
                                if (err) {
                                    console.log(err)
                                }
                            });
                    }
                });
            });
        });
    });
});