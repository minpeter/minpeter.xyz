import NewMetadata from "@/lib/metadata";

export const metadata = NewMetadata({
  title: "minpeter | blog",
  description:
    "개발에 대한 이야기를 나누는 블로그입니다. 최신 글을 확인해보세요.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
