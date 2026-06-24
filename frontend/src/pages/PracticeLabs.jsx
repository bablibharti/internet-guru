import { Link } from "react-router-dom";
import "./PracticeLabs.css";

function PracticeLabs() {
  const labs = [
    {
      title: "📧 Email Simulator",
      desc: "Learn professional email writing.",
      link: "/email-simulator",
    },

    {
      title: "🌐 Browser Simulator",
      desc: "Learn how websites work.",
      link: "/browser-simulator",
    },

    {
      title: "🔍 Search Engine Simulator",
      desc: "Practice searching information.",
      link: "/search-simulator",
    },

    {
      title: "🛒 Online Shopping Simulator",
      desc: "Learn safe online shopping.",
      link: "/shopping-simulator",
    },

    {
      title: "💳 Digital Payment Simulator",
      desc: "Practice online payments safely.",
      link: "/payment-simulator",
    },

    {
      title: "🛡️ Scam Detection Simulator",
      desc: "Learn to identify fake messages and scams.",
      link: "/scam-simulator",
    },
  ];

  return (
    <div className="labs-page">
      <h1>🎮 Practice Labs</h1>

      <p>Learn Internet Skills Through Real-Life Simulations</p>

      <div className="labs-grid">
        {labs.map((lab) => (
          <Link key={lab.title} to={lab.link} className="lab-link">
            <div className="lab-card">
              <h2>{lab.title}</h2>
              <p>{lab.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PracticeLabs;
