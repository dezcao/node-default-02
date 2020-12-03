let moment = require('moment');
module.exports = async (req, res, next) => {
    let data = 'check please, database connection infomation.';
    res.json({msg: 'hello test', time: moment().format('MMMM Do YYYY, h:mm:ss a'), data });
};
