const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();


// Addding Required Routes

const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/documents");


const app = express();


const corsOptions = {
  origin: '*', // Replace with your frontend domain
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);


const PORT = 3000;


mongoose.connect("mongodb+srv://BALAVI8888:bala8888@cluster0.g7p2mcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
