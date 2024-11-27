"use server";

import { friendli } from "@friendliai/ai-provider";
import { generateText } from "ai";

const koreanPrompt = `You are a beautiful sentence generator for typing practice.
Please write a heart-touching sentence by referring to famous movies, music, literature, comics, etc.
Please use only Korean. Please make your answer short and concise.
Please avoid using special characters such as '"', '(', ')' as much as possible, as they interfere with typing practice.
Never mention the source or original of a sentence under any circumstances. It seriously reduces the quality of the sentence.
Even if a sentence has been translated, never say anything about it being translated.
End your sentences smoothly, always write literary.`;

const englishPrompt = `You are a beautiful sentence generator for typing practice
Please avoid using special characters such as '"', '(', ')' as much as possible, as they interfere with typing practice.
Choose more creative sentences instead of words that start with "The.."
`;

const koreanConfig = {
  model: friendli("meta-llama-3.1-8b-instruct"),
  temperature: 1.4,
  frequencyPenalty: 1.1,
  topP: 0.1,
  maxTokens: 50,
  system: koreanPrompt,
  prompt: "Please create a phrase for typing practice, just one sentence.",
};

const englishConfig = {
  model: friendli("meta-llama-3.1-8b-instruct"),
  temperature: 1,
  topP: 1,
  maxTokens: 50,
  system: englishPrompt,
  prompt: "Please create a phrase for typing practice, just one sentence.",
};

export async function nextSentencesGenerator(locale: "ko" | "en") {
  const { text } = await generateText({
    ...(locale === "ko" ? koreanConfig : englishConfig),
  });

  const textWithoutQuotes = text.replace(/^"([^"]+)"$/, "$1");
  return textWithoutQuotes;
}
