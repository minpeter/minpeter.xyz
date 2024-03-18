import { ModeToggle } from "./theme-toggle";

export default function Footer() {
  return (
    <footer className="mt-10 gap-2 flex justify-center border-t-2 items-center py-1">
      <p className="text-sm text-gray-50">
        © 2024 minpeter. All rights reserved.
      </p>

      <ModeToggle />
    </footer>
  );
}
