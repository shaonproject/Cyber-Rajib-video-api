exports.name = '/checknude';
exports.index = async(req, res, next) => {
    const request = require('request');
    var key = [
        'wltOzZ4tD7', //NTD
        'TyRTWWdguv',
        'S14CbirbO2'
    ]
    var keyInput = req.query.key
    if (!keyInput) return res.json({
        error: 'Thiếu dữ liệu'
    });
    var checkKey = key.includes(keyInput)
    if (checkKey == false) return res.jsonp({ error: 'sai key' });
    var link = req.query.link
    if (!link) return res.jsonp({ error: 'Thiếu dữ liệu' });
    var keyAPi = ['3ef4a90946msh06d585e2e04f517p1843e6jsn12f260d55668', 'a012e05802msh4ce48bff26d56oph151d85jsn4edde7f89de0', 'cfda102be7msh99663900b3eb738p1adf3bjsn53d6jhfdsf17']
    var keyRandom = keyAPi[Math.floor(Math.random() * keyAPi.length)];
    const options = {
        method: 'POST',
        url: 'https://nsfw-image-classification1.p.rapidapi.com/img/nsfw',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'nsfw-image-classification1.p.rapidapi.com',
            'x-rapidapi-key': keyRandom,
            useQueryString: true
        },
        body: {
            url: link
        },
        json: true
    };
    request(options, function(error, response, body) {
        if (error) return res.jsonp({ error: 'Không thể xử lí yêu cầu của bạn' })
        const data = body.NSFW_Prob * 100
        res.jsonp({
            data: Number(data.toFixed(0)),
            NSFW_Prob: data.toFixed(0) + '%'
        })
    });
}