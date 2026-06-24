import { Link } from "react-router-dom";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const openQuestion = (question) => {
    navigate("/ai-tutor", {
      state: {
        question,
      },
    });
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>🌐 Internet Guru</h1>

        <h2>The Internet Can Change Your Life</h2>

        <p>
          Learn internet skills with AI, voice assistance, quizzes, and
          real-world practice designed for first-generation learners.
        </p>

        <div className="hero-buttons">
          <Link to="/register">
            <button className="primary-btn">🚀 Start Learning</button>
          </Link>

          <Link to="/ai-tutor">
            <button className="secondary-btn">🤖 Explore AI Tutor</button>
          </Link>
        </div>
      </div>

      {/* Animated Globe */}
      <div className="globe-container">
        <div className="globe">
          <div className="orbit"></div>
          <div className="orbit"></div>
          <div className="orbit"></div>

          <div className="node node1"></div>
          <div className="node node2"></div>
          <div className="node node3"></div>
          <div className="node node4"></div>
          <div className="node node5"></div>
        </div>
      </div>

      {/* Curiosity Section */}
      <section className="curiosity">
        <h2>🤔 Have You Ever Wondered?</h2>

        <div className="cards">
          <div
            className="card curiosity-card"
            onClick={() => openQuestion("How does Google find answers?")}
          >
            🔍 How does Google find answers?
          </div>

          <div
            className="card curiosity-card"
            onClick={() =>
              openQuestion("How does Email travel around the world?")
            }
          >
            📧 How does Email travel around the world?
          </div>

          <div
            className="card curiosity-card"
            onClick={() => openQuestion("How do Online Payments work?")}
          >
            💳 How do Online Payments work?
          </div>

          <div
            className="card curiosity-card"
            onClick={() => openQuestion("How can I avoid Internet Scams?")}
          >
            🛡️ How can I avoid Internet Scams?
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Learn By Doing</h2>

        <div className="feature-grid">
          <Link to="/lessons" className="feature-link">
            <div className="feature">
              <h3>📚 Lessons</h3>
              <p>Understand internet basics.</p>
            </div>
          </Link>

          <Link to="/lessons" className="feature-link">
            <div className="feature">
              <h3>📝 Quizzes</h3>
              <p>Test your understanding.</p>
            </div>
          </Link>

          <Link to="/ai-tutor" className="feature-link">
            <div className="feature">
              <h3>🤖 AI Tutor</h3>
              <p>Ask questions anytime.</p>
            </div>
          </Link>

          {/* <Link to="/ai-tutor" className="feature-link">
            <div className="feature">
              <h3>🎤 Voice Learning</h3>
              <p>Speak and listen in your language.</p>
            </div>
          </Link> */}

          <Link to="/practice-labs" className="feature-link">
            {" "}
            <div className="feature">
              <h3>📧 Practice Lab</h3>
              <p>Learn through real-world tasks.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
