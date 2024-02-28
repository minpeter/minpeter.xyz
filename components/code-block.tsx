/**
 * @license
 * Copyright (c) 2021-present, FriendliAI Inc. All rights reserved.
 */

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { SyntaxHighlighterProps } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { codeVariants } from "./ui/typography";
import { cn } from "@/lib/utils";
import copy from "clipboard-copy";

export function CodeBlock({
  content,
  language,
}: {
  content: string;
  language: string;
}) {
  const isMultiline = content.includes("\n");

  const handleCopyClick = async () => {
    try {
      await copy(content);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return isMultiline ? (
    <div onClick={handleCopyClick}>
      <SyntaxHighlighter
        language={language === "" ? "markdown" : language}
        style={CodeBlockTheme}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={cn(codeVariants(), "break-all")}>{content}</code>
  );
}

export const CodeBlockTheme: SyntaxHighlighterProps["style"] = {
  ...atomDark,
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    backgroundColor: "transparent",
  },
};
