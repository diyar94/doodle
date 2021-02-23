const express = require('express');
const router = express.Router();
const upload = require('../upload');
const Pictures = require('../model/pictures');


router.get('/', (req, res, next) =>
{
    res.send({
        msg: 'get request page'
    });
});


router.post('/upload', upload.single('image'), async (req, res, next) =>
{

    const picture = new Pictures({
        name: req.file.filename,
        path: req.file.path,
        destination: req.file.destination

    });
    try
    {
        const res1 = await picture.save();
        res.json(res1);
    } catch (e)
    {
        res.send('Erro' + e);
    }

});


module.exports = router;