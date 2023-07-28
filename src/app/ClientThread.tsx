"use client";

import { PagePresence, Thread } from "@cord-sdk/react";

export default function ClientThread() {
  return (
    <div style={{ margin: "30px auto", maxWidth: "500px" }}>
      <PagePresence />
      <p>Let&apos;s get Cord-y!</p>
      <Thread threadId="a-first-conversation" />
    </div>
  );
}
