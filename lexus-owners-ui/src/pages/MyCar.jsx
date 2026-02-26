import Header from "../components/Header";

export default function MyCar() {
    const user = JSON.parse(localStorage.getItem("user"));

    const brochureMap = {
        LX: "https://heyzine.com/flip-book/78a93d8ca6.html",
        RX_350: "https://heyzine.com/flip-book/08e87f3b55.html",
        RX_HYBRID: "https://heyzine.com/flip-book/82883d2628.html",
        NX: "https://heyzine.com/flip-book/0faf118dd8.html",
        GX: "https://heyzine.com/flip-book/b2bfd2fd3b.html",
    };

    const getModelKey = (model = "") => {
        const m = model.toUpperCase();
        if (m.includes("RX") && (m.includes("500H") || m.includes("350H"))) return "RX_HYBRID";
        if (m.includes("RX") && m.includes("350")) return "RX_350";
        if (m.includes("LX")) return "LX";
        if (m.includes("NX")) return "NX";
        if (m.includes("GX")) return "GX";
        return null;
    };

    const modelKey = getModelKey(user?.model);
    const brochureUrl = modelKey ? brochureMap[modelKey] : null;

    return (
        <div style={styles.page}>
            <Header />

            <div style={styles.container}>
                {/* HERO */}
                <div style={styles.hero}>
                    <h1 style={styles.title}>Хэрэглэгчийн гарын авлага</h1>
                    <p style={styles.model}>{user?.model}</p>
                    <div style={styles.divider} />
                </div>

                {/* CONTENT */}
                {brochureUrl ? (
                    <div style={styles.viewerWrap}>
                        <iframe
                            src={brochureUrl}
                            allow="clipboard-write"
                            allowFullScreen
                            scrolling="no"
                            style={styles.iframe}
                            title="Lexus Owner Manual"
                        />
                    </div>
                ) : (
                    <div style={styles.empty}>
                        <p>Таны автомашины гарын авлага удахгүй нэмэгдэнэ</p>
                        <span>{user?.model}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ================= STYLES ================= */

const styles = {
    page: {
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111 0%, #000 60%)",
        color: "#fff",
        fontFamily: "Montserrat, sans-serif",
    },

    container: {
        maxWidth: 1280,
        margin: "0 auto",
        padding: "70px 40px",
    },

    hero: {
        marginBottom: 40,
    },

    title: {
        fontSize: 42,
        fontWeight: 600,
        letterSpacing: 1,
        marginBottom: 6,
    },

    model: {
        fontSize: 16,
        opacity: 0.6,
        letterSpacing: 1,
        textTransform: "uppercase",
    },

    divider: {
        marginTop: 24,
        width: 80,
        height: 2,
        background: "rgba(255,255,255,0.2)",
    },

    viewerWrap: {
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
    },

    iframe: {
        width: "100%",
        height: "82vh",
        border: "none",
        background: "#fff",
    },

    empty: {
        border: "1px dashed rgba(255,255,255,0.25)",
        borderRadius: 20,
        padding: 80,
        textAlign: "center",
        opacity: 0.8,
    },
};
