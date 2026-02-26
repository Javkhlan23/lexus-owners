import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://lexus-owners-backend.onrender.com";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 1️⃣ УТАС ШАЛГАХ + OTP АВАХ
    const sendOtp = async () => {
        setError("");

        try {
            const res = await fetch(`${API}/check-phone?phone=${phone}`);
            const data = await res.json();

            if (!data.success) {
                setError("Бүртгэлгүй хэрэглэгч");
                return;
            }

            // mock OTP илгээнэ (123456)
            await fetch(`${API}/send-otp?phone=${phone}`);

            setStep(2); // 👉 OTP алхам руу шилжинэ
        } catch (e) {
            setError("Backend-тэй холбогдож чадсангүй");
        }
    };

    // 2️⃣ OTP ШАЛГАХ
    const verifyOtp = async () => {
        setError("");

        try {
            const res = await fetch(
                `${API}/verify-otp?phone=${phone}&otp=${otp}`
            );
            const data = await res.json();

            if (!data.success) {
                setError("OTP код буруу");
                return;
            }

            // ✅ user data backend-ээс ирнэ
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/home");
        } catch {
            setError("Нэвтрэхэд алдаа гарлаа");
        }
    };

    return (
        <div className="center">
            <div className="card">
                <h1>LEXUS OWNERS</h1>

                {/* STEP 1 – УТАС */}
                {step === 1 && (
                    <>
                        <input
                            placeholder="Утасны дугаар"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button onClick={sendOtp}>
                            OTP АВАХ
                        </button>
                    </>
                )}

                {/* STEP 2 – OTP */}
                {step === 2 && (
                    <>
                        <input
                            placeholder="OTP код (123456)"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button onClick={verifyOtp}>
                            НЭВТРЭХ
                        </button>
                    </>
                )}

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );

}
