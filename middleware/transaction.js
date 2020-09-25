const s3 = require(`${process.env.ROOT}/middleware/s3`);

module.exports = function transaction(fn) {
	return async function (req, res, next) {
		let { dbPool } = req.app;
		let conn = await dbPool.getConnection();
		try {
			await conn.beginTransaction();
			req.conn = conn;
			await fn(req, res, next);
			await conn.commit();
		} catch (error) {
			conn.rollback();
			let files = req.files;
			if (files) {
				for (var i = 0; i < files.length; i++) {
					let file = files[i];
					let params = {
						Bucket: process.env.S3_BUCKET,
						Key: file.Key
					};
				
					s3.deleteObject(params, function (err, data) {
						if (err) console.log(err, err.stack);
						else console.log(data);
					});
				}
			}
			res.json({error: error.message});
		} finally {
			conn.release();
		}
	};
}
