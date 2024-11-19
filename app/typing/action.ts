"use server";

import { friendli } from "@friendliai/ai-provider";
import { generateText } from "ai";

export async function nextSentencesGenerator() {
  const { text } = await generateText({
    model: friendli("meta-llama-3.1-70b-instruct"),
    temperature: 1.2,
    frequencyPenalty: 1,
    topP: 0.2,
    maxTokens: 50,
    system: `You are a beautiful sentence generator for typing practice.
Please write a heart-touching sentence by referring to famous movies, music, literature, comics, etc.
Please use only Korean. Please make your answer short and concise.
No matter what happens, don't print Chinese characters.
Please avoid using special characters such as '"', '(', ')' as much as possible, as they interfere with typing practice.
Never mention the source or original of a sentence under any circumstances. It seriously reduces the quality of the sentence.
End your sentences smoothly, always write literary.`,
    prompt: "Please create a phrase for typing practice, just one sentence.",
  });

  const textWithoutQuotes = text.replace(/^"([^"]+)"$/, "$1");
  return textWithoutQuotes;

  // return text;
}
