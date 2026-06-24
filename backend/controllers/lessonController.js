const Lesson = require("../models/Lesson");

const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();

    res.json(lessons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    res.json(lesson);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLessons,
  getLessonById,
  createLesson,
};
