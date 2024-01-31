import { OpenAI } from "langchain/llms/openai";

const llm = new OpenAI({
  openAIApiKey: "sk-aUThp3pSbiLLsnAK3Sv0T3BlbkFJ7dx6qY3nN83mBFd2tRNFOUR_OPENAI_KEY",
  model: "gpt-3.5-turbo",
  temperature: 0
});

const res = await llm.call("List all red berries");

console.log(res)

//--------------------------------------
/** 
const openai = new OpenAI({
  apiKey: process.env['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'], // This is the default and can be omitted
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });
}

main();*/