import { useState } from "react";
import "./OTPChallenge.css";

function OTPChallenge() {
  const [scenario, setScenario] = useState(0);
  const [result, setResult] = useState("");
  const [xp, setXp] = useState(0);

  const scams = [
    {
      title: "🏦 Bank Verification Call",
      message:
        "Hello Sir, your bank account will be blocked today. Please tell us the OTP sent to your phone.",
    },
    {
      title: "🎁 Reward Points Scam",
      message:
        "Congratulations! You won ₹10,000 cashback. Share your OTP to claim it.",
    },
    {
      title: "📱 KYC Update Scam",
      message:
        "Your KYC is incomplete. Share OTP immediately to avoid account suspension.",
    },
  ];

  const current = scams[scenario];

  const handleChoice = (choice) => {
    if (choice === "deny") {
      setResult(
        "✅ Correct! Banks never ask for OTPs. Never share OTP with anyone.",
      );

      setXp((prev) => prev + 50);
    } else {
      setResult(
        "❌ Fraud Alert! Sharing OTP can give scammers access to your account.",
      );
    }
  };

  const nextScenario = () => {
    setResult("");

    if (scenario < scams.length - 1) {
      setScenario(scenario + 1);
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <div className="otp-header">
          <h1>🔐 OTP Security Challenge</h1>

          <p>Can you identify the scam?</p>

          <div className="otp-xp">⭐ XP: {xp}</div>
        </div>

        <div className="phone-screen">
          <div className="bank-header">Secure Banking</div>

          <div className="message-box">
            <h2>{current.title}</h2>

            <p>{current.message}</p>

            <input className="otp-input" placeholder="Enter OTP" disabled />

            <div className="otp-buttons">
              <button className="safe-btn" onClick={() => handleChoice("deny")}>
                Do NOT Share OTP
              </button>

              <button
                className="danger-btn"
                onClick={() => handleChoice("share")}
              >
                Share OTP
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="result-box">
            <h3>Result</h3>

            <p>{result}</p>
          </div>
        )}

        {scenario < scams.length - 1 && (
          <button className="next-btn" onClick={nextScenario}>
            Next Challenge →
          </button>
        )}

        <div className="safety-tip">
          <h3>🛡 Golden Rule</h3>

          <p>OTP, PIN, CVV and Passwords should never be shared with anyone.</p>
        </div>
      </div>
    </div>
  );
}

export default OTPChallenge;
