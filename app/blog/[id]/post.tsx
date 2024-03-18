"use client";

import { useMemo } from "react";
import Image from "next/image";

import { codeVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import copy from "clipboard-copy";
import { highlight } from "sugar-high";

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
        h3: (props: any) => (
          <h3
            {...props}
            className="scroll-m-20 border-b pb-2 text-base font-semibold tracking-tight first:mt-0"
          />
        ),
        p: (props: any) => <p {...props} className="py-3 text-gray-400" />,
        strong: (props: any) => <strong {...props} className="text-white" />,
        table: (props: any) => (
          <Table {...props} className="my-4 text-gray-400" />
        ), // "w-full" is not a valid class name
        th: (props: any) => <TableHead {...props} />,
        td: (props: any) => <TableCell {...props} />,
        tbody: (props: any) => <TableBody {...props} />,
        thead: (props: any) => <TableHeader {...props} />,
        tr: (props: any) => <TableRow {...props} />,

        // a: (props: any) => (
        //   <a
        //     {...props}
        //     className="text-gray-400 break-all underline hover:underline focus:underline"
        //   />
        // ),

        ul: (props: any) => <ul {...props} className="list-disc pl-8 " />,
        ol: (props: any) => <ol {...props} className="list-decimal pl-8 " />,
        li: (props: any) => <li {...props} className="text-gray-400" />,

        hr: (props: any) => <hr {...props} className="my-8" />,
        blockquote: (props: any) => (
          <blockquote
            {...props}
            className={cn(
              "scroll-m-20 border-l-4 border-gray-200 pl-4",
              "max-w-96",
              "[&>ul]:flex [&>ul]:justify-end",
              "[&>ul>li]:list-none"
            )}
          />
        ),

        img: (props: any) => (
          <Image
            {...props}
            className="rounded-lg object-cover border shadow-sm min-w-full"
            width={500}
            height={300}
            alt={props.alt}
          />
        ),

        code: ({ children }: any) => {
          const isMultiline = children.includes("\n");

          return (
            <code
              onClick={() => {
                handleCopyClick(children);
              }}
              className={isMultiline ? "" : cn(codeVariants(), "break-all")}
              dangerouslySetInnerHTML={{
                __html: isMultiline ? highlight(children) : children,
              }}
            />
          );
        },
        pre: (props: any) => (
          <pre
            {...props}
            className={cn(
              "rounded-lg border bg-card text-card-foreground shadow-sm",
              "my-4 p-4 overflow-scroll "
            )}
          />
        ),
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
