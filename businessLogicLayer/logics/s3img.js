const path = require('path');
const s3 = require(path.join(process.env.ROOT, '/middleware/s3'));
let query = require(`${process.env.ROOT}/database/getQuery`);
/**
 * 공개 이미지 보기
 * @param {*} req 
 * @param {*} res 
 */
module.exports = async (req, res) => {
    let {img_id} = req.params;
    let pool = req.app.dbPool;
    let img = (await query.EXECUTE('img.xml', 'selectImgById', { img_id }, pool))[0];
    if (!img) {
        res.json(null);
        return;
    }
    let params = {
        Bucket: process.env.S3_BUCKET,
        Key: `image/${img.s3_folder}/${img.img_id}` // 찾아온 아이디가 없으면 사진이 안나가야 하므로, 반드시 select query의 결과로 할것.
    }
    s3.getObject(params)
        .createReadStream()
        .on('error', function(err){
            res.status(500).json({error:"Error -> " + err});
        }).pipe(res);
};
