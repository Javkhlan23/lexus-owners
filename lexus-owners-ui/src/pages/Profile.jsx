import Header from "../components/Header";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <>
        <Header />
        <div style={{ padding: 60, color: "#fff" }}>
          Нэвтрээгүй байна
        </div>
      </>
    );
  }

  return (
    <div style={styles.page}>
      <Header />

      <div style={styles.container}>
        {/* TITLE */}
        <h1 style={styles.title}>Миний профайл</h1>
        <p style={styles.subtitle}>
          Lexus Owners систем дэх таны бүртгэл
        </p>

        {/* PROFILE CARD */}
        <div style={styles.card}>
          {/* HEADER */}
          <div style={styles.cardHeader}>
            <div>
              <p style={styles.name}>
                {user.lastname} {user.firstname}
              </p>
              <p style={styles.model}>{user.model}</p>
            </div>

            <span
              style={{
                ...styles.badge,
                background:
                  user.membership?.toLowerCase().includes("хүчинтэй")
                    ? "#ffffff"
                    : "rgba(255,255,255,0.2)",
                color:
                  user.membership?.toLowerCase().includes("хүчинтэй")
                    ? "#000"
                    : "#fff",
              }}
            >
              {user.membership || "—"}
            </span>
          </div>

          {/* INFO GRID */}
          <div style={styles.grid}>
            <Info label="VIN дугаар" value={user.vin} />
            <Info label="Эзэмшигч болсон огноо" value={user.ownerDate || "—"} />
            <Info label="Утасны дугаар" value={user.phone} />
            <Info label="Email" value={user.email || "—"} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function Info({ label, value }) {
  return (
    <div style={styles.infoItem}>
      <p style={styles.infoLabel}>{label}</p>
      <p style={styles.infoValue}>{value}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    fontFamily: "Montserrat, sans-serif",
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "60px 40px",
  },

  title: {
    fontSize: 40,
    fontWeight: 600,
    marginBottom: 8,
    letterSpacing: 1,
  },

  subtitle: {
    opacity: 0.65,
    marginBottom: 50,
    fontSize: 14,
  },

  card: {
    background: "linear-gradient(180deg,#141414,#0b0b0b)",
    borderRadius: 24,
    padding: 40,
    border: "1px solid rgba(255,255,255,0.08)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },

  name: {
    fontSize: 26,
    fontWeight: 500,
    marginBottom: 6,
  },

  model: {
    fontSize: 14,
    opacity: 0.7,
    letterSpacing: 1,
  },

  badge: {
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 28,
  },

  infoItem: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: 20,
  },

  infoLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: 500,
  },
};
