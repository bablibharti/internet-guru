import { useState } from "react";
import axios from "axios";
import "./EmailSimulator.css";

function EmailSimulator() {
  const missions = [
    {
      id: 1,
      xp: 50,
      difficulty: "Easy",
      receiver: "teacher@gmail.com",

      title: {
        English: "Leave Application",
        Hindi: "छुट्टी के लिए आवेदन",
        Marathi: "रजेसाठी अर्ज",
      },

      scenario: {
        English: "Write an email to your teacher asking for leave tomorrow.",

        Hindi: "अपने शिक्षक को कल की छुट्टी के लिए ईमेल लिखें।",

        Marathi: "तुमच्या शिक्षकांना उद्याच्या रजेबद्दल ईमेल लिहा।",
      },
    },

    {
      id: 2,
      xp: 75,
      difficulty: "Medium",
      receiver: "library@school.com",

      title: {
        English: "Library Request",
        Hindi: "पुस्तकालय अनुरोध",
        Marathi: "ग्रंथालय विनंती",
      },

      scenario: {
        English: "Write an email requesting access to the school library.",

        Hindi: "स्कूल पुस्तकालय के उपयोग की अनुमति के लिए ईमेल लिखें।",

        Marathi: "शाळेच्या ग्रंथालयाचा वापर करण्यासाठी ईमेल लिहा।",
      },
    },

    {
      id: 3,
      xp: 100,
      difficulty: "Medium",
      receiver: "principal@school.com",

      title: {
        English: "Event Permission",
        Hindi: "कार्यक्रम अनुमति",
        Marathi: "कार्यक्रम परवानगी",
      },

      scenario: {
        English: "Write an email asking permission to organize a school event.",

        Hindi: "स्कूल कार्यक्रम आयोजित करने की अनुमति मांगते हुए ईमेल लिखें।",

        Marathi: "शालेय कार्यक्रम आयोजित करण्यासाठी परवानगी मागणारा ईमेल लिहा।",
      },
    },

    {
      id: 4,
      xp: 125,
      difficulty: "Hard",
      receiver: "hr@company.com",

      title: {
        English: "Internship Application",
        Hindi: "इंटर्नशिप आवेदन",
        Marathi: "इंटर्नशिप अर्ज",
      },

      scenario: {
        English: "Write a professional internship application email.",

        Hindi: "एक पेशेवर इंटर्नशिप आवेदन ईमेल लिखें।",

        Marathi: "व्यावसायिक इंटर्नशिप अर्ज ईमेल लिहा।",
      },
    },

    {
      id: 5,
      xp: 150,
      difficulty: "Hard",
      receiver: "support@bank.com",

      title: {
        English: "Bank Complaint",
        Hindi: "बैंक शिकायत",
        Marathi: "बँक तक्रार",
      },

      scenario: {
        English: "Write an email reporting an unauthorized bank transaction.",

        Hindi: "अनधिकृत बैंक लेनदेन की शिकायत करने वाला ईमेल लिखें।",

        Marathi: "अनधिकृत बँक व्यवहाराबद्दल तक्रार करणारा ईमेल लिहा।",
      },
    },
  ];

  const [currentMission, setCurrentMission] = useState(missions[0]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const [xp, setXp] = useState(0);

  const [completedMissions, setCompletedMissions] = useState([]);

  const [language, setLanguage] = useState("English");

  const translations = {
    English: {
      title: "AI Email Practice Lab",
      subject: "Subject",
      message: "Write your email...",
      feedback: "AI Feedback",
    },

    Hindi: {
      title: "एआई ईमेल अभ्यास लैब",
      subject: "विषय",
      message: "अपना ईमेल लिखें...",
      feedback: "एआई प्रतिक्रिया",
    },

    Marathi: {
      title: "एआय ईमेल सराव केंद्र",
      subject: "विषय",
      message: "तुमचा ईमेल लिहा...",
      feedback: "एआय अभिप्राय",
    },
  };

  const t = translations[language];

  const speakText = (text) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    let selectedVoice;

    if (language === "Hindi") {
      utterance.lang = "hi-IN";

      selectedVoice = voices.find((v) => v.lang.includes("hi"));
    } else if (language === "Marathi") {
      utterance.lang = "mr-IN";

      selectedVoice =
        voices.find((v) => v.lang.includes("mr")) ||
        voices.find((v) => v.lang.includes("hi"));
    } else {
      utterance.lang = "en-IN";

      selectedVoice = voices.find((v) => v.lang.includes("en"));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 0.9;

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    if (language === "Hindi") {
      recognition.lang = "hi-IN";
    } else if (language === "Marathi") {
      recognition.lang = "mr-IN";
    } else {
      recognition.lang = "en-IN";
    }

    recognition.start();

    recognition.onresult = (event) => {
      setMessage(event.results[0][0].transcript);
    };
  };

  const checkEmail = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/evaluate-email",
        {
          scenario: currentMission.scenario[language],
          subject,
          message,
          language,
        },
      );

      setFeedback(res.data.feedback);

      if (!completedMissions.includes(currentMission.id)) {
        setXp((prev) => prev + currentMission.xp);

        setCompletedMissions((prev) => [...prev, currentMission.id]);
      }

      speakText(res.data.feedback);
    } catch (error) {
      console.log(error);
      alert("Error checking email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-page">
      <div className="email-container">
        <div className="top-bar">
          <h1>📧 {t.title}</h1>

          <div className="stats">⭐ XP: {xp}</div>
        </div>

        <div className="mission-board">
          <h2>🎮 Mission Board</h2>

          <div className="mission-list">
            {missions.map((mission) => (
              <div
                key={mission.id}
                className={`mission-item ${
                  currentMission.id === mission.id ? "active-mission" : ""
                }`}
                onClick={() => {
                  setCurrentMission(mission);

                  setSubject("");
                  setMessage("");
                  setFeedback("");
                }}
              >
                <h3>Level {mission.id}</h3>

                <p>{mission.title[language]}</p>

                <span>⭐ {mission.xp}</span>

                {completedMissions.includes(mission.id) && (
                  <div className="completed-badge">✅ Completed</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mission-card">
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>

          <h2>🎯 {currentMission.title[language]}</h2>

          <p>Difficulty: {currentMission.difficulty}</p>

          <p>Reward: ⭐ {currentMission.xp}</p>

          <p>{currentMission.scenario[language]}</p>

          <button
            className="explain-btn"
            onClick={() => speakText(currentMission.scenario[language])}
          >
            🔊 Explain Mission
          </button>
        </div>

        <div className="gmail-box">
          <div className="gmail-header">Compose Email</div>

          <div className="gmail-body">
            <input
              className="gmail-input"
              value={currentMission.receiver}
              readOnly
            />

            <input
              className="gmail-input"
              placeholder={t.subject}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              className="gmail-textarea"
              placeholder={t.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="action-buttons">
              <button onClick={startListening}>🎤 Voice Input</button>

              <button onClick={checkEmail}>🤖 Check Email</button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="loading-card">
            🤖 AI Teacher is reviewing your email...
          </div>
        )}

        {feedback && (
          <div className="feedback-box">
            <h2>{t.feedback}</h2>

            <pre>{feedback}</pre>

            <div className="action-buttons">
              <button onClick={() => speakText(feedback)}>
                🔊 Listen Again
              </button>

              <button onClick={() => window.speechSynthesis.cancel()}>
                ⛔ Stop Audio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailSimulator;
