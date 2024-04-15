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
        <section className="cord-setup">
          <p>Welcome to Cord&apos;s Next starter template</p>
          <h1>Time to get your API key</h1>
          <ol>
            <li>
              <a href="https://console.cord.com">Create a free Cord account</a>{" "}
              to get your API key.
            </li>
            <li>Create a .env file.</li>
            <li>Paste your Cord Project ID and Secret in your .env file</li>
            <pre>{`CORD_PROJECT_ID=<Project ID>
CORD_SECRET=<Secret>`}</pre>
            <li>
              Restart your Next app<pre>npm run dev</pre>
            </li>
          </ol>
        </section>
      )}
    </div>
  );
};

export default CordIntegration;
