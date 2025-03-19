// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const express = require("express");
// const bodyParser = require("body-parser");

// const authRoutes = require("./Routes/auth");
// const noteRoutes = require("./Routes/notes");

// const app = express();
// const PORT = 6969;

// dotenv.config();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// try {
//     mongoose.connect(process.env.MONGO_URL);
//     console.log("Connection Successful");
// } catch (error) {
//     console.log(error);
// }

// app.get("/", (req, res) => {
//     res.send("Server Is Running");
// });

// app.use("/auth", authRoutes);
// app.use("/notes", noteRoutes);
// app.use("/files",express.static("files"));

// app.listen(PORT, () => {
//     console.log(`Server Running on Port ${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./Routes/auth");
const noteRoutes = require("./Routes/notes");

const app = express();
const PORT = 6969;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connection Successful");
} catch (error) {
    console.log("MongoDB Connection Error:", error);
}

app.get("/", (req, res) => {
    res.send("Server Is Running");
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/files", express.static("files")); // Serve files from the /files directory

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
