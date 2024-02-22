import { Playground } from "@/components/animated-stack";

export default function Page() {
  return (
    <>
      <main className="flex flex-col space-y-2">
        <section className="py-5">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            안녕하세요, 민웅기입니다 🤙
          </h4>

          <p className="scroll-m-20">
            현재는 프론트엔드 개발자로 일하고 있습니다. 프론트엔드 개발자로서
            빠르게 변화하는 기술을 배우고 적용하는 것을 즐깁니다. 또한, 사용자
            경험을 중요시하며 사용자에게 최고의 경험을 제공하기 위해 노력합니다.
          </p>
        </section>
        <Playground />
      </main>
    </>
  );
}
