"use client";

const $text = document.querySelector("#typing");

if (!$text) {
  throw new Error("No element found");
}

const letters = ["blog", "tech", "learn"];

const speed = 100;
let i = 0;
const typing = async () => {
  const letter = (letters[i] + " . . .").split("");
  while (letter.length) {
    await wait(speed);
    $text.innerHTML += letter.shift();
  }
  await wait(800);
  remove();
};

const remove = async () => {
  const letter = letters[i].split("");
  while (letter.length) {
    await wait(speed);
    letter.pop();
    $text.innerHTML = letter.join("");
  }
  i = !letters[i + 1] ? 0 : i + 1;
  typing();
};

function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

setTimeout(remove, 1500);
