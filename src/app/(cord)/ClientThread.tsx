"use client";

import { PagePresence, Thread } from "@cord-sdk/react";

/**
 * We are adding page presence and a thread.
 * You can add more collaboration features such as comments or multiple cursors! See our [components](https://docs.cord.com/components).
 **/
export default function ClientThread() {
  return (
    <div className="cord-app">
      <PagePresence />
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
            manage all the data for you,&nbsp;
          </li>
          <li>
            <a href="https://docs.cord.com/rest-apis">REST APIs</a>, and{" "}&nbsp;
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
