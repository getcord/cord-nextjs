import { getClientAuthToken, getServerAuthToken } from "@cord-sdk/server";
import { cookies } from "next/headers";
import CordIntegration from "./CordIntegration";
import "./cord.css";
import "./cord-app.css";
import { CORD_USER_COOKIE, GROUP_ID, USERS } from "@/consts";

async function getData() {
  const { CORD_SECRET, CORD_PROJECT_ID } = process.env;
  if (!CORD_SECRET || !CORD_PROJECT_ID) {
    console.error(
      "Missing CORD_SECRET or CORD_PROJECT_ID env variable. Get it on console.cord.com and add it to .env"
    );
    return { clientAuthToken: null, users: [], userIndex: -1 };
  }

  const userIdCookie = cookies().get(CORD_USER_COOKIE)?.value;
  let userIndex = Math.max(
    0,
    USERS.findIndex((user) => user.user_id === userIdCookie)
  );

  await createAndPopulateGroup();
  const user = USERS[userIndex];
  const clientAuthToken = getClientAuthToken(CORD_PROJECT_ID, CORD_SECRET, {
    ...user,
  });
  return {
    clientAuthToken,
  };
}

/**
 * Creates a group and users and adds all users to it.
 *
 * In a real app, you would do this only once.
 **/
async function createAndPopulateGroup() {
  const { CORD_SECRET, CORD_PROJECT_ID } = process.env;
  if (!CORD_SECRET || !CORD_PROJECT_ID) {
    console.error(
      "Missing CORD_SECRET or CORD_PROJECT_ID env variable. Get it on console.cord.com and add it to .env"
    );
    return;
  }
  const serverAuthToken = getServerAuthToken(CORD_PROJECT_ID, CORD_SECRET);

  const groupBody = JSON.stringify({ name: GROUP_ID });
  await fetch(`https://api.cord.com/v1/groups/${GROUP_ID}`, {
    method: "PUT",
    body: groupBody,
    headers: {
      Authorization: `Bearer ${serverAuthToken}`,
      "Content-Type": "application/json",
    },
  });

  // creates users
  await Promise.all(
    USERS.map((user) => {
      const userBody = JSON.stringify(user.user_details);
      fetch(`https://api.cord.com/v1/users/${user.user_id}`, {
        method: "PUT",
        body: userBody,
        headers: {
          Authorization: `Bearer ${serverAuthToken}`,
          "Content-Type": "application/json",
        },
      });
    })
  );

  // assign user to group
  const memberBody = JSON.stringify({ add: USERS.map((user) => user.user_id) });
  await fetch(`https://api.cord.com/v1/groups/${GROUP_ID}/members`, {
    method: "POST",
    body: memberBody,
    headers: {
      Authorization: `Bearer ${serverAuthToken}`,
      "Content-Type": "application/json",
    },
  });
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
