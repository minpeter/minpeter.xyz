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
    <code className="bg-gray-500 text-white px-1 py-0.5 mx-0.5 rounded-md text-sm break-all">
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
