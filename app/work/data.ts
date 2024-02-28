export const projectData = [
  {
    title: "tempfiles",
    description: "파일을 간편하게 임시로 저장하고 공유해주는 서비스",
    date: "2022.09.01 ~ now",
    status: "WIP",
    link: {
      github: "github.com/tempfiles-Team",
      website: "tmpf.vercel.app",
    },
    doit: [
      "멀티 파일 업로드 기능 구현을 위한 백엔드 API 설계 및 구현",
      "고용량 파일 업로드가 불가능한 이슈를 트래킹, 인프라 구성에서 해결",
      "적절한 유저층 타겟팅을 통한 사용자 유입과 피드백 반영 경험",
    ],
    usedTech: [
      "Golang",
      "Docker",
      "React",
      "TypeScript",
      "Vercel",
      "TailwindCSS",
    ],
  },
  {
    title: "ipLogger",
    description: "IP 주소를 간편하게 확인할 수 있는 서비스",
    date: "2023.01 ~ 2023.05",
    link: {
      github: "github.com/minpeter/ipLogger",
      website: "ip.minpeter.tech",
    },
    doit: [
      "IP 주소를 확인하는 API 서버 구축",
      "XFF 헤더를 통한 클라이언트 IP 추출",
      "다양한 reverse proxy가 존재하는 환경에서 동작 테스트",
    ],
    usedTech: ["golang", "docker", "traefik", "cloudflare", "k8s", "htmx"],
  },
  {
    title: "minpeter.tech",
    description: "개인 홈페이지, 블로그, 포트폴리오",
    date: "2023.11 ~ now",
    link: {
      github: "github.com/minpeter/minpeter.tech",
      website: "minpeter.tech",
    },
    doit: [
      "Next.js를 이용한 정적 페이지 빌드",
      "MDX를 이용한 상호작용 가능한 블로그 포스트 작성",
      "데이터 마이그래이션을 통한 블로그 포스트 이전",
    ],
    usedTech: ["Next.js", "TypeScript", "MDX-bundler", "TailwindCSS", "Shadcn"],
  },
  {
    title: "minpeter.github.io",
    description: "이 블로그 이전의 Github Pages 블로그",
    date: "2021.07 ~ 2023.11",
    status: "ARCHIVE",
    link: {
      github: "github.com/minpeter/minpeter.github.io",
      website: "minpeter.github.io",
    },
  },
];
