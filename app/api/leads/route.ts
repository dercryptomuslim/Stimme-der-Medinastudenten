import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  topic?: string;
}

function normalizePrivateKey(raw?: string) {
  if (!raw) return undefined;
  let key = raw.trim();

  // Remove surrounding quotes if the env var was pasted with quotes
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Vercel often stores newlines as literal \n
  key = key.replace(/\\n/g, "\n");
  // Normalize Windows line endings just in case
  key = key.replace(/\r\n/g, "\n");

  // If someone pasted only the base64 body (without PEM header/footer), try to wrap it.
  if (!key.includes("BEGIN") && !key.includes("END")) {
    const compact = key.replace(/\s+/g, "");
    if (/^[A-Za-z0-9+/=]+$/.test(compact) && compact.length > 0) {
      const lines = compact.match(/.{1,64}/g)?.join("\n") ?? compact;
      key = `-----BEGIN PRIVATE KEY-----\n${lines}\n-----END PRIVATE KEY-----\n`;
    }
  }

  return key;
}

function columnLetter(colIndex: number) {
  // 1 -> A, 26 -> Z, 27 -> AA
  let n = colIndex;
  let s = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function getGoogleErrorMessage(err: unknown): string {
  if (typeof err !== "object" || err === null) return String(err);
  const e = err as {
    response?: { data?: { error?: { message?: string } } };
    errors?: Array<{ message?: string }>;
    message?: string;
  };
  return (
    e.response?.data?.error?.message ||
    e.errors?.[0]?.message ||
    e.message ||
    "Unknown Google Sheets error"
  );
}

function escapeHtml(value: string) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY);
    const sheetTabName =
      process.env.GOOGLE_SHEET_TAB_NAME_CONTACT ||
      process.env.GOOGLE_SHEET_TAB_NAME ||
      "Sheet1";
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom =
      process.env.RESEND_FROM ||
      "Stimme der Medinastudenten <onboarding@resend.dev>";
    const resendTo = process.env.RESEND_TO || "kontakt@stimme-medinastudenten.de";

    if (!sheetId || !serviceAccountEmail || !privateKey) {
      console.error("Missing Google Sheets env vars:", {
        GOOGLE_SHEET_ID: Boolean(sheetId),
        GOOGLE_SERVICE_ACCOUNT_EMAIL: Boolean(serviceAccountEmail),
        GOOGLE_PRIVATE_KEY: Boolean(privateKey),
      });
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    // Daten normalisieren
    const fullName =
      body.name ||
      [body.firstName, body.lastName].filter(Boolean).join(" ") ||
      "";
    const email = body.email || "";
    const message = body.message || "";
    const type = body.topic || "Kontaktanfrage";

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, E-Mail und Nachricht sind erforderlich." },
        { status: 400 }
      );
    }

    // Authentifizierung mit Google Service Account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ auth, version: "v4" });

    // Datum formatieren (Saudi-Arabien)
    const date = new Date().toLocaleString("de-DE", { timeZone: "Asia/Riyadh" });

    const row = [date, fullName, email, type, message];
    const rangeEnd = columnLetter(row.length);

    const appendToTab = async (tabName: string) => {
      return await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${tabName}!A:${rangeEnd}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [row],
        },
      });
    };

    let response;
    let usedTabName = sheetTabName;
    try {
      response = await appendToTab(sheetTabName);
    } catch (err: unknown) {
      const msg = getGoogleErrorMessage(err);
      const shouldFallback =
        msg.includes("Unable to parse range") ||
        msg.includes("Requested entity was not found") ||
        msg.includes("No grid with id") ||
        msg.includes("not found");

      if (!shouldFallback) throw err;

      // Fallback: Tab automatisch ermitteln (häufig heißt er "Tabelle1" statt "Sheet1")
      const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
      const firstTab =
        meta.data.sheets?.[0]?.properties?.title ||
        meta.data.properties?.title ||
        "";

      if (!firstTab || firstTab === sheetTabName) throw err;

      usedTabName = firstTab;
      response = await appendToTab(firstTab);
    }

    // E-Mail Benachrichtigung (Resend) – darf Lead-Erfassung nicht blockieren
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        const subject = `Neue Anfrage: ${type} – ${fullName}`;
        const html = `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5;">
            <h2 style="margin: 0 0 12px;">Neue Kontaktanfrage</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
              <tr><td style="padding: 6px 0; width: 180px;"><strong>Datum (KSA)</strong></td><td style="padding: 6px 0;">${date}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Name</strong></td><td style="padding: 6px 0;">${escapeHtml(fullName)}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>E-Mail</strong></td><td style="padding: 6px 0;">${escapeHtml(email)}</td></tr>
              <tr><td style="padding: 6px 0;"><strong>Typ</strong></td><td style="padding: 6px 0;">${escapeHtml(type)}</td></tr>
            </table>
            <h3 style="margin: 18px 0 8px;">Nachricht</h3>
            <pre style="white-space: pre-wrap; background: #f6f7f8; padding: 12px; border-radius: 10px;">${escapeHtml(message)}</pre>
            <p style="margin-top: 14px; color: #6b7280;">
              Hinweis: Die Anfrage wurde bereits in Google Sheets gespeichert.
            </p>
          </div>
        `;

        await resend.emails.send({
          from: resendFrom,
          to: [resendTo],
          subject,
          html,
          replyTo: email,
        });
      } catch (mailError) {
        console.error("Resend Error:", mailError);
      }
    }

    return NextResponse.json({ success: true, data: response.data, usedTabName });
  } catch (error: unknown) {
    console.error("Google Sheets Error:", error);
    const msg =
      error instanceof Error ? error.message : "Unknown server error";
    if (
      msg.includes("DECODER routines::unsupported") ||
      msg.includes("error:1E08010C") ||
      msg.toLowerCase().includes("unsupported")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Server configuration error: GOOGLE_PRIVATE_KEY is invalid/unparseable. Please paste the full private_key (including -----BEGIN PRIVATE KEY-----) and keep line breaks as \\n in Vercel.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
