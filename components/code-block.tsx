/**
 * @license
 * Copyright (c) 2021-present, FriendliAI Inc. All rights reserved.
 */

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { SyntaxHighlighterProps } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CodeBlock({
  content,
  language,
}: {
  content: string;
  language: string;
}) {
  const isMultiline = content.includes("\n");

  return isMultiline ? (
    <>
      <SyntaxHighlighter
        language={language === "" ? "markdown" : language}
        style={CodeBlockTheme}
      >
        {content}
      </SyntaxHighlighter>
    </>
  ) : (
    <code className="bg-neutral-300 text-black px-2 py-1 rounded-md">
      {content}
    </code>
  );
}

export const CodeBlockTheme: SyntaxHighlighterProps["style"] = {
  ...atomDark,
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    backgroundColor: "transparent",
  },
};
