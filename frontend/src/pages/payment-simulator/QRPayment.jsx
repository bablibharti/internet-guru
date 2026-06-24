import { useState } from "react";
import "./QRPayment.css";


function QRPayment() {
const [amount, setAmount] = useState("");
const [paid, setPaid] = useState(false);

const handlePayment = () => {
if (!amount) {
alert("Enter amount first");
return;
}


setTimeout(() => {
  setPaid(true);
}, 1500);


};

return ( <div className="qr-page"> <div className="phone-frame">


    <div className="upi-header">
      <h2>📱 UPI Payment</h2>
    </div>

    <div className="merchant-section">
      <div className="merchant-avatar">
        🏪
      </div>

      <h3>ABC General Store</h3>

      <p>Mumbai Merchant</p>
    </div>

    <div className="qr-container">
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=UPI-PAYMENT-DEMO"
        alt="QR Code"
      />
    </div>

    <div className="amount-box">
      <label>Enter Amount</label>

      <input
        type="number"
        placeholder="₹ 100"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />
    </div>

    {!paid ? (
      <button
        className="pay-btn"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    ) : (
      <div className="success-card">
        <h2>✅ Payment Successful</h2>

        <p>
          ₹ {amount} paid successfully
        </p>

        <p>
          Transaction ID:
          {" "}
          TXN{Math.floor(
            Math.random() * 999999
          )}
        </p>

        <div className="reward">
          ⭐ +50 XP Earned
        </div>
      </div>
    )}

    <div className="learning-box">
      <h3>💡 Learning Point</h3>

      <p>
        Always verify the merchant name
        before making a payment.
      </p>
    </div>

  </div>
</div>


);
}

export default QRPayment;
