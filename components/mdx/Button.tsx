"use client";

import { useState } from "react";

export default function Button() {
  const [toggle, setToggle] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    if (clickCount < 4) {
      setToggle(!toggle);
    }
  };

  return (
    <button className="bg-slate-700 rounded-md px-4 py-2" onClick={handleClick}>
      {clickCount >= 5
        ? "어쩔 티비 - 서윤"
        : toggle
        ? "You pushed me!!"
        : "Push Me :)"}
    </button>
  );
}
