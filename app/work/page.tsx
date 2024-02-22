export default function Page() {
  return (
    <>
      <main className="flex flex-col space-y-2">
        <section className="py-5">
          <div className="mb-8">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
              Education & Career
            </h4>
            <p>
              <span className="font-bold">FriendliAI</span>{" "}
              <sub>
                <sup>@friendliai_FE_developer (2023.09 ~ now)</sup>
              </sub>
            </p>
            <p>
              <span className="font-bold">
                Hansei Cyber Security High School
              </span>{" "}
              <sub>
                <sup>@Hacking_Security (2021.03 ~ 2024.03)</sup>
              </sub>
            </p>
          </div>

          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
              Toy Projects
            </h4>
            <p className="flex flex-col gap-3 mb-4">
              <p className="font-bold">tempfiles</p>
              <sub className="flex flex-col gap-3">
                <sup>간단한 파일 업로드 서비스</sup>
                <sup>golang, typescript, react (2021.03 ~ now)</sup>
              </sub>
            </p>
            <p className="flex flex-col gap-3 mb-4">
              <p className="font-bold">ipLogger</p>
              <sub className="flex flex-col gap-3">
                <sup>나의 퍼블릭 아이피 찾기 서비스</sup>
                <sup>golang (2021.03 ~ now)</sup>
              </sub>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
