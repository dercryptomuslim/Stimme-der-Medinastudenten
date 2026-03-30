import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("TidyCal Webhook received:", JSON.stringify(body, null, 2));

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    // Standard-Tab für Buchungen, falls nicht anders konfiguriert
    const sheetTabNameBookings = process.env.GOOGLE_SHEET_TAB_NAME_BOOKINGS || "Bookings";

    // --- Private Key Normalisierung (wie in leads/route.ts) ---
    if (privateKey) {
      privateKey = privateKey.replace(/^"|"$/g, '');
      privateKey = privateKey.replace(/\\n/g, "\n");
      if (!privateKey.startsWith("-----BEGIN PRIVATE KEY-----") && !privateKey.endsWith("-----END PRIVATE KEY-----")) {
        privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
      }
    }

    if (!sheetId || !serviceAccountEmail || !privateKey) {
      console.error("Missing Google Sheets credentials for Webhook");
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
    }

    // --- Google Auth ---
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ auth, version: "v4" });

    // --- Daten extrahieren ---
    // TidyCal Payload Struktur kann variieren, wir versuchen das Beste zu extrahieren
    // Typische Felder: starts_at, ends_at, name (Meeting), person { name, email }
    
    const bookingDate = new Date().toLocaleString("de-DE", { timeZone: "Asia/Riyadh" });
    const meetingStart = body.starts_at ? new Date(body.starts_at).toLocaleString("de-DE", { timeZone: "Asia/Riyadh" }) : "-";
    
    // Personendaten
    const personName = body.person?.name || body.name || "Unbekannt";
    const personEmail = body.person?.email || body.email || "Unbekannt";
    
    // Meeting Details
    const meetingTitle = body.type?.title || body.name || "Buchung"; // Manchmal ist 'name' der Meeting-Titel im Root
    
    // Row zusammenstellen
    const row = [
      bookingDate,      // Wann wurde der Webhook empfangen (ca. Buchungszeitpunkt)
      meetingStart,     // Wann findet der Termin statt
      personName,
      personEmail,
      meetingTitle,
      JSON.stringify(body) // Raw Dump zur Sicherheit / Debugging
    ];

    // --- In Google Sheet schreiben ---
    
    // Hilfsfunktion zum Appenden
    const appendToTab = async (tabName: string, dataRow: string[]) => {
      const endColumn = String.fromCharCode(64 + dataRow.length); 
      const range = `${tabName}!A:${endColumn}`;
      return await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [dataRow] },
      });
    };

    let sheetResponse;
    try {
      sheetResponse = await appendToTab(sheetTabNameBookings, row);
    } catch (err: any) {
      console.error(`Error appending to sheet tab "${sheetTabNameBookings}":`, err);
      // Fallback: Wenn Tab nicht existiert, erstellen wir ihn (optional) oder loggen nur
      // Hier versuchen wir keinen Fallback auf "Sheet1", um Datenmüll zu vermeiden.
      return NextResponse.json({ success: false, error: `Could not write to tab ${sheetTabNameBookings}. Check if it exists.` }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Booking recorded" });

  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
