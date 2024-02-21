"use client";

import { useMemo } from "react";
import Image from "next/image";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
        h1: (props: any) => (
          <h1
            {...props}
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
          />
        ),
        h2: (props: any) => (
          <h2
            {...props}
            className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
          />
        ),
        h3: (props: any) => (
          <h3
            {...props}
            className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0"
          />
        ),
        p: (props: any) => <p {...props} className="py-5" />,
        table: (props: any) => <Table {...props} className="my-4" />, // "w-full" is not a valid class name
        th: (props: any) => <TableHead {...props} />,
        td: (props: any) => <TableCell {...props} />,
        tbody: (props: any) => <TableBody {...props} />,
        thead: (props: any) => <TableHeader {...props} />,
        tr: (props: any) => <TableRow {...props} />,

        a: (props: any) => (
          <a
            {...props}
            className="text-blue-600 hover:underline focus:underline"
          />
        ),

        ul: (props: any) => <ul {...props} className="list-disc pl-8" />,

        hr: (props: any) => <hr {...props} className="my-8" />,
        blockquote: (props: any) => (
          <blockquote
            {...props}
            className="scroll-m-20 border-l-4 border-gray-200 pl-4"
          />
        ),

        img: (props: any) => (
          <Image
            {...props}
            className="rounded-lg py-2"
            layout="responsive"
            width={500}
            height={300}
            alt={props.alt}
          />
        ),

        code: (props: any) => (
          <code
            {...props}
            className="p-1 rounded-md text-sm break-all bg-gray-800"
          />
        ),

        pre: (props: any) => {
          console.log(props);
          return (
            <SyntaxHighlighter
              style={docco}
              className="rounded-md p-4 bg-gray-800"
            >
              {props.children.props.children}
            </SyntaxHighlighter>
          );
        },
      }}
    />
  );
}
