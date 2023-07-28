import ClientThread from "./ClientThread";
import CordIntegration from "./CordIntegration";
import styles from "./page.module.css";

export async function getData(requestedUserIndex: number) {
  // @ts-ignore I need this here, so it is no included in the client bundle
  // It should not be needed because remix does Server Code Pruning.
  const { getClientAuthToken } = await import("@cord-sdk/server");

  const { CORD_SECRET, CORD_APP_ID } = process.env;
  if (!CORD_SECRET || !CORD_APP_ID) {
    console.error(
      "Missing CORD_SECRET or CORD_ORD_ID env variable. Get it on console.cord.com and add it to .env"
    );
    return { clientAuthToken: null, users: [], userIndex: -1 };
  }
  let userIndex = requestedUserIndex;
  if (userIndex === null || userIndex === undefined || isNaN(userIndex)) {
    userIndex = Math.round(Math.random() * 3);
  }

  const users = [
    {
      // The user ID can be any identifier that makes sense to your application.
      // As long as it's unique per-user, Cord can use it to represent your user.
      user_id: "severusatreides",

      // Same as above. An organization ID can be any unique string. Organizations
      // are groups of users.
      organization_id: "starpotterdunewars",
      user_details: {
        email: "sevvy@arrakis.spice",
        name: "Severus Atreides",
      },
    },
    {
      user_id: "minervahalleck",
      organization_id: "starpotterdunewars",
      user_details: {
        email: "catlady@tattoine.gov",
        name: "Minerva Halleck",
      },
    },
    {
      user_id: "hermioneorgana",
      organization_id: "starpotterdunewars",
      user_details: {
        email: "hermi1979@starfleet.org.terra",
        name: "Hermione Organa",
      },
    },
    {
      user_id: "jarjarmarvolo",
      organization_id: "starpotterdunewars",
      user_details: {
        email: "meesa@lowkey.sith",
        name: "Jar Jar Marvolo",
      },
    },
  ];
  const safeUserIndex = userIndex % users.length;
  const user = users[safeUserIndex];

  const clientAuthToken = getClientAuthToken(CORD_APP_ID, CORD_SECRET, {
    ...user,
    // By supplying the `organization_details` object, just like the user,
    // Cord will create the organization on-the-fly.
    organization_details: {
      name: "starpotterdunewars",
    },
  });
  return {
    clientAuthToken,
    users: users.map((user) => user.user_details.name),
    userIndex: safeUserIndex,
  };
}
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let userIndex = parseInt(searchParams.userIndex ?? "", 10);
  if (isNaN(userIndex)) {
    userIndex = Math.round(Math.random() * 3);
  }
  const { clientAuthToken, users } = await getData(userIndex);
  return (
      <CordIntegration
        clientAuthToken={clientAuthToken}
        users={users}
        userIndex={userIndex}
      >
        <ClientThread />
      </CordIntegration>
  );
}
