module.exports = async (req, res) => {
    let redis = req.app.redis;
    let key = 'time'
    let value = Date.now();
    redis.setex(key, 60 * 60 * 24, value, async function (err, data) {
        if (err) {
            res.status(500).json({msg: err.message});
            return;
        }
        res.json({msg: await redis.getAsync(key), data});
    });
};
