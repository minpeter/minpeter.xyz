"use client";

import copy from "clipboard-copy";
import { highlight } from "sugar-high";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

async function handleCopyClick(content: string) {
  try {
    await copy(content);
  } catch (error) {
    console.error("Failed to copy text to clipboard", error);
  }
}

function parseTemplate(template: string) {
  const regex = /{{([^}]+)}}/g;
  const result = [];
  let lastIndex = 0;
  let match;

  if (template[0] === "\n") {
    lastIndex = 1;
  }

  while ((match = regex.exec(template))) {
    if (match.index > lastIndex) {
      result.push({
        data: template.slice(lastIndex, match.index),
        type: "static",
      });
    }
    result.push({
      data: match[1],
      type: "dynamic",
    });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < template.length) {
    result.push({
      data: template.slice(lastIndex),
      type: "static",
    });
  }
  return result;
}

export function ModCodeBlock({
  template,
  data,
  language,
}: {
  template: string;
  data: { [key: string]: string };
  language?: string;
}) {
  const parsedTemplate = parseTemplate(template);

  const [state, setState] = useState(data);

  const [onFocus, setOnFocus] = useState(
    new Array(Object.keys(data).length).fill(false)
  );

  useEffect(() => {
    setState(data);
  }, [data]);

  const stateUpdate = (key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [onCopy, setOnCopy] = useState(false);

  useEffect(() => {
    if (onCopy) {
      setTimeout(() => {
        setOnCopy(false);
      }, 1000);
    }
  }, [onCopy]);

  return (
    <div className="flex flex-col gap-1">
      <pre style={{ marginBottom: 0 }}>
        <div
          className="invisible absolute right-3 top-3 hover:cursor-pointer border rounded-md p-1 bg-card"
          onClick={() => {
            setOnCopy(true);
            handleCopyClick(
              parsedTemplate
                .map(({ data, type }) => {
                  if (type === "static") {
                    return data;
                  } else if (type === "dynamic" && data === "%TAB") {
                    return "    ";
                  } else {
                    return state[data];
                  }
                })
                .join("")
            );
          }}
        >
          <CopyIcon className={!onCopy ? "block" : "hidden"} />
          <CheckIcon className={onCopy ? "block" : "hidden"} />
        </div>
        <code>
          {parsedTemplate.map(({ data, type }, i) => {
            if (type === "static") {
              return <span key={i}>{data}</span>;
            } else if (type === "dynamic" && data === "%TAB") {
              return <span key={i}>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
            } else {
              return onFocus[i] ? (
                <input
                  type="text"
                  autoFocus
                  //
                  className={`inline bg-secondary px-1 py-0.5 rounded-md h-5`}
                  key={i}
                  value={state[data]}
                  onFocus={(e) => {
                    const input = e.target;
                    input.style.width = input.value.length + 2 + "ch";
                  }}
                  onChange={(e) => {
                    stateUpdate(data, e.target.value);

                    const input = e.target;
                    input.style.width = input.value.length + 2 + "ch";
                  }}
                  onBlur={() =>
                    setOnFocus((prev) => {
                      const newFocus = [...prev];
                      newFocus[i] = false;
                      return newFocus;
                    })
                  }
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.target.blur();
                    }
                  }}
                />
              ) : (
                <span
                  key={i}
                  onClick={() => {
                    setOnFocus((prev) => {
                      const newFocus = [...prev];
                      newFocus[i] = true;
                      return newFocus;
                    });
                  }}
                  className="cursor-pointer bg-secondary px-1 py-0.5 rounded-md text-blue-500 hover:text-white hover:bg-blue-500"
                >
                  {state[data] || `plz enter \`${data}\``}
                </span>
              );
            }
          })}
        </code>
      </pre>

      <div className="text-xs text-gray-500 pl-1 mb-4">
        *파란색 텍스트를 클릭하면 간편하게 수정 후 복사할 수 있습니다.
      </div>
    </div>
  );
}

export function CodeBlock({
  code,
  language = "",
}: {
  code: string;
  language?: string;
}) {
  const isPlain =
    language === "plaintext" ||
    language === "text" ||
    language === "plain" ||
    language === "nohighlight" ||
    language === "";

  const [onCopy, setOnCopy] = useState(false);

  useEffect(() => {
    if (onCopy) {
      setTimeout(() => {
        setOnCopy(false);
      }, 1000);
    }
  }, [onCopy]);

  return (
    <>
      <div
        className="invisible absolute right-3 top-3 hover:cursor-pointer border rounded-md p-1 bg-card"
        onClick={() => {
          setOnCopy(true);
          handleCopyClick(code);
        }}
      >
        <CopyIcon className={!onCopy ? "block" : "hidden"} />
        <CheckIcon className={onCopy ? "block" : "hidden"} />
      </div>
      <div style={{ overflowX: "auto" }}>
        {isPlain ? (
          <code>{code}</code>
        ) : (
          <code
            dangerouslySetInnerHTML={{
              __html: highlight(code),
            }}
          />
        )}
      </div>
    </>
  );
}
