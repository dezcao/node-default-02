const { hello } = require(`${process.env.ROOT}/service/index.js`);

module.exports = () => {
    return {
        method: 'get',
        url: '/upload',
        logic: hello,
        auth: true,
        bucket: 'someBucket',
        uploadFolder: 'someFolder'
    };
};
