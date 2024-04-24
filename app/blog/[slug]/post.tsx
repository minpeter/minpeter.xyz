"use client";

import copy from "clipboard-copy";
import { highlight } from "sugar-high";
import "@/styles/mdx.css";

import { getMDXComponent } from "mdx-bundler/client";

export default function PostContent({ code }: any) {
  const Component = getMDXComponent(code);
  return (
    <Component
      components={{
        code: ({ children, className }: any) => {
          const isMultiline = children.includes("\n");
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";
          const isPlain =
            language === "plaintext" ||
            language === "text" ||
            language === "plain" ||
            language === "nohighlight" ||
            language === "";
          return (
            <code
              onClick={() => {
                handleCopyClick(children);
              }}
              dangerouslySetInnerHTML={{
                __html:
                  isMultiline && !isPlain ? highlight(children) : children,
              }}
            />
          );
        },
      }}
    />
  );
}

async function handleCopyClick(content: string) {
  try {
    await copy(content);
  } catch (error) {
    console.error("Failed to copy text to clipboard", error);
  }
}
