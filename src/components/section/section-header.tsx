export default function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
          <span className="text-background text-sm font-medium">{badge}</span>
        </div>
        <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
      </div>
      <div className="flex flex-col gap-y-3 items-center justify-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">{title}</h2>
        {description && (
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed text-balance text-center">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
