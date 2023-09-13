import { createHmac } from "crypto";
import { NextResponse, NextRequest } from "next/server";

const { CORD_SECRET } = process.env;

/**
 * This API route is the starting point for using our Events Webhook.
 * Events Webhook lets you write code that runs when something happens in cord.
 * See https://docs.cord.com/reference/events-webhook
 *
 * The code below only verifies the event signature; you can now modifiy it to handle events.
 *
 * To enable events webhook you need to:
 * 1. Go to the console https://console.cord.com/
 * 2. Open your `App Settings` and go to the `Events` tab.
 * 3. Use a tool to expose your app to the internet (like `ngrok`).
 * 4. Enter `<your ngrok app url>/events` in `Webhook URL` and save. You should get a confirmation.
 * 5. Enable 1 or more event subscriptions.
 **/
export async function POST(request: NextRequest) {
  if (!CORD_SECRET) {
    throw new Error(
      "Missing CORD_SECRET env variable. Get it on console.cord.com and add it to .env"
    );
  }
  const cordTimestamp = request.headers.get("X-Cord-Timestamp");
  const cordSignature = request.headers.get("X-Cord-Signature");

  const payload = await request.json();
  const bodyString = JSON.stringify(payload);
  const verifyStr = cordTimestamp + ":" + bodyString;
  const hmac = createHmac("sha256", CORD_SECRET);
  hmac.update(verifyStr);
  const incomingSignature = hmac.digest("base64");

  if (cordSignature !== incomingSignature) {
    throw new Error(`Unable to verify signature  ${verifyStr}`);
  } else {
    // process event
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
