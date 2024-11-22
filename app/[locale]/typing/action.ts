"use server";

import { friendli } from "@friendliai/ai-provider";
import { generateText } from "ai";

export async function nextSentencesGenerator() {
  const { text } = await generateText({
    model: friendli("meta-llama-3.1-8b-instruct"),
    temperature: 1.4,
    frequencyPenalty: 1.1,
    topP: 0.1,
    maxTokens: 50,
    system: `You are a beautiful sentence generator for typing practice.
Please write a heart-touching sentence by referring to famous movies, music, literature, comics, etc.
Please use only Korean. Please make your answer short and concise.
Please avoid using special characters such as '"', '(', ')' as much as possible, as they interfere with typing practice.
Never mention the source or original of a sentence under any circumstances. It seriously reduces the quality of the sentence.
Even if a sentence has been translated, never say anything about it being translated.
End your sentences smoothly, always write literary.`,
    prompt: "Please create a phrase for typing practice, just one sentence.",
  });

  const textWithoutQuotes = text.replace(/^"([^"]+)"$/, "$1");
  return textWithoutQuotes;

  // return text;
}
