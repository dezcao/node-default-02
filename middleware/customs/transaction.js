
module.exports = async function transaction(app, logic) {
	let { dbPool } = app;
	console.log(logic);
	if (!dbPool) {
		return logic;
		// await logic(req, res, next);
	} else {
		let conn = await dbPool.getConnection();
		
		try {
			await conn.beginTransaction();
			
			req.conn = conn;

			await logic(req, res, next);
			await conn.commit();
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
	}
}