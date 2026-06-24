import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./AITutor.css";

function AITutor() {
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [language, setLanguage] = useState("English");
const [loading, setLoading] = useState(false);

const location = useLocation();

const cleanText = (text) => {
return text
.replace(/\*/g, "")
.replace(/#/g, "")
.replace(/•/g, "")
.replace(/\n/g, " ");
};

const speakAnswer = (text) => {
window.speechSynthesis.cancel();


const utterance = new SpeechSynthesisUtterance(
  cleanText(text)
);

const voices = window.speechSynthesis.getVoices();

let selectedVoice;

if (language === "English") {
  utterance.lang = "en-IN";

  selectedVoice = voices.find((v) =>
    v.lang.includes("en")
  );
} else if (language === "Hindi") {
  utterance.lang = "hi-IN";

  selectedVoice = voices.find((v) =>
    v.lang.includes("hi")
  );
} else {
  utterance.lang = "mr-IN";

  selectedVoice = voices.find((v) =>
    v.lang.includes("mr")
  );

  if (!selectedVoice) {
    selectedVoice = voices.find((v) =>
      v.lang.includes("hi")
    );
  }
}

if (selectedVoice) {
  utterance.voice = selectedVoice;
}

utterance.rate = 0.9;

window.speechSynthesis.speak(utterance);


};

const startListening = () => {
const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;


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
  setQuestion(
    event.results[0][0].transcript
  );
};

};

const askAI = async (customQuestion) => {
try {
setLoading(true);


  const finalQuestion =
    customQuestion || question;

  const res = await axios.post(
    "https://internet-guru-api.onrender.com/api/ai/ask",
    {
      question: finalQuestion,
      language,
    },
  );

  setAnswer(res.data.answer);

  speakAnswer(res.data.answer);
} catch (error) {
  console.log(error);
  alert("AI Error");
} finally {
  setLoading(false);
}


};

useEffect(() => {
if (location.state?.question) {
setQuestion(location.state.question);


  setTimeout(() => {
    askAI(location.state.question);
  }, 500);
}


}, [location]);

return ( <div className="ai-page"> <div className="ai-container">


    <div className="teacher-card">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Teacher"
        className="teacher-avatar"
      />

      <div>
        <h1>🤖 Internet Guru AI</h1>

        <p>
          Ask anything about the Internet in
          your own language.
        </p>
      </div>
    </div>

    <div className="language-box">
      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
      >
        <option>English</option>
        <option>Hindi</option>
        <option>Marathi</option>
      </select>
    </div>

    <div className="question-box">
      <textarea
        placeholder="Ask your question..."
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />
    </div>

    <div className="button-group">
      <button
        className="voice-btn"
        onClick={startListening}
      >
        🎤 Speak Question
      </button>

      <button
        className="ask-btn"
        onClick={() => askAI()}
      >
        🚀 Ask AI
      </button>
    </div>

    {loading && (
      <div className="thinking-box">
        🤔 Thinking...
      </div>
    )}

    {answer && (
      <div className="answer-card">
        <h2>👨‍🏫 Teacher Says</h2>

        <p>{answer}</p>

        <div className="button-group">
          <button
            className="voice-btn"
            onClick={() =>
              speakAnswer(answer)
            }
          >
            🔊 Listen Again
          </button>

          <button
            className="stop-btn"
            onClick={() =>
              window.speechSynthesis.cancel()
            }
          >
            ⛔ Stop
          </button>
        </div>
      </div>
    )}

  </div>
</div>


);
}

export default AITutor;
