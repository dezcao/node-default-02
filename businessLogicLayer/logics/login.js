let query = require(`${process.env.ROOT}/database/getQuery`);
let util = require('./util');

/**
 * @description 
 * 유저의 로그인 요청을 처리한다.
 * DB에서 유저를 찾을 수 없다면, 최초의 소셜 로그인으로 간주하고 새로 생성한다.
 * 유저정보를 redis 데이터에 저장한다.
 * 이때, accessToken을 새로 생상하여 저장해준다.
 * 유저의 토큰 만료기간은 2개월로 초기화 된다.
 * 
 * @todo email을 받아서 유저를 검색할지, 다른 값으로 할지 미정이다. 소셜 로그인에 유저의 이메일 정보가 없을 수 있기 때문이다.
 * @param {Object} user
 * @param {Object} user.email
 * @return {Object} user
 */
module.exports = async (req, res) => {

    let { user } = req.body;
    let redis = req.app.redis;
    let dbUser = (await query.EXECUTE('user.xml', 'selectUserByEmail', user, conn))[0];
    let accesstoken = util.getAccessToken(user.user_id);
    
    // 60 * 60 * 24(1day) * 2 month 토큰 저장
    redis.setex(user.user_id, 60 * 60 * 24 * 60, JSON.stringify(user), function (err, daata) {
        if (err) {
            res.status(500).json(ERR_CODE.REDIS_SET);
            return;
        }
        res.status(200).json(user);
    });
};
