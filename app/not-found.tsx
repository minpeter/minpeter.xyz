import Header from "@/components/header";

export default function NotFound({ params }: any) {
  return (
    <section>
      <Header
        title="404"
        description="page not found :/"
        link={{ href: "/", text: "" }}
      />
    </section>
  );
}
