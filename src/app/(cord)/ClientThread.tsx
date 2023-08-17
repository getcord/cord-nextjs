"use client";

import { PagePresence, Thread } from "@cord-sdk/react";

/**
 * We are adding page presence and a thread.
 * You can add more collaboration feature, see [components](https://docs.cord.com/components).
 **/
export default function ClientThread() {
  return (
    <div style={{ margin: "30px auto", maxWidth: "500px" }}>
      <PagePresence />
      <p>Let&apos;s get Cord-y!</p>
      <Thread threadId="a-first-conversation" />
    </div>
  );
}
