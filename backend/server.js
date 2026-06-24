const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const quizRoutes = require("./routes/quizRoutes");
const progressRoutes = require("./routes/progressRoutes");
const aiRoutes = require("./routes/aiRoutes");


const connectDB = require("./config/db");

dotenv.config();

require("dotenv").config();

console.log(process.env.GEMINI_API_KEY);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Internet Guru API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/lessons", lessonRoutes);

app.use("/api/quizzes", quizRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
