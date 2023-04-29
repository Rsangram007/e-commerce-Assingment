import multer from 'multer'
import path from 'path'


// Settings
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null,  path.extname(file.originalname))
    }
});
export default multer({storage});