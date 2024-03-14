import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 2022-1-1 -> 01. 01.
export function formatDate(date: string) {
  const d = new Date(date);
  return `${("0" + (d.getMonth() + 1)).slice(-2)}. ${("0" + d.getDate()).slice(
    -2
  )}.`;
}

export function formatYear(date: string) {
  const d = new Date(date);
  return d.getFullYear();
}
