import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "개발하며 부딪힌 문제와 해결 과정을 기록합니다.",
};

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
  );

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Blog{" "}
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {sortedPosts.length}편
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          개발하며 부딪힌 문제와 해결 과정을 기록합니다.
        </p>
      </BlurFade>
      <div className="flex flex-col gap-5">
        {sortedPosts.map((post, id) => {
          const slug = post._meta.path.replace(/\.mdx$/, "");
          return (
            <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={slug}>
              <Link className="flex items-start gap-x-2 group" href={`/blog/${slug}/`}>
                <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
                  {String(id + 1).padStart(2, "0")}.
                </span>
                <div className="flex flex-col gap-y-1 flex-1">
                  <p className="tracking-tight text-lg font-medium">
                    {post.title}
                    <ChevronRight
                      className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                      aria-hidden
                    />
                  </p>
                  <p className="text-sm text-muted-foreground">{post.summary}</p>
                  <p className="text-xs text-muted-foreground">{post.publishedAt}</p>
                </div>
              </Link>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
