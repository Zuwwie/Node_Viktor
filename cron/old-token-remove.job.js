const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

module.exports = async ( dataBase, timeToRottenDayToDell ) => {

    const rotten = dayJs.utc().subtract(timeToRottenDayToDell, 'day');

    const deleteInfo = await dataBase.deleteMany({
        createdAt: { $lt: rotten }
    });

    console.log(deleteInfo);
    // console.log(`in the ${dataBase.model.name}`); // як взяти тут назву бази з dataBase?
};
