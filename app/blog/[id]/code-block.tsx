/**
 * @license
 * Copyright (c) 2021-present, FriendliAI Inc. All rights reserved.
 */

import { codeVariants } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import copy from "clipboard-copy";
import { highlight } from "sugar-high";

export function CodeBlock({ content }: { content: string }) {
  const isMultiline = content.includes("\n");

  const handleCopyClick = async () => {
    try {
      await copy(content);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return isMultiline ? (
    <code
      onClick={handleCopyClick}
      dangerouslySetInnerHTML={{ __html: highlight(content) }}
    />
  ) : (
    <code className={cn(codeVariants(), "break-all")}>{content}</code>
  );
}
