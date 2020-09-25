const { s3img } = require(`${process.env.ROOT}/businessLogicLayer/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/img/:img_id',
        func: s3img
    };
};
