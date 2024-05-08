"use client";

import { CodeBlock, ModCodeBlock } from "@/components/code-block";
import Callout from "@/components/callout";
import "@/styles/mdx.css";

import { getMDXComponent } from "mdx-bundler/client";

export default function PostContent({ code }: any) {
  const Component = getMDXComponent(code);
  return (
    <Component
      components={{
        code: ({ children, className }: any) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          return <CodeBlock language={language} code={children} />;
        },
        ModCodeBlock,
        Callout,
      }}
    />
  );
}
