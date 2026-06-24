import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Lessons.css";

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await api.get("/lessons");

      setLessons(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading lessons...</h2>;
  }

return (
  <div className="journey-page">
    <h1>🌍 Internet Learning Journey</h1>

    <div className="journey-path">
      {lessons.map((lesson, index) => (
        <div
          key={lesson._id}
          className={`level ${index % 2 === 0 ? "left" : "right"}`}
        >
          <Link to={`/lessons/${lesson._id}`} className="level-link">
            <div className="level-circle">{index + 1}</div>

            <div className="level-card">
              <h3>{lesson.title}</h3>

              <p>
                {lesson.estimatedTime}
                min
              </p>

              <button onClick={() => navigate(`/quiz/${lesson._id}`)}>
                🚀 Take Quiz
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);
}

export default Lessons;
