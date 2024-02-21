import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function SimpleButton() {
  const [toggle, setToggle] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <Button
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
    </Button>
  );
}

export function Ip() {
  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://ip.minpeter.tech/ip").then((res) =>
      res.text().then((ip) => setIp(ip))
    );
  }, []);

  return <span>Your IP: {ip ? ip : "Loading..."}</span>;
}

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-2">
      <p>
        Count: {count}
        {count == 82 || count == 802 ? " - 🩷" : ""}
      </p>
      <div className="space-x-1">
        <Button onClick={() => setCount(count + 1)}>Count Up</Button>
        <Button variant={"outline"} onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>
    </div>
  );
}
