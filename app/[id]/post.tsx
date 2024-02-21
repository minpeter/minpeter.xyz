"use client";

import { useMemo } from "react";

import "@/styles/posts.css";

import { getMDXComponent } from "mdx-bundler/client";

export default function PostContent({ code }: any) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component />;
}
