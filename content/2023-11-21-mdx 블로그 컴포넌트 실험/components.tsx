import { useEffect, useState } from "react";

export function Button() {
  const [toggle, setToggle] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <button
      className="bg-slate-700 rounded-md px-4 py-2"
      onClick={() => {
        setToggle(!toggle);
        setCount(count + 1);
      }}
    >
      {count >= 5
        ? "Assertive - 서윤 "
        : toggle
        ? "You pushed me!!"
        : "Push me!!"}
    </button>
  );
}

export function Ip() {
  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://ip.minpeter.tech/ip").then((res) =>
      res.text().then((ip) => setIp(ip))
    );
  }, []);

  return <div className="text-white">Your IP: {ip ? ip : "Loading..."}</div>;
}

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="text-white">
        Count: {count}
        {count == 82 || count == 802 ? " - 🩷" : ""}
      </div>
      <button
        className="bg-slate-700 rounded-md px-4 py-2"
        onClick={() => setCount(count + 1)}
      >
        Count Up
      </button>
      <button className="px-4 py-2" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}
