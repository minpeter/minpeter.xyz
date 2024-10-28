import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

import NewMetadata from "@/lib/metadata";

export const metadata = NewMetadata({
  title: "minpeter | blog",
  description: "내가 만든 블로그, 너를 위해 써봤지",
});

export default function Layout({ children }: { children: ReactNode }) {
  // return (
  //   <DocsLayout tree={source.pageTree} {...baseOptions}>
  //     {children}
  //   </DocsLayout>
  // );

  return children;
}
