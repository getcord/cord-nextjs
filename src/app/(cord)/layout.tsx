import { getClientAuthToken } from "@cord-sdk/server";
import CordIntegration from "./CordIntegration";
import "./cord.css";

export async function getData() {
  const { CORD_SECRET, CORD_APP_ID } = process.env;
  if (!CORD_SECRET || !CORD_APP_ID) {
    console.error(
      "Missing CORD_SECRET or CORD_ORD_ID env variable. Get it on console.cord.com and add it to .env"
    );
    return { clientAuthToken: null, users: [], userIndex: -1 };
  }

  const users = [
    {
      // The user ID can be any identifier that makes sense to your application.
      // As long as it's unique per-user, Cord can use it to represent your user.
      user_id: "severusatreides",

      // Same as above. An organization ID can be any unique string. Organizations
      // are groups of users.
      organization_id: "starpotterdunewars",

      // By supplying the  `user_details` object, you can create the user in
      // Cord's backend on-the-fly. No need to pre-sync your users.
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
  const userIndex = Math.round(Math.random() * (users.length - 1));
  const user = users[userIndex];

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
