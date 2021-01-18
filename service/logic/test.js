let query = require(`${process.env.ROOT}/database/utils/getQuery`);
let moment = require('moment');
module.exports = async (req, res, next) => {
    // let conn = req.conn;
    let dbPool = req.app.dbPool;
    
    let conn = await dbPool.getConnection();
    try {
        await conn.beginTransaction();
        
        // let { user } = req.body;
        // let { key } = req.query;
        // let redis = req.app.redis;
        
        let data = `check please, database connection infomation.`;
        
        if (conn) {
            data = (await query.EXECUTE('sample.xml', 'getAPI', null, conn))[0];
        }
        // throw Error('myError~~~'); // error handle test! look at server.js

        // let value = Date.now();
        // moment().format('MMMM Do YYYY, h:mm:ss a'); // November 24th 2020, 7:44:45 pm
        // moment().format('dddd');                    // Tuesday
        // moment().format("MMM Do YY");               // Nov 24th 20
        // moment().format('YYYY [escaped] YYYY');     // 2020 escaped 2020
        // moment().format();                          // 2020-11-24T19:45:15+09:00
        await conn.commit();

        res.json({msg: 'hello Webhook. git + jenkins', time: moment().format('MMMM Do YYYY, h:mm:ss a'), data });
    } catch (error) {
        conn.rollback();
        // let files = req.files;
        // if (files) {
        // 	for (var i = 0; i < files.length; i++) {
        // 		let file = files[i];
        // 		let params = {
        // 			Bucket: process.env.S3_BUCKET,
        // 			Key: file.Key
        // 		};
            
        // 		s3.deleteObject(params, function (err, data) {
        // 			if (err) console.log(err, err.stack);
        // 			else console.log(data);
        // 		});
        // 	}
        // }
        next(error);
        // next(error.message);
        // res.json({error: error.message});
    } finally {
        conn.release();
    }

};
