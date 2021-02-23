const express = require('express');
const router = express.Router();
const multer = require('multer');
const Pictures = require('../model/pictures');
const cryptoRandomString = require('crypto-random-string');
const fs = require('fs');
const upload = multer();

router.get('/', (req, res, next) =>
{
    res.send({
        msg: 'get request page'
    });
});


router.post('/upload', upload.single(''), async (req, res, next) =>
{
    const base64Data = req.body.base64Str;
    console.log(base64Data);
    fs.writeFile(`uploads/${cryptoRandomString({length: 10})}.png`, base64Data, 'base64', err =>
    {
        if (err)
        {
            console.log(err);
        }
        res.send({
            msg: 'OK'
        });

    });

    // const picture = new Pictures({
    //     name: req.file.filename,
    //     path: req.file.path,
    //     destination: req.file.destination
    //
    // });
    // try
    // {
    //     const res1 = await picture.save();
    //     res.json(res1);
    // } catch (e)
    // {
    //     res.send('Erro' + e);
    // }

});


module.exports = router;