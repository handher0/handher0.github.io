import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, FolderGit2Icon } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

export const DATA = {
  name: "손영웅",
  initials: "YW",
  url: "https://handher0.github.io",
  siteTitle: "handher0 portfolio",
  description:
    "문제를 수치로 확인하고, 구조로 해결하는 백엔드·DX 엔지니어입니다.",
  summary:
    "숭실대학교 컴퓨터학부 4학년(2027.02 졸업예정)입니다. Java·Spring으로 서비스를 만들고, AWS·GCP 위에서 직접 운영해 왔습니다. [동아리 프로젝트](/#projects)에서는 SQL 로그로 N+1을 찾아 쿼리를 줄였고, 연구실에서는 AI 추론 파이프라인을 비동기로 분리해 재생성 시간을 70% 단축했습니다. 현장실습에서는 사내 검증 도구에 AI 에이전트를 연결해 실무 도입까지 이어갔습니다.",
  skills: [
    { name: "Java", icon: Java },
    { name: "Spring Boot" },
    { name: "JPA" },
    { name: "Python", icon: Python },
    { name: "FastAPI" },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MySQL" },
    { name: "Redis" },
    { name: "Celery" },
    { name: "AWS" },
    { name: "GCP" },
    { name: "Docker", icon: Docker },
    { name: "EKS", icon: Kubernetes },
    { name: "Terraform" },
    { name: "GitHub Actions" },
    { name: "LangChain" },
    { name: "MCP" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/#projects", icon: FolderGit2Icon, label: "Projects" },
    { href: "/blog/", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "handher0@naver.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/handher0",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/%EC%98%81%EC%9B%85-%EC%86%90-1a3334377/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:handher0@naver.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "슈어소프트테크",
      href: "https://www.suresofttech.com",
      badges: [],
      location: "서울",
      title: "현장실습 · 모빌리티솔루션4팀",
      logoUrl: "",
      start: "2026.03",
      end: "2026.06",
      description:
        "제어기 보안 검증을 원격으로 자동화하는 웹 기반 사내 도구(Flask·React)를 개발했습니다. 로컬 LLM 파인튜닝이 신뢰성 문제로 실패한 뒤, Trace32 원격 제어 API를 MCP 서버의 도구로 묶어 AI는 판단만, 실행은 검증된 코드가 맡는 구조로 전환해 실무 도입까지 이어갔습니다.",
    },
    {
      company: "숭실대학교 시스템소프트웨어 연구실",
      href: "https://github.com/SSLAB-SSU",
      badges: [],
      location: "서울",
      title: "학부연구생",
      logoUrl: "",
      start: "2025.12",
      end: "2026.02",
      description:
        "AI 손글씨 폰트 생성 서비스 '내글네글'의 백엔드와 AI 서빙 파이프라인을 개발했습니다(FastAPI·Celery·Redis). 자소 분리와 폰트 생성을 별도 태스크로 분리해 재생성 소요를 70% 단축했고, NEIT-AX 동계 학부연구인턴 우수상을 받았습니다.",
    },
  ],
  education: [
    {
      school: "숭실대학교",
      href: "https://ssu.ac.kr",
      degree: "컴퓨터학부 학사",
      logoUrl: "",
      start: "2021.03",
      end: "2027.02 (졸업예정)",
    },
  ],
  projects: [
    {
      slug: "vinny",
      title: "Vinny",
      subtitle: "빈티지 스타일 공유 서비스 백엔드",
      dates: "2025.03 - 2025.08 · UMC",
      metric: { value: "71 → 6", label: "피드 한 페이지당 쿼리 수" },
      description:
        "SQL 로그로 N+1을 발견하고 fetch join과 @BatchSize로 조회 구조를 바꿨습니다. 인기순 조회는 ID 페이징 후 연관 데이터를 가져오는 2단계 쿼리로 해결했습니다.",
      technologies: ["Java", "Spring Boot", "JPA", "MySQL", "AWS", "GitHub Actions"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/Vinnyumc/Vinny-backend",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      slug: "ngng",
      title: "내글네글",
      subtitle: "AI 손글씨 폰트 생성 서비스",
      dates: "2025.12 - 2026.02 · 연구실",
      metric: { value: "-70%", label: "폰트 재생성 소요 시간" },
      description:
        "10분이 걸리던 단일 AI 작업을 자소 분리·폰트 생성 2단계 Celery 태스크로 분리하고, 진행률은 Redis와 SSE로 실시간 전달했습니다.",
      technologies: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "SSE"],
      links: [],
    },
    {
      slug: "csvt",
      title: "제어기 보안 검증 자동화",
      subtitle: "웹 기반 사내 도구 · AI 검증 에이전트",
      dates: "2026.03 - 2026.06 · 현장실습",
      metric: { value: "24 → 1", label: "모듈 검증당 빌드 횟수" },
      description:
        "테스트 생성부터 실행·평가까지 원격으로 자동화했습니다. 파인튜닝이 실패한 뒤 Trace32 제어 기능을 MCP 도구로 묶어 AI 에이전트를 실무에 도입했습니다.",
      technologies: ["Flask", "React", "SQLAlchemy", "LangChain", "MCP", "Trace32"],
      links: [],
    },
    {
      slug: "hirehub",
      title: "HireHub",
      subtitle: "동아리 리크루팅 서비스 개발·운영",
      dates: "2024.07 - 2025.02 · 피로그래밍",
      metric: { value: "Scale-out", label: "모집 전 부하 테스트로 서버 한계 선제 대응" },
      description:
        "부하 테스트에서 단일 서버가 다운되는 것을 확인하고, 실제 모집 전에 트래픽에 따라 서버가 늘어나는 구조로 전환했습니다.",
      technologies: ["Django", "PostgreSQL", "AWS EC2", "Nginx", "GitHub Actions"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/leegh1025/HireHub-Piro21",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      slug: "baby24",
      title: "baby24",
      subtitle: "영유아 낙상사고 방지 서비스",
      dates: "2025.02 - 2025.03 · GDG on Campus",
      metric: { value: "입선", label: "Google Solution Challenge" },
      description:
        "Google OAuth·JWT 인증과 도메인 엔티티를 설계하고, Terraform으로 GCP 인프라를 코드화해 Cloud Run에 배포했습니다.",
      technologies: ["Spring Boot", "Spring Security", "GCP Cloud Run", "Terraform"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/gdsc-ssu/baby24-server",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
  ],
  awards: [
    { title: "소프트웨어공모전 은상", org: "숭실대학교 컴퓨터학부", date: "2026.08" },
    { title: "AX 핀테크 공모전 우수상", org: "숭실대학교 RISE사업단", date: "2026.07" },
    { title: "교내 IT시스템 보안취약점 확인 프로그램 장려상", org: "숭실대학교 지식정보처", date: "2026.06" },
    { title: "NEIT-AX 동계 학부연구인턴 우수상", org: "숭실대학교 기초과학융합연구소", date: "2026.03" },
    { title: "Google Solution Challenge 입선", org: "GDG on Campus · baby24", date: "2025" },
  ],
  activities: [
    { title: "UMC Spring Boot 파트", desc: "빈티지 스타일 공유 서비스 'Vinny' 백엔드", date: "2025.03 - 2025.08" },
    { title: "GDG on Campus", desc: "Google Solution Challenge 'baby24' 백엔드·클라우드", date: "2024.09 -" },
    { title: "피로그래밍 21기 · 22기 운영진", desc: "리크루팅 서비스 'HireHub' 개발·운영", date: "2024.06 - 2025.02" },
    { title: "INNO 클라우드 네이티브 교육 과정", desc: "NHN Cloud · Terraform · K-PaaS", date: "수강 중" },
    { title: "코멘토 직무부트캠프", desc: "AWS 구축부터 운영까지 실무 AtoZ (VPC · EKS · CloudWatch)", date: "" },
  ],
  certifications: [
    { name: "AWS Certified Cloud Practitioner", date: "2026.08" },
    { name: "정보처리기사", date: "2026.06" },
    { name: "데이터분석 준전문가 (ADsP)", date: "2026.06" },
    { name: "TOPCIT Level 3", date: "2026.05" },
    { name: "SQL 개발자 (SQLD)", date: "2025.12" },
    { name: "TOEIC Speaking IM3", date: "2026.09" },
  ],
} as const;
