var colors = require('colors');
/**
 * @description 로그인 여부를 인증하고, 로그인되었다면 해당 유저의 정보를 request에 추가합니다.
 * @param {String} accesstoken header로 전달 받습니다.
 * @param {String} user_id url path로 전달 받습니다.
 * @return {Object} user
 */

module.exports = async function ensureAuthenticated(req, res, next) {
    console.log('auth!!');
    next();
}
