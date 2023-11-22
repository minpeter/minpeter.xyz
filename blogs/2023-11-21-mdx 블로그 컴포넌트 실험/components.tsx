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
      {toggle
        ? "You pushed me!!"
        : count >= 5
        ? "Assertive - csy "
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

  if (!ip) {
    return <div>Loading...</div>;
  }

  return <div className="text-white">Your IP: {ip}</div>;
}
