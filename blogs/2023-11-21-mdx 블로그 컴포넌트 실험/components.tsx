export const a = 1;

import { useEffect, useState } from "react";

export const B = () => {
  return <div>asdfasdf</div>;
};

export function C() {
  return (
    <h1 className="flex flex-row font-bold text-3xl sm:text-4xl lg:text-5xl">
      hello? i am C component
    </h1>
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
