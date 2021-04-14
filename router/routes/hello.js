const { hello } = require(`../../service/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/',
        logic: hello,
        transaction: true
    };
};
