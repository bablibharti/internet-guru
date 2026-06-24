import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonDetails from "./pages/LessonDetails";
import Quiz from "./pages/Quiz";
import AITutor from "./pages/AITutor";
import EmailSimulator from "./pages/EmailSimulator";
import PracticeLabs from "./pages/PracticeLabs";
import ScamSimulator from "./pages/ScamSimulator";
import PaymentSimulator from "./pages/Payment-simulator/PaymentSimulator";
import QRPayment from "./pages/payment-simulator/QRPayment";
import ScamDetection from "./pages/payment-simulator/ScamDetection";
import RequestScam from "./pages/payment-simulator/RequestScam";
import OTPChallenge from "./pages/payment-simulator/OTPChallenge";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Lessons */}
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:id" element={<LessonDetails />} />

        {/* Quiz */}
        <Route path="/quiz/:lessonId" element={<Quiz />} />

        {/* AI Tutor */}
        <Route path="/ai-tutor" element={<AITutor />} />

        <Route path="/email-simulator" element={<EmailSimulator />} />

        <Route path="/practice-labs" element={<PracticeLabs />} />

        <Route path="/scam-simulator" element={<ScamSimulator />} />

        <Route path="/payment-simulator" element={<PaymentSimulator />} />

        <Route path="/payment-simulator/qr-payment" element={<QRPayment />} />

        <Route
          path="/payment-simulator/scam-detection"
          element={<ScamDetection />}
        />


        <Route
          path="/payment-simulator/request-scam"
          element={<RequestScam />}
        />

        <Route
          path="/payment-simulator/otp-challenge"
          element={<OTPChallenge />}
        />

   



        {/* 404 Page */}
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
