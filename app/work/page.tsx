import {
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

import { projectData } from "./data";

export default function Page() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className={cn(largeVariants(), h2Variants(), "mb-4")}>
          Side Projects
        </h2>
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
