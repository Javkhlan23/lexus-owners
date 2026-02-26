import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fullPhone = "976" + phone;

  // 1️⃣ утас шалгах
  const checkPhone = async () => {
    setError("");
    const res = await fetch(
      `http://localhost:4000/check-phone?phone=${fullPhone}`
    );
    const data = await res.json();

    if (!data.success) {
      setError("Бүртгэлгүй дугаар");
      return;
    }

    await fetch(
      `http://localhost:4000/send-otp?phone=${fullPhone}`
    );

    setStep(2);
  };

  // 2️⃣ OTP шалгах
  const verifyOtp = async () => {
    const res = await fetch(
      `http://localhost:4000/verify-otp?phone=${fullPhone}&otp=${otp}`
    );
    const data = await res.json();

    if (!data.success) {
      setError("OTP буруу");
      return;
    }

    navigate("/profile?phone=" + fullPhone);
  };

  return (
    <div style={{ color: "#fff" }}>
      <h2>LEXUS OWNERS</h2>

      {step === 1 && (
        <>
          <div>
            +976{" "}
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="99112222"
            />
          </div>
          <button onClick={checkPhone}>Код авах</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP код"
          />
          <button onClick={verifyOtp}>Нэвтрэх</button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
