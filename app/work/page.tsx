import {
  pVariants,
  largeVariants,
  h2Variants,
  h4Variants,
  h3Variants,
  mutedVariants,
  ulVariants,
} from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

import { GitHubLogoIcon, Link2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { stat } from "fs";

const projectData = [
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

export default function Page() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className={cn(largeVariants(), h2Variants(), "mb-4")}>Project</h2>
        <div className="space-y-5">
          {projectData.map((d, i) => (
            <ProjectCard key={i} {...d} />
          ))}
        </div>
      </div>

      <div>
        <h2 className={cn(largeVariants(), h2Variants(), "mb-4")}>
          Experience
        </h2>
        <ExperienceCard
          title="FriendliAI"
          subTitle="friendliai_FE_developer"
          date="2023.09 ~ now"
        />
        <ExperienceCard
          title="Hansei Cyber Security High School"
          subTitle="Hacking_Security"
          date="2021.03 ~ 2024.03"
        />
      </div>
    </section>
  );
}

function ExperienceCard({
  title,
  subTitle,
  date,
}: {
  title: string;
  subTitle: string;
  date: string;
}) {
  return (
    <div className="flex items-start justify-start flex-col sm:flex-row sm:items-center sm:justify-between">
      <h3 className={cn(largeVariants(), h4Variants())}>{title}</h3>
      <p className={cn(mutedVariants())}>
        @{subTitle} ({date})
      </p>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  date,
  usedTech,
  doit,
  link,
  status = "DONE",
}: {
  title: string;
  description: string;
  date: string;
  usedTech?: string[];
  doit?: string[];
  status?: string;
  link?: {
    github?: string;
    website?: string;
  };
}) {
  return (
    <div className="space-y-2 my-2">
      <div className="space-y-0.5">
        <div
          className={cn(
            "flex gap-0.5 sm:flex-row sm:gap-4",
            `${status !== "DONE" && "flex-col-reverse"}`
          )}
        >
          <h2 className={cn(largeVariants(), h3Variants())}>{title}</h2>
          <div className="flex items-center gap-2 justify-between w-full">
            {status === "WIP" && <Badge>WIP</Badge>}
            {status === "ARCHIVE" && <Badge>ARCHIVE</Badge>}
            {status === "DONE" && <div />}

            {link !== undefined && (
              <div className="flex space-x-2">
                {link.github !== undefined && (
                  <Link
                    href={`https://${link?.github}`}
                    target="_blank"
                    passHref
                  >
                    <GitHubLogoIcon className="w-5 h-5" />
                  </Link>
                )}
                {link.website !== undefined && (
                  <Link
                    href={`https://${link?.website}`}
                    target="_blank"
                    passHref
                  >
                    <Link2Icon className="w-5 h-5" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <p className={cn(mutedVariants())}>{description}</p>
          <p className={cn(mutedVariants())}>{date}</p>
        </div>
      </div>

      {usedTech?.length !== 0 && usedTech !== undefined && (
        <div className="space-y-0.5">
          <h3 className={cn(largeVariants())}>사용 기술</h3>
          <div
            className={cn(mutedVariants(), "flex gap-1.5 max-w-max flex-wrap")}
          >
            {usedTech?.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
        </div>
      )}

      {doit?.length !== 0 && doit !== undefined && (
        <div className="space-y-0.5">
          <h3 className={cn(largeVariants())}>배운 점</h3>
          <ul className={cn(ulVariants(), "ml-3")}>
            {doit?.map((d, i) => (
              <li key={i} className={cn(mutedVariants())}>
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
