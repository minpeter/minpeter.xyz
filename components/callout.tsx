export default function Callout({
  children,
  emoji,
}: {
  children: React.ReactNode;
  emoji?: string;
}) {
  return (
    <div className="bg-card text-card-foreground flex items-center gap-3 rounded-lg border border-neutral-700 p-4 shadow-xs">
      {emoji ? emoji : "💡"}
      <p className="text-sm leading-6 font-medium text-neutral-900 dark:text-neutral-100">
        {children}
      </p>
    </div>
  );
}
