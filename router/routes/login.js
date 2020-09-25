const { login } = require(`${process.env.ROOT}/businessLogicLayer/index.js`);

/**
 * @description 로그인을 요청합니다. 등록되지 않은 고객이면 등록시킵니다
 * @param {String} method 요청 방식
 * @param {String} url 요청 url
 * @param {Boolean} trans transaction이 필요합니다.
 * @param {Object} func 비지니스 로직
 * @return {Object} user
 */
module.exports = () => {
    return {
        method: 'post',
        url: '/login',
        trans: true,
        func: login
    };
};
