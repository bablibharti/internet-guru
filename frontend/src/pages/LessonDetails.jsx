import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function LessonDetails() {
  const { id } = useParams();

  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = async () => {
    try {
      const response = await api.get(`/lessons/${id}`);

      setLesson(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!lesson) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{lesson.title}</h1>

      <p>
        <strong>Module:</strong> {lesson.module}
      </p>

      <p>
        <strong>Difficulty:</strong> {lesson.difficulty}
      </p>

      <p>
        <strong>Estimated Time:</strong> {lesson.estimatedTime} mins
      </p>

      {lesson.imageUrl && (
        <img src={lesson.imageUrl} alt={lesson.title} width="400" />
      )}

      <br />
      <br />

      <p>{lesson.content}</p>

      {lesson.videoUrl && (
        <>
          <h3>Video</h3>

          <a href={lesson.videoUrl} target="_blank" rel="noreferrer">
            Watch Video
          </a>
        </>
      )}

      <br />
      <br />

      <Link to={`/quiz/${lesson._id}`}>Take Quiz</Link>
    </div>
  );
}

export default LessonDetails;
