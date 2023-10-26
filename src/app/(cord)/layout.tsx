import { getClientAuthToken } from "@cord-sdk/server";
import { cookies } from "next/headers";
import CordIntegration from "./CordIntegration";
import "./cord.css";
import "./cord-app.css";
import { CORD_USER_COOKIE, ORG_ID, USERS } from "@/consts";

export async function getData() {
  const { CORD_SECRET, CORD_APP_ID } = process.env;
  if (!CORD_SECRET || !CORD_APP_ID) {
    console.error(
      "Missing CORD_SECRET or CORD_ORD_ID env variable. Get it on console.cord.com and add it to .env",
    );
    return { clientAuthToken: null, users: [], userIndex: -1 };
  }

  const userIdCookie = cookies().get(CORD_USER_COOKIE)?.value;
  let userIndex = Math.max(
    0,
    USERS.findIndex((user) => user.user_id === userIdCookie),
  );
  const user = USERS[userIndex];

  const clientAuthToken = getClientAuthToken(CORD_APP_ID, CORD_SECRET, {
    ...user,
    // By supplying the `organization_details` object, just like the user,
    // Cord will create the organization on-the-fly.
    organization_details: {
      name: user.organization_id,
    },
  });
  return {
    clientAuthToken,
  };
}

export default async function CordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { clientAuthToken } = await getData();
  return (
    <CordIntegration clientAuthToken={clientAuthToken}>
      {children}
    </CordIntegration>
  );
}
