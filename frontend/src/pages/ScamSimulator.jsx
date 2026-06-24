import { useState } from "react";
import "./ScamSimulator.css";

function ScamSimulator() {
const scams = [
{
id: 1,
sender: "Unknown Number",
message:
"🎉 Congratulations! You won ₹50,000. Click here immediately to claim your prize: [www.free-money-now.com](http://www.free-money-now.com)",
answer: "Scam",
explanation:
"Unknown sender, free money promise, and suspicious link.",
},


{
  id: 2,
  sender: "Bank Alert",
  message:
    "Your bank account has been blocked. Verify your password immediately at secure-bank-login.net",
  answer: "Scam",
  explanation:
    "Banks never ask for passwords through links.",
},

{
  id: 3,
  sender: "College Office",
  message:
    "Tomorrow's class starts at 10:00 AM instead of 9:00 AM.",
  answer: "Safe",
  explanation:
    "Normal informational message with no suspicious links.",
},


];

const [current, setCurrent] = useState(0);
const [result, setResult] = useState("");

const checkAnswer = (choice) => {
const currentScam = scams[current];


if (choice === currentScam.answer) {
  setResult(
    "✅ Correct! " +
      currentScam.explanation
  );
} else {
  setResult(
    "❌ Wrong! " +
      currentScam.explanation
  );
}


};

const nextMission = () => {
setResult("");


if (current < scams.length - 1) {
  setCurrent(current + 1);
} else {
  alert(
    "🎉 Congratulations! You completed Scam Detection Training."
  );
}


};

return ( <div className="scam-page">


  <h1>
    🛡️ Scam Detection Simulator
  </h1>

  <p>
    Learn how to identify dangerous
    messages before they harm you.
  </p>

  <div className="phone">

    <div className="chat-header">
      {scams[current].sender}
    </div>

    <div className="chat-body">

      <div className="message">
        {scams[current].message}
      </div>

    </div>

  </div>

  <div className="buttons">

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
      🚨 Scam
    </button>

  </div>

  {result && (
    <div className="result-box">

      <h3>Result</h3>

      <p>{result}</p>

      <button
        className="next-btn"
        onClick={nextMission}
      >
        Next Mission →
      </button>

    </div>
  )}

</div>


);
}

export default ScamSimulator;
