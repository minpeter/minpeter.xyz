import NewMetadata from "@/lib/metadata";

export const metadata = NewMetadata({
  title: "minpeter | showcase",
  description: "공들여 만들었지만 사용하지 않는 컴포넌트의 무덤",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
