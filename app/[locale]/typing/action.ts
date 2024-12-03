"use server";

import { friendli } from "@friendliai/ai-provider";
import { generateText } from "ai";

const koreanPrompt = `You are a beautiful sentence generator for typing practice.
Please write a heart-touching sentence by referring to famous movies, music, literature, comics, etc.
Please use only Korean. Please make your answer short and concise.
End your sentences smoothly, always write literary.`;

const englishPrompt = `You are a beautiful sentence generator for typing practice.`;

const koreanConfig = {
  model: friendli("meta-llama-3.1-8b-instruct", {
    regex: "[\n ,.?!0-9\uac00-\ud7af]*",
  }),
  temperature: 1.4,
  frequencyPenalty: 1.1,
  topP: 0.1,
  maxTokens: 50,
  system: koreanPrompt,
  prompt: "Please create a phrase for typing practice, just one sentence.",
};

const englishConfig = {
  model: friendli("meta-llama-3.1-8b-instruct", {
    regex: "[\n ,.?!0-9a-zA-Z]*",
  }),
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
