import { allProjects } from "content-collections";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slugOf = (p: (typeof allProjects)[number]) => p._meta.path.replace(/\.mdx$/, "");

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: slugOf(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const doc = allProjects.find((p) => slugOf(p) === slug);
  if (!doc) return undefined;
  return { title: doc.title, description: doc.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = allProjects.find((p) => slugOf(p) === slug);
  const index = DATA.projects.findIndex((p) => p.slug === slug);
  const meta = DATA.projects[index];
  if (!doc || !meta) notFound();

  const prev = index > 0 ? DATA.projects[index - 1] : null;
  const next = index < DATA.projects.length - 1 ? DATA.projects[index + 1] : null;

  return (
    <section id="project">
      <Link
        href="/#projects"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group"
      >
        <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
        프로젝트 목록
      </Link>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">{meta.dates}</p>
        <h1 className="font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
          {meta.title}
        </h1>
        <p className="text-lg text-muted-foreground">{meta.subtitle}</p>
        <div className="mt-2 flex items-center gap-4 rounded-xl border border-border bg-muted/40 px-5 py-4">
          <span className="text-3xl font-bold tracking-tighter tabular-nums">{meta.metric.value}</span>
          <span className="text-sm text-muted-foreground">{meta.metric.label}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {meta.technologies.map((t) => (
            <Badge key={t} variant="outline" className="text-[11px] h-6 px-2 border border-border">
              {t}
            </Badge>
          ))}
          {meta.links.map((l) => (
            <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              <Badge className="flex items-center gap-1.5 text-xs h-6 bg-black text-white hover:bg-black/90">
                {l.icon}
                {l.type}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
      <div className="my-8 h-px bg-border" />
      <article className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <MDXContent code={doc.mdx} components={mdxComponents} />
      </article>
      <nav className="mt-12 pt-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {prev ? (
            <Link href={`/projects/${prev.slug}/`} className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />이전 프로젝트
              </span>
              <span className="text-sm font-medium">{prev.title}</span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
          {next ? (
            <Link href={`/projects/${next.slug}/`} className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right">
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                다음 프로젝트<ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium">{next.title}</span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
      </nav>
    </section>
  );
}
