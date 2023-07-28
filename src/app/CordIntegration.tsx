"use client";

import { CordProvider } from "@cord-sdk/react";

type Props = {
  clientAuthToken: string | null;
};
const CordIntegration = ({
  clientAuthToken,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <div>
      {clientAuthToken ? (
        <CordProvider clientAuthToken={clientAuthToken}>
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
            <li>Restart your next.js</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default CordIntegration;
