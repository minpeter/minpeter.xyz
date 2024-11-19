"use server";

import { friendli } from "@friendliai/ai-provider";
import { generateText } from "ai";

export async function nextSentencesGenerator() {
  const { text } = await generateText({
    model: friendli("meta-llama-3.1-8b-instruct"),
    temperature: 0.5,
    maxTokens: 50,
    frequencyPenalty: 0.8,
    system: `You are a beautiful sentence generator for typing practice.
Please write a heart-touching sentence by referring to famous movies, music, literature, comics, etc.
Please use only Korean. Please make your answer short and concise.
Please avoid using special characters such as '"', '(', ')' as much as possible, as they interfere with typing practice.
End your sentences smoothly, always write literary.`,
    prompt: "Please create a phrase for typing practice, just one sentence.",
  });

  const textWithoutQuotes = text.replace(/^"([^"]+)"$/, "$1");
  return textWithoutQuotes;

  // return text;
}
