let query = require(`${process.env.ROOT}/database/utils/getQuery`);
let moment = require('moment');
module.exports = async (req, res, next) => {
    let conn = req.conn;
    let data = `check please, database connection infomation.`;
    console.log('/test.');
    if (conn) {
        data = (await query.EXECUTE('sample.xml', 'getAPI', null, conn))[0];
    }
    res.json({msg: 'hello Webhook. git + jenkins', time: moment().format('MMMM Do YYYY, h:mm:ss a'), data });
};
