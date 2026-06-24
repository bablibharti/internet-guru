import { useState } from "react";
import "./RequestScam.css";

function RequestScam() {
  const [result, setResult] = useState("");
  const [xp, setXp] = useState(0);

  const handleChoice = (choice) => {
    if (choice === "receive") {
      setResult(
        "✅ Correct! To receive money, you should verify the sender and check the app carefully.",
      );

      setXp(100);
    } else {
      setResult(
        "❌ Scam Alert! This button would actually send ₹5000 from your account.",
      );

      setXp(0);
    }
  };

  return (
    <div className="request-page">
      <div className="request-container">
        <div className="request-header">
          <h1>🚨 UPI Scam Simulator</h1>

          <p>Learn how fraudsters trick people into sending money.</p>

          <div className="xp-box">⭐ XP Earned: {xp}</div>
        </div>

        <div className="phone-frame">
          <div className="phone-top">Fake UPI Request</div>

          <div className="payment-card">
            <h2>💰 ₹5000</h2>

            <p>Rajesh Kumar wants to send you money.</p>

            <p>What should you do?</p>

            <div className="action-buttons">
              <button
                className="receive-btn"
                onClick={() => handleChoice("receive")}
              >
                Receive Money
              </button>

              <button className="pay-btn" onClick={() => handleChoice("pay")}>
                Pay ₹5000
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="result-card">
            <h2>Result</h2>

            <p>{result}</p>
          </div>
        )}

        <div className="tip-card">
          <h3>🛡 Safety Tip</h3>

          <p>UPI apps never require you to enter your PIN to receive money.</p>
        </div>
      </div>
    </div>
  );
}

export default RequestScam;
