"use client";

import { CORD_USER_COOKIE } from "@/consts";
import { LiveCursors, PagePresence, Thread } from "@cord-sdk/react";
import { useEffect, useMemo, useState } from "react";

/**
 * We are adding page presence and a thread.
 * You can add more collaboration features, see our [components](https://docs.cord.com/components).
 **/
export default function ClientThread({
  users,
  userIndex,
}: {
  users: string[];
  userIndex: number;
}) {
  const [location, setLocation] = useState<null | { location: string }>();
  useEffect(() => setLocation({ location: window?.location.pathname }), []);
  return (
    <div className="cord-app">
      <div className="row">
        <ChangeUser users={users} userIndex={userIndex} />
        {location && (
          <>
            <LiveCursors location={location} />
            <PagePresence location={location} />
          </>
        )}
      </div>
      <h1>Let&apos;s get Cordy!</h1>
      <Thread threadId="a-first-conversation" />
      <CordInfo />
    </div>
  );
}

function CordInfo() {
  return (
    <div className="cord-info">
      <p className="get-started">
        Edit <code>app/_cord._index.tsx</code>
      </p>
      <p>
        Try opening this page in multiple windows, side by side.
      </p>
      <div className="cord-CTA">
        <a href="https://docs.cord.com">View our docs</a> or{" "}
        <a className="secondary" href="https://console.cord.com">
          manage your app
        </a>
      </div>
      <div className="cord-gives">
        <span>Cord gives you a</span>{" "}
        <ul>
          <li>
            <a href="https://docs.cord.com/components">
              rich UI Component Library
            </a>
            ,&nbsp;
          </li>
          <li>
            <a href="https://docs.cord.com/js-apis-and-hooks">
              a client-side SDK for real-time features
            </a>
            ,&nbsp;
          </li>
          <li>
            <a href="https://docs.cord.com/rest-apis">REST APIs</a>, and &nbsp;
          </li>
          <li>
            <a href="https://docs.cord.com/reference/events-webhook">
              webhook events
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  );
}

function ChangeUser({
  users,
  userIndex,
}: {
  users: string[];
  userIndex: number;
}) {
  return (
    <label className="change-user">
      Change user
      <select
        value={users[userIndex]}
        onChange={(e) => {
          const newUserID = e.target.value;
          document.cookie = `${CORD_USER_COOKIE}=${newUserID};`;
          document.location.reload();
        }}
      >
        {users.map((user, idx) => (
          <option key={idx} value={user}>
            {user}
          </option>
        ))}
      </select>
    </label>
  );
}
