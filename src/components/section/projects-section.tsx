import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import SectionHeader from "@/components/section/section-header";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <SectionHeader
        badge="Projects"
        title="문제를 풀어온 기록"
        description="각 프로젝트에서 부딪힌 문제와 원인, 해결 과정, 결과를 수치로 정리했습니다. 카드를 누르면 상세 내용을 볼 수 있습니다."
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
        {DATA.projects.map((project, id) => (
          <BlurFade
            key={project.slug}
            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            className="h-full"
          >
            <ProjectCard
              slug={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              metric={project.metric}
              links={project.links}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
