import { Link } from "react-router-dom";
import "./PaymentSimulator.css";

function PaymentSimulator() {
const missions = [
{
id: 1,
title: "📷 Scan QR & Pay",
description: "Learn how QR code payments work safely.",
xp: 50,
route: "/payment-simulator/qr-payment",
},


{
  id: 2,
  title: "🕵️ Safe or Scam?",
  description: "Identify fake payment requests.",
  xp: 75,
  route: "/payment-simulator/scam-detection",
},

{
  id: 3,
  title: "💸 Send Money",
  description: "Transfer money using UPI.",
  xp: 75,
  route: "/payment-simulator/send-money",
},

{
  id: 4,
  title: "📥 Receive Money",
  description: "Understand incoming payments.",
  xp: 75,
  route: "/payment-simulator/receive-money",
},

{
  id: 5,
  title: "🚨 Payment Request Scam",
  description: "Avoid common UPI scams.",
  xp: 100,
  route: "/payment-simulator/request-scam",
},

{
  id: 6,
  title: "🔐 OTP Protection",
  description: "Learn OTP safety.",
  xp: 100,
  route: "/payment-simulator/otp-challenge",
},

{
  id: 7,
  title: "🛒 Shopping Checkout",
  description: "Complete an online purchase.",
  xp: 200,
  route: "/payment-simulator/shopping",
},


];

return ( <div className="payment-page"> <div className="payment-hero">


    <h1>💳 Digital Payment Simulator</h1>

    <p>
      Master online payments through interactive missions.
      Learn UPI, QR Payments, Scam Detection and Safe Banking.
    </p>

  </div>

  <div className="roadmap">

    {missions.map((mission, index) => (
      <div
        key={mission.id}
        className={`mission-node ${
          index % 2 === 0 ? "left" : "right"
        }`}
      >
        <div className="mission-card">

          <div className="mission-level">
            LEVEL {mission.id}
          </div>

          <h2>{mission.title}</h2>

          <p>{mission.description}</p>

          <div className="reward">
            ⭐ {mission.xp} XP
          </div>

          <Link
            to={mission.route}
            className="start-btn"
          >
            ▶ Start Mission
          </Link>

        </div>
      </div>
    ))}

  </div>
</div>


);
}

export default PaymentSimulator;
