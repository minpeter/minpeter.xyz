export default function Page() {
  return (
    <>
      <main className="flex flex-col space-y-2">
        <section className="py-5">
          <div className="mb-8">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
              간략한 경력
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
              토이 프로젝트
            </h4>
            <p>
              <span className="font-bold">tempfiles</span>{" "}
              <sub>
                <sup>@backend_developer (2023.09 ~ now)</sup>
              </sub>
            </p>
            <p>
              <span className="font-bold">iplogger</span>{" "}
              <sub>
                <sup>@golang (2021.03 ~ 2024.03)</sup>
              </sub>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
