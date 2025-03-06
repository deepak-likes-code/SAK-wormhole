import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { getSupportedChainsTool } from "./tools/tokenTransfer";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import dotenv from "dotenv";

dotenv.config();

export const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini",
  temperature: 0,
});

// Use the default React agent prompt template
// This automatically includes the required variables: tools, tool_names, agent_scratchpad
const prompt = PromptTemplate.fromTemplate(`
You are a helpful assistant that can answer questions about the Debridge protocol.
You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!

Question: {input}
{agent_scratchpad}
`);

const tools = [getSupportedChainsTool];

const agent = await createReactAgent({
  llm,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
});

const result = await agentExecutor.invoke({
  input: "what chains are supported by wormhole?",
});

console.log(result);
