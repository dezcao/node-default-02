
module.exports = function (app, logic) {
	return async function (req, res, next) {
		let conn = null;
		try {
			let { dbPool } = app;
			if (!dbPool) {
				console.log('Ooops. no database. go to logic');
				logic(req, res, next);
				return;
			}
	
			conn = await dbPool.getConnection();
			await conn.beginTransaction();
	
			app.req.conn = conn;
			await logic(req, res, next);
			await conn.commit();
		} catch (error) {
			if (conn) {
				conn.rollback();
			}
			next(error);
			// error will be go to app.js
			// app.use(function(error, req, res, next) {
			// 	console.log(error.message);
			// 	res.json({"error": error.message});
			// });
		} finally {
			if (conn) {
				conn.release();
			}
		}
	}
}