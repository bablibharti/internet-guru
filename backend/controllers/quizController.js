const Quiz = require("../models/Quiz");

const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getQuizByLesson = async (req, res) => {
  try {
    console.log("Lesson ID:", req.params.lessonId);

    const quizzes = await Quiz.find({
      lessonId: req.params.lessonId,
    });

    console.log(quizzes);

    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createQuiz,
  getQuizByLesson,
};
