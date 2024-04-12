"use client";

import { useMemo } from "react";

import { codeVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import copy from "clipboard-copy";
import { highlight } from "sugar-high";
import "@/styles/mdx.css";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getMDXComponent } from "mdx-bundler/client";

export default function PostContent({ code }: any) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <Component
      components={{
        table: (props: any) => <Table {...props} />,
        th: (props: any) => <TableHead {...props} />,
        td: (props: any) => <TableCell {...props} />,
        tbody: (props: any) => <TableBody {...props} />,
        thead: (props: any) => <TableHeader {...props} />,
        tr: (props: any) => <TableRow {...props} />,

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
              className={isMultiline ? "" : cn(codeVariants(), "break-all")}
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
