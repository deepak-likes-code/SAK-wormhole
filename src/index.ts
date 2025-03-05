import { agent } from "./agent";

// const supportedChains = await agent.getDebridgeSupportedChains();

const supportedTokens = await agent.getDebridgeTokensInfo("1");

console.log(supportedTokens);
