// const express = require("express");
// const router = express.Router();
// const NotesController = require("../Controllers/NotesController");
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const destinationPath = "./files";
//         cb(null, destinationPath);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, uniqueSuffix + file.originalname);
//     },
// });

// const upload = multer({
//     storage: storage
// });

// // Routes
// router.post("/upload", upload.single("file"), NotesController.uploadNote);
// router.get("/getFiles", NotesController.getNote);
// router.get("/getFiles/:id", NotesController.getNoteByID);

// module.exports = router;


const express = require("express");
const router = express.Router();
const NotesController = require("../Controllers/NotesController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, "../files");
        // Check if the folder exists, if not, create it
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

// Routes
router.post("/upload", upload.single("file"), NotesController.uploadNote);
router.get("/getFiles", NotesController.getNote);
router.get("/getFiles/:id", NotesController.getNoteByID);

module.exports = router;
