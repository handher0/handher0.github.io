import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">연락하기</h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="text-blue-500 hover:underline underline-offset-4"
          >
            {DATA.contact.email}
          </Link>
          {" "}로 편하게 연락 주세요. 코드는{" "}
          <Link
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline underline-offset-4"
          >
            GitHub
          </Link>
          에서 볼 수 있습니다.
        </p>
      </div>
    </div>
  );
}
