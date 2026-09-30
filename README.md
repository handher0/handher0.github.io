# handher0 portfolio

손영웅의 개발자 포트폴리오 — https://handher0.github.io

- Next.js (static export) · Tailwind CSS · shadcn/ui · Magic UI
- 템플릿: [dillionverma/portfolio](https://github.com/dillionverma/portfolio) (MIT)

## 내용 수정

| 무엇 | 파일 |
|---|---|
| 소개·경력·기술·수상·자격·프로젝트 카드 | `src/data/resume.tsx` |
| 프로젝트 상세 | `content/projects/*.mdx` |
| 블로그 글 | `content/blog/*.mdx` |

## 로컬 실행

```bash
pnpm install
pnpm dev   # http://localhost:3000
```

main에 푸시하면 GitHub Actions가 빌드해 GitHub Pages에 배포합니다.
