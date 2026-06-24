const express = require("express");

const router = express.Router();

const {
  createQuiz,
  getQuizByLesson,
} = require("../controllers/quizController");

router.post("/", createQuiz);

router.get("/:lessonId", getQuizByLesson);

module.exports = router;
