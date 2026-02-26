import Header from "../components/Header";

export default function Promo() {
    return (
        <div style={styles.page}>
            <Header />

            <div style={styles.container}>
                <h1 style={styles.title}>Урамшуулал & Онцгой санал</h1>
                <p style={styles.subtitle}>
                    Lexus эзэмшигч танд зориулсан тусгай хөнгөлөлт, эвентүүд
                </p>

                <div style={styles.grid}>
                    <PromoCard
                        title="Өвлийн оношилгооны аян"
                        desc="Явах эд анги, хөдөлгүүр, батарей, электроник бүрэн оношилгоо"
                        badge="Идэвхтэй"
                    />

                    <PromoCard
                        title="Урсгал үйлчилгээний хөнгөлөлт"
                        desc="Гишүүдэд зориулсан урсгал үйлчилгээний тусгай нөхцөл"
                        badge="Гишүүдэд"
                    />

                    <PromoCard
                        title="Lexus Owners эвент"
                        desc="Онцгой арга хэмжээ, хаалттай уулзалт, тест драйв"
                        badge="Тун удахгүй"
                    />

                    <PromoCard
                        title="Нэмэлт бонус"
                        desc="Үнэгүй check-up, кофе, жижиг урамшууллууд"
                        badge="Bonus"
                    />
                </div>
            </div>
        </div>
    );
}

/* ================= COMPONENT ================= */

function PromoCard({ title, desc, badge }) {
    return (
        <div style={styles.card}>
            <div style={styles.cardHeader}>
                <span style={styles.badge}>{badge}</span>
            </div>

            <h3 style={styles.cardTitle}>{title}</h3>
            <p style={styles.cardDesc}>{desc}</p>

            <span style={styles.cardLink}>Дэлгэрэнгүй →</span>
        </div>
    );
}

/* ================= STYLES ================= */

const styles = {
    page: {
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#fff",
        fontFamily: "Montserrat, sans-serif",
    },

    container: {
        maxWidth: 1200,
        margin: "0 auto",
        padding: "60px 40px",
    },

    title: {
        fontSize: 42,
        fontWeight: 500,
        letterSpacing: 2,
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 50,
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 28,
    },

    card: {
        background: "linear-gradient(180deg,#141414,#0b0b0b)",
        borderRadius: 20,
        padding: 28,
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "all 0.25s ease",
        cursor: "pointer",
    },

    cardHeader: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 12,
    },

    badge: {
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 12,
        background: "#fff",
        color: "#000",
        fontWeight: 600,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 500,
        marginBottom: 10,
    },

    cardDesc: {
        fontSize: 14,
        opacity: 0.75,
        lineHeight: 1.6,
        marginBottom: 20,
    },

    cardLink: {
        fontSize: 13,
        opacity: 0.8,
    },
};
