import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { tools } from "./agent";
import { RunnableSequence } from "@langchain/core/runnables";

export const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
});

const prompt = ChatPromptTemplate.fromTemplate(
  `
You are a helpful assistant that can answer questions about the Debridge protocol and have the tools to get the information you need.

You are given a question and a list of tokens.

You need to answer the question based on the list of tokens.


  `
);

const llm = model.bindTools(tools);

const result = await llm.invoke("What are the supported chains buy debridge?");

console.log(result);
