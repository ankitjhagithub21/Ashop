const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const id = uuidv4();
        const extName = path.extname(file.originalname);
        const filename = `${id}${extName}`;

        cb(null, filename);
    }
});

const uploadImage = multer({ storage }).single('image');

module.exports = uploadImage;
