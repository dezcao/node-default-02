var multer  = require('multer');
var multerS3 = require('multer-s3');

module.exports = function (bucket, uploadFolder) {
	// let uploadFolder = req.app.uploadFolder;
	return function (req, res, next) {
		console.log('S3 upload bucket and folder : ', bucket, uploadFolder);
		next();
	}
	// let s3Storage = multerS3({
	// 	s3: s3,
	// 	bucket,
	// 	key: async function(req, file, cb) {
	// 		// let extension = path.extname(file.originalname); // 확장자
	// 		// let basename = path.basename(file.originalname, extension); // 확장자 제거한 이미지 이름
	// 		let img_id = util.uid('img');
	// 		console.log(img_id);
	// 		cb(null, `${folder}/${img_id}`);
	// 	},
	// 	acl: 'public-read',
	// 	contentDisposition: 'attachment',
	// 	serverSideEncryption: 'AES256'
	// });

	// return multer({ storage: s3Storage });
}