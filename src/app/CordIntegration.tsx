"use client";

import { CordProvider } from "@cord-sdk/react";

type Props = {
  clientAuthToken: string | null;
  users: string[];
  userIndex: number;
};
const CordIntegration = ({
  clientAuthToken,
  users,
  userIndex,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <div>
      {clientAuthToken ? (
        <CordProvider clientAuthToken={clientAuthToken}>
          <ChangeUser users={users} userIndex={userIndex} />
          {children}
        </CordProvider>
      ) : (
        <div id="setup-cord">
          <p>You need your key first!</p>
          <ol>
            <li>
              Visit <a href="https://console.cord.com">the cord console</a> to
              get an API key.
            </li>
            <li>Create a .env file.</li>
            <li>Paste your Application ID and Secret in it.</li>
            <pre>{`CORD_APP_ID=<Application ID>
CORD_SECRET=<Secret>`}</pre>
            <li>Restart your remix</li>
          </ol>
        </div>
      )}
    </div>
  );
};

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
        value={userIndex}
        onChange={(e) => {
          const newUserIndex = e.target.value;
          const searchParams = new URLSearchParams(location.search);
          searchParams.set("userIndex", newUserIndex);
          location.search = searchParams.toString();
        }}
      >
        {users.map((user, idx) => (
          <option key={idx} value={idx}>
            {user}
          </option>
        ))}
      </select>
    </label>
  );
}

export default CordIntegration;
