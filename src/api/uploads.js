//
//
const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extnameCheck = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetypeCheck = filetypes.test(file.mimetype)
    if (extnameCheck && mimetypeCheck)
        return cb(null, true)
    else
        cb('File images only')
}


const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

module.exports = upload
