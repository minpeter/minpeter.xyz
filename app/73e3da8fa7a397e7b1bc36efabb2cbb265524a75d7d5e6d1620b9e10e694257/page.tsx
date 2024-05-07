import { Backlink } from "@/components/link";

export default function Page() {
  return (
    <section className="flex flex-col gap-1">
      <div data-animate data-animate-speed="fast">
        <Backlink text="돌아가기" href="/blog" />
      </div>
      <div data-animate data-animate-speed="slow" className="flex flex-col">
        <p>동짓달 기나긴 밤을 한 허리를 베어내어</p>
        <p>봄바람 이불 아래 서리서리 넣었다가</p>
        <p>사랑하는 님 오신 밤이거든 굽이굽이 펴리라</p>
        <p className="mt-8">
          <span className="break-all bg-secondary/100 rounded-md inline py-1 px-2 box-decoration-clone">
            73e3da8fa7a397e7b1bc36efabb2cbb265524a75d7d5e6d1620b9e10e6942579c72f80600da9f7eeb32e04c4efd3535d
          </span>
        </p>
      </div>
    </section>
  );
}
