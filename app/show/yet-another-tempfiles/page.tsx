import Header from "@/components/header";

import TmpfUI from "./tmpf";

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <Header
        title="/show/yet-another-tempfiles"
        description="tmpf.me보다 간단한 대체 프론트엔드"
        link={{ href: "/show", text: "showcase로 돌아가기" }}
      />
      <div data-animate data-animate-speed="slow" className="flex flex-col">
        <TmpfUI />
      </div>
    </section>
  );
}
