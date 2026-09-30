import SectionHeader from "@/components/section/section-header";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";
import { Trophy, Users } from "lucide-react";

export default function AwardsSection() {
  const items = [
    ...DATA.awards.map((a) => ({ kind: "award" as const, title: a.title, sub: a.org, date: a.date })),
    ...DATA.activities.map((a) => ({ kind: "activity" as const, title: a.title, sub: a.desc, date: a.date })),
  ];
  return (
    <div className="flex min-h-0 flex-col gap-y-8 w-full overflow-hidden">
      <SectionHeader
        badge="Awards & Activities"
        title="수상과 활동"
        description={`공모전 수상 ${DATA.awards.length}회, 개발 동아리와 교육 과정에서 팀으로 서비스를 만들고 운영했습니다.`}
      />
      <Timeline>
        {items.map((item) => {
          const Icon = item.kind === "award" ? Trophy : Users;
          return (
            <TimelineItem key={item.title} className="w-full flex items-start justify-between gap-10">
              <TimelineConnectItem className="flex items-start justify-center">
                <div className="size-10 bg-card z-10 shrink-0 flex items-center justify-center border rounded-full shadow ring-2 ring-border flex-none">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {item.date && <time className="text-xs text-muted-foreground">{item.date}</time>}
                <h3 className="font-semibold leading-none">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">{item.sub}</p>
              </div>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
}
