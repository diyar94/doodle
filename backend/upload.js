const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) =>
    {
        const originalname = file.originalname;
        const extension = originalname.split('.');
        filename = Date.now() + "_" +  originalname;
        cb(null, filename);

    }
});


module.exports = multer({storage: storage});