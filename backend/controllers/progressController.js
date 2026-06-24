const Progress = require("../models/Progress");

const updateProgress = async (req, res) => {
  try {
    const { userId, lessonId, quizId, score } = req.body;

    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = await Progress.create({
        userId,
        completedLessons: [],
        completedQuizzes: [],
      });
    }

    if (lessonId && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    if (quizId && !progress.completedQuizzes.includes(quizId)) {
      progress.completedQuizzes.push(quizId);
    }

    if (score) {
      progress.totalScore += score;
    }

    await progress.save();

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.params.userId,
    })
      .populate("completedLessons")
      .populate("completedQuizzes");

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateProgress,
  getProgress,
};
