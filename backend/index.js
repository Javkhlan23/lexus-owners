import express from "express";
import cors from "cors";
import fs from "fs";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const PORT = 4000;
const SHEET_ID = "1mDYRcroBWB9IR7W0mLwa-27qAY9wcaG1Y0RpiT4RU8A";

// ===== GOOGLE SERVICE ACCOUNT =====
const creds = JSON.parse(
    fs.readFileSync("./google-service-account.json", "utf8")
);

// ===== LOAD SHEET =====
async function loadSheet() {
    const auth = new JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, auth);
    await doc.loadInfo();
    return doc;
}

// ===== CHECK PHONE =====
app.get("/check-phone", async (req, res) => {
    const { phone } = req.query;
    if (!phone) return res.json({ success: false });

    try {
        const doc = await loadSheet();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const found = rows.find(
            (r) =>
                String(r.get("Утасны дугаар") || "").trim() ===
                String(phone).trim()
        );

        if (!found) return res.json({ success: false });

        res.json({ success: true });
    } catch (e) {
        console.error("CHECK PHONE ERROR:", e);
        res.json({ success: false });
    }
});

// ===== OTP =====
const otpStore = new Map();

app.get("/send-otp", (req, res) => {
    const { phone } = req.query;
    if (!phone) return res.json({ success: false });

    const otp = "123456"; // mock
    otpStore.set(phone, otp);

    console.log("OTP:", phone, otp);
    res.json({ success: true });
});

// ===== VERIFY OTP =====
app.get("/verify-otp", async (req, res) => {
    const { phone, otp } = req.query;

    if (!otpStore.has(phone)) return res.json({ success: false });
    if (otpStore.get(phone) !== otp) return res.json({ success: false });

    otpStore.delete(phone);

    try {
        const doc = await loadSheet();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const found = rows.find(
            (r) =>
                String(r.get("Утасны дугаар") || "").trim() ===
                String(phone).trim()
        );

        if (!found) return res.json({ success: false });

        // 🔥 НЭРЭЭР НЬ УНШИНА (INDEX-ЭЭС ХАМААРАХГҮЙ)
        const user = {
            model: found.get("Model-Detail") || "",
            vin: found.get("Vin number") || "",
            ownerDate: found.get("Автомашин хүлээлгэн өгсөн огноо") || "",
            lastname: found.get("Овог") || "",
            firstname: found.get("Нэр") || "",
            phone: found.get("Утасны дугаар") || "",
            email: found.get("И-мэйл хаяг") || "",
            membership: found.get("Гишүүнчлэл") || "",
        };

        return res.json({
            success: true,
            user,
        });
    } catch (e) {
        console.error("VERIFY OTP ERROR:", e);
        return res.json({ success: false });
    }
});

// ===== ROOT =====
app.get("/", (req, res) => {
    res.send("Lexus Owners Backend OK 🚗");
});

// ===== START =====
app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});