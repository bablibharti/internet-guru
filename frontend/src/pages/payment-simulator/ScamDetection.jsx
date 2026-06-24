import { useState } from "react";
import "./ScamDetection.css";

function ScamDetection() {
const scenarios = [
{
id: 1,
message:
"Congratulations! You won ₹50,000. Click this link immediately to claim your reward.",
answer: "Scam",
explanation:
"Unexpected prizes and urgent links are common scam tactics.",
},


{
  id: 2,
  message:
    "ABC School: Your fee payment of ₹2,000 has been received successfully.",
  answer: "Safe",
  explanation:
    "This is a normal transaction confirmation message.",
},

{
  id: 3,
  message:
    "Your bank account will be blocked today. Share your OTP immediately.",
  answer: "Scam",
  explanation:
    "Banks never ask for OTPs through messages.",
},

{
  id: 4,
  message:
    "You received ₹500 from Rahul via UPI.",
  answer: "Safe",
  explanation:
    "A simple payment notification is normal.",
},


];

const [current, setCurrent] = useState(0);
const [result, setResult] = useState("");
const [xp, setXp] = useState(0);

const scenario = scenarios[current];

const checkAnswer = (choice) => {
if (choice === scenario.answer) {
setResult(
"✅ Correct! " + scenario.explanation
);


  setXp((prev) => prev + 25);
} else {
  setResult(
    "❌ Incorrect. " + scenario.explanation
  );
}


};

const nextScenario = () => {
if (current < scenarios.length - 1) {
setCurrent(current + 1);
setResult("");
}
};

return ( <div className="scam-page">


  <div className="scam-container">

    <div className="top-section">
      <h1>🕵️ Scam Detective</h1>

      <p>
        Identify suspicious payment and
        banking messages.
      </p>

      <div className="xp-box">
        ⭐ XP: {xp}
      </div>
    </div>

    <div className="phone-view">

      <div className="chat-header">
        WhatsApp Message
      </div>

      <div className="message-bubble">
        {scenario.message}
      </div>

      <div className="action-area">

        <button
          className="safe-btn"
          onClick={() =>
            checkAnswer("Safe")
          }
        >
          ✅ Safe
        </button>

        <button
          className="scam-btn"
          onClick={() =>
            checkAnswer("Scam")
          }
        >
          ❌ Scam
        </button>

      </div>

    </div>

    {result && (
      <div className="result-box">

        <h3>Result</h3>

        <p>{result}</p>

        {current < scenarios.length - 1 && (
          <button
            className="next-btn"
            onClick={nextScenario}
          >
            Next Scenario →
          </button>
        )}

        {current === scenarios.length - 1 && (
          <div className="finish-box">
            🏆 Mission Completed
          </div>
        )}

      </div>
    )}

  </div>

</div>


);
}

export default ScamDetection;
