
import readline from "node:readline";
import OpenAIConversationManager from "../src/index.js";

import { config } from "dotenv";
import { stdout } from "node:process";
import { CodeInterpreter } from "../src/openai.d.js";
config();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const conversationManager = new OpenAIConversationManager({
  apiKey: process.env.OPENAI_API_KEY,
});
  

try {

  await conversationManager.getAssistant("asst_x129roTTOQTWADazkJCIsAW3");

  console.log("Asistente de OpenAI inicializado. Puedes comenzar a chatear.");
  rl.setPrompt("Tú: ");
  rl.prompt();

  rl.on("line", (line) => {
    conversationManager.submitQuestion(line.trim());
  })

  conversationManager.on('response', ({response,status}) => {
    if (response.role === "assistant") {
      console.log(status)
      console.log(`Asistente: ${response.content[0].text.value}`);
      rl.setPrompt("Tú: ");
    } else {
      console.log(`Tú: ${response.content[0].text.value} `);
      rl.setPrompt("Asistente: ");
    }

    rl.prompt();
  })

  conversationManager.on('status', (status) => {
    /* delete line and console.log */
    stdout.clearLine();
    console.log(status.stepRun)
  })


  conversationManager.on("error", (error) => {
    console.error(`Error: ${error}`);
    rl.setPrompt("Tú: ");
    rl.prompt();
  })
} catch (error) {
  console.error(`Error al inicializar el asistente: ${error}`);
}
