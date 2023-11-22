"use client";
import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";

export default function PostContent({ code }: any) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return <Component />;
}
