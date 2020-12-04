const { test } = require(`../../service/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/test',
        logic: test
    };
};
