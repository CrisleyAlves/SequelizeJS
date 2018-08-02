const express = require("express");
const router = express.Router();
const multer = require("multer");

//sempre quando uma nova imagem for ser salva, as funções serão executadas
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/clients/') //cb -> callback
    },
    filename: function(req, file, cb){
        cb(null, file.originalname); //cb -> callback
    }
})

const fileFilter = (req, file, cb) =>{    
    //salva o arquivo
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        // ignora o arquivo e não salva
        cb(null, false);
    }    
}

const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 2 // até 2 MB
    },
    fileFilter: fileFilter
});


const clientController = require("../controllers/Client");

router.get("/", clientController.getAll);
router.get("/:clientId", clientController.getById);
router.post("/", upload.single('photo'), clientController.insert);
router.put("/", upload.single('photo'), clientController.update);
router.delete("/:clientId", clientController.delete);

module.exports = router;