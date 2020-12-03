const { test } = require(`${process.env.ROOT}/service/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/test',
        logic: test
    };
};
