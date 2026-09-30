import { Badge } from "@/components/ui/badge";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  dates: string;
  tags: readonly string[];
  metric: { value: string; label: string };
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  slug,
  title,
  subtitle,
  description,
  dates,
  tags,
  metric,
  links,
  className,
}: Props) {
  const href = `/projects/${slug}/`;
  return (
    <div
      className={cn(
        "group flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 hover:ring-muted transition-all duration-200 bg-card",
        className
      )}
    >
      <div className="relative shrink-0">
        <Link href={href} className="block">
          <div className="relative h-40 overflow-hidden bg-muted/60 flex flex-col items-center justify-center gap-1 px-4 text-center">
            <FlickeringGrid
              className="absolute inset-0 h-full w-full"
              squareSize={2}
              gridGap={3}
              maxOpacity={0.15}
              style={{
                maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
              }}
            />
            <span className="relative text-4xl font-bold tracking-tighter tabular-nums">
              {metric.value}
            </span>
            <span className="relative text-xs text-muted-foreground text-balance">
              {metric.label}
            </span>
          </div>
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link href={href} className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold leading-snug">
              {title}
              <span className="block text-sm font-normal text-muted-foreground">
                {subtitle}
              </span>
            </h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"
            aria-hidden
          />
        </div>
        <p className="text-sm flex-1 text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}
