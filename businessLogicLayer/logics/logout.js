module.exports = async (req, res) => {
    let { accessToken } = req.headers;
    let redis = req.app.redis;
    redis.del(accessToken);
    res.json({
        "msg": "Good Bye"
    });
};
