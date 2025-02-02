export default function Callout({
  children,
  emoji,
}: {
  children: React.ReactNode;
  emoji?: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-700 bg-card text-card-foreground shadow-xs p-4 flex items-center gap-3">
      {emoji ? emoji : "💡"}
      <p className="text-sm font-medium leading-6 text-neutral-900 dark:text-neutral-100">
        {children}
      </p>
    </div>
  );
}
