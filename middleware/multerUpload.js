var multer  = require('multer');
var multerS3 = require('multer-s3');
let util = require(`${process.env.ROOT}/businessLogicLayer/logics/util`);
const s3 = require(`./s3`);

/**
 * @deprecated
 * @description express validator 와의 연계가 좋지 않다. s3완료 해주고, req.files에 저장된 파일의 정보를 확인 할 수있게 해준다.
 * @usage 
 * 				let upload = multerUpload(storageFolder);
 * 				middleWares.push(upload.array('file', 10)); // (file이라는 이름으로 업로드된 파일을 10까지)
 * @param {*} folder 
 */
module.exports = (folder) => {
	let s3Storage = multerS3({
		s3: s3,
		bucket: process.env.S3_BUCKET,
		key: async function(req, file, cb) {
			// let extension = path.extname(file.originalname); // 확장자
			// let basename = path.basename(file.originalname, extension); // 확장자 제거한 이미지 이름
			let img_id = util.uid({prefix: 'img'});
			cb(null, `image/${folder}/${img_id}`);
		},
		acl: 'public-read',
		contentDisposition: 'attachment',
		serverSideEncryption: 'AES256'
	});

	return multer({ storage: s3Storage });
}

