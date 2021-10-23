const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

module.exports = async ( dataBase, timeToRottenDayToDell ) => {
// const nowDate = new Date().getDate();
// const dateBaseToClean = [
//     O_Auth,
//     O_Password
// ];
// dateBaseToClean.map(async ( dataBase ) => {
//     const tokens = await dataBase.find();
//
//     tokens.map(async ( token ) => {
//         const timestamp = token._id.getTimestamp();
//         const date = timestamp.getDate();
//
//         if ( nowDate - date > 1 ) {
//             await O_Auth.deleteOne({ _id: token._id });
//         }
//     });
// });
    const rotten = dayJs.utc().subtract(timeToRottenDayToDell, 'day');

    const deleteInfo = await dataBase.deleteMany({
        createdAt: { $lt: rotten }
    });

    console.log(deleteInfo);
    // console.log(`in the ${dataBase.model.name}`); // як взяти тут назву бази з dataBase?
};
