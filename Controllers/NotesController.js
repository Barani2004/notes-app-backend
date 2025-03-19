// const express = require("express");
// const dotenv = require("dotenv");
// const Notes = require("../Models/Notes");
// const multer = require("multer");
// const path = require("path");

// dotenv.config();

// const storage = multer.memoryStorage();
// var upload = multer({ storage: storage });

// const uploadNote = async (req, res) => {
//     try {
//         const fileName = req.body.title;
//         const fileDescription = req.body.description;
//         const tags = req.body.tags;
//         const file = req.file.filename;

//         const uploadedBy = req.body.userId;
//         console.log(uploadedBy);

//         const newFile = new Notes({
//             fileName: fileName,
//             fileDescription: fileDescription,
//             tags: tags,
//             files: file,
//             uploadedBy: uploadedBy
//         });

//         await newFile.save();
//         res.send({ status: "Ok" });

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//         console.log(error);
//     }
// };

// const getNote = async (req, res) => {
//     try {
//         const { title, tag } = req.query;
//         const query = {};

//         if (title) {
//             query.fileName = {
//                 $regex: title,
//                 $options: "i"
//             };
//         };

//         if (tag) {
//             query.tag = {
//                 $regex: tag,
//                 $options: "i"
//             };
//         };

//         const data = await Notes.find(query);
//         res.send({ data: data });

//     } catch (error) {
//         console.log(error);
//     }
// };

// const getNoteByID = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         console.log(userId);

//         await Notes.find({
//             uploadedBy: userId
//         }).then(data => {
//             res.send({ data: data });
//         })
//     } catch (error) {
//         console.log(error);
//     }
// };

// module.exports = { uploadNote, getNote, getNoteByID };


const Notes = require("../Models/Notes");

const uploadNote = async (req, res) => {
    try {
        const { title, description, tags, userId } = req.body;

        // Log file details to ensure multer is working correctly
        console.log("Uploaded file:", req.file);

        // Check if the file was uploaded correctly
        if (!req.file) {
            return res.status(400).json({ error: "File upload failed" });
        }

        const fileName = title;
        const fileDescription = description;
        const file = req.file.filename;  // Get the uploaded filename

        const newNote = new Notes({
            fileName,
            fileDescription,
            tags,
            files: file,  // Save the filename in the database
            uploadedBy: userId
        });

        await newNote.save();
        res.status(200).send({ status: "Ok", message: "Note uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Error uploading note:", error);
    }
};

const getNote = async (req, res) => {
    try {
        const { title, tag } = req.query;
        const query = {};

        if (title) {
            query.fileName = {
                $regex: title,
                $options: "i"
            };
        }

        if (tag) {
            query.tags = {
                $regex: tag,
                $options: "i"
            };
        }

        const data = await Notes.find(query);
        res.send({ data: data });
    } catch (error) {
        console.log("Error fetching notes:", error);
        res.status(500).json({ error: error.message });
    }
};

const getNoteByID = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Fetching notes for user:", userId);

        const data = await Notes.find({ uploadedBy: userId });
        res.send({ data: data });
    } catch (error) {
        console.log("Error fetching notes by user ID:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadNote, getNote, getNoteByID };
