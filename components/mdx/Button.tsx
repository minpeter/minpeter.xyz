"use client";

import { useState } from "react";

export default function Button() {
  const [toggle, setToggle] = useState(false);

  return (
    <button
      className="bg-slate-700 rounded-md px-4 py-2"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? "Push Me :)" : "You pushed me!!"}
    </button>
  );
}
