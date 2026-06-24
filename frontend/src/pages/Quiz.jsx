import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Quiz.css";

function Quiz() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await api.get(`/quizzes/${lessonId}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    let totalScore = 0;

    quizzes.forEach((quiz) => {
      if (answers[quiz._id] === quiz.correctAnswer) {
        totalScore++;
      }
    });

    setScore(totalScore);
  };

  if (!quizzes.length) {
    return (
      <div className="quiz-page">
        <h2 className="loading-text">Loading Quiz...</h2>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>🧠 Internet Quiz Challenge</h1>
          <p>Test your internet knowledge and earn XP.</p>
        </div>

        <div className="progress-card">
          <h3>
            Progress {Object.keys(answers).length} / {quizzes.length}
          </h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${
                  (Object.keys(answers).length / quizzes.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {quizzes.map((quiz, index) => (
          <div key={quiz._id} className="question-card">
            <h2>🎯 Question {index + 1}</h2>

            <h3>{quiz.question}</h3>

            <div className="options-container">
              {quiz.options.map((option) => (
                <label key={option} className="option-card">
                  <input
                    type="radio"
                    name={quiz._id}
                    value={option}
                    onChange={() => handleOptionChange(quiz._id, option)}
                  />

                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="submit-section">
          <button className="submit-btn" onClick={handleSubmit}>
            🚀 Submit Quiz
          </button>
        </div>

        {score !== null && (
          <div className="result-card">
            <h1>🎉 Quiz Completed</h1>

            <h2>
              Score: {score}/{quizzes.length}
            </h2>

            <h3>⭐ XP Earned: {score * 20}</h3>

            <button
              className="dashboard-btn"
              onClick={() => navigate("/dashboard")}
            >
              Go To Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
