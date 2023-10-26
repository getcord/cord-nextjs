import { CORD_USER_COOKIE, USERS } from "@/consts";
import ClientThread from "./ClientThread";
import { cookies } from "next/headers";
async function getData() {
  const userIdCookie = cookies().get(CORD_USER_COOKIE)?.value;
  const userIndex =
    USERS.findIndex((user) => user.user_id === userIdCookie) ?? 0;
  return { users: USERS.map((user) => user.user_id), userIndex };
}

export default async function HomeWithThread() {
  const { users, userIndex } = await getData();
  return <ClientThread users={users} userIndex={userIndex} />;
}
