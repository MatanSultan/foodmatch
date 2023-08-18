import Head from "next/head";
import { useState } from "react";
import Nav from "../components/Nav";
import Timer from "../components/Timer";

function timer() {
  return (
    <>
      <Nav />

      <div className="max-w-screen-md mx-auto px-4 ">
        <Head>
          <title>Do a Timer</title>
        </Head>

        <Timer className="mt-9" />
      </div>
    </>
  );
}

export default timer;
