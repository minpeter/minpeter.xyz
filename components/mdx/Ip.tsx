"use client";

import { useState, useEffect } from "react";

export default function Ip() {
  const [ip, setIp] = useState("");
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ip.minpeter.tech/json", true);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setIp(data.ip);
      }

      setIp("Error, status code: " + xhr.status);
    };
  }, []);

  if (!ip) {
    return <div>Loading...</div>;
  }

  return <div className="text-white">Your IP: {ip}</div>;
}
