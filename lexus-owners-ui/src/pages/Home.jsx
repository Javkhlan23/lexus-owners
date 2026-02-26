import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();

  // 🔒 localStorage-оос user-ийг АЮУЛГҮЙ уншина
  const rawUser = JSON.parse(localStorage.getItem("user")) || {};
  const user = {
    firstname: rawUser.firstname || "Хэрэглэгч",
    lastname: rawUser.lastname || "",
    model: rawUser.model || "",
    vin: rawUser.vin || "",
    membership: rawUser.membership || "",
  };

  return (
    <div style={styles.page}>
      <Header />

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <p style={styles.welcome}>
            Тавтай морил, {user.firstname}
          </p>

          <h1 style={styles.title}>LEXUS OWNERS</h1>

          {user.model && (
            <p style={styles.subtitle}>
              {user.model} • VIN: {user.vin}
            </p>
          )}

          {user.membership && (
            <span style={styles.badge}>
              {user.membership}
            </span>
          )}
        </div>
      </section>

      {/* ACTION CARDS */}
      <section style={styles.actions}>
        <Action
          title="Миний Lexus"
          desc="Автомашины дэлгэрэнгүй мэдээлэл"
          onClick={() => navigate("/mycar")}
        />
        <Action
          title="Үйлчилгээ"
          desc="Засвар, баталгаат үйлчилгээ"
          onClick={() => navigate("/service")}
        />
        <Action
          title="Урамшуулал"
          desc="Онцгой санал, эвент"
          onClick={() => navigate("/promo")}
        />
      </section>

      <footer style={styles.footer}>
        © 2026 Lexus Munkhada Owners
      </footer>
    </div>
  );
}

function Action({ title, desc, onClick }) {
  return (
    <div
      style={styles.card}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{desc}</p>
      <span style={styles.cardLink}>Дэлгэрэнгүй →</span>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#0b0b0b",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "Montserrat, sans-serif",
  },

  hero: {
    height: "60vh",
    backgroundImage: "url(/RX.jpg)", // public/RX.jpg
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)", // хэт хар биш
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
  },

  welcome: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },

  title: {
    fontSize: 48,
    letterSpacing: 8,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    opacity: 0.85,
    marginBottom: 14,
  },

  badge: {
    padding: "6px 14px",
    borderRadius: 20,
    background: "#fff",
    color: "#000",
    fontSize: 12,
    fontWeight: 600,
  },

  actions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
    padding: "60px 80px",
  },

  card: {
    background: "linear-gradient(180deg,#141414,#0b0b0b)",
    borderRadius: 18,
    padding: 28,
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },

  cardTitle: {
    marginBottom: 8,
    fontWeight: 500,
  },

  cardDesc: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },

  cardLink: {
    fontSize: 13,
    opacity: 0.8,
  },

  footer: {
    textAlign: "center",
    padding: 40,
    fontSize: 12,
    opacity: 0.4,
  },
};
