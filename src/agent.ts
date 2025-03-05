import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";
import { config } from "dotenv";

config();

export const agent = new SolanaAgentKit(
  process.env.SOLANA_PRIVATE_KEY!,
  process.env.SOLANA_RPC_URL!,
  process.env.OPENAI_API_KEY!
);

export const tools = createSolanaTools(agent);
