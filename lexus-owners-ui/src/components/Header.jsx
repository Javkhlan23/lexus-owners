import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header style={styles.header}>
            <Link to="/home" style={styles.logo}>
                Lexus Owners
            </Link>

            <nav style={styles.nav}>
                <Link to="/home" style={styles.link}>
                    Нүүр
                </Link>
                <Link to="/profile" style={styles.link}>
                    Профайл
                </Link>
            </nav>
        </header>
    );
}

const styles = {
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px",
        background: "#0b0b0b",
    },
    logo: {
        color: "#fff",
        textDecoration: "none",
        fontWeight: 600,
        letterSpacing: 1,
    },
    nav: {
        display: "flex",
        gap: 20,
    },
    link: {
        color: "rgba(255,255,255,0.8)",
        textDecoration: "none",
        fontSize: 14,
    },
};
