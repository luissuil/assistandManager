import readline from "readline";
import OpenAIConversationManager from "../src/index.js";
import OpenAI from "openai";
import { config } from "dotenv";
config();

// Configura readline para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Reemplaza 'tu-api-key' con tu clave API real de OpenAI
const conversationManager = new OpenAIConversationManager({
  apiKey: process.env.OPENAI_API_KEY,
});


try {
  // Inicializa el asistente de OpenAI
  await conversationManager.initializeAssistant({
    name: "asistente virtual",
    model: "gpt-4-0613",
    instructions:
      "Eres un asistente virtual que ayuda a los desarrolladores a crear aplicaciones.",
    tools: [{ type: "code_interpreter" }, {type:"retriever"}],
  });

  console.log("Asistente de OpenAI inicializado. Puedes comenzar a chatear.");
  rl.setPrompt("Tú: ");
  rl.prompt();

  rl.on("line", (line) => {
    conversationManager.submitQuestion(line.trim());
  });

  // Configura el manejador de eventos para recibir respuestas
  conversationManager.onEvent("responseReceived", (response) => {
    if (response.role === "assistant") {
      console.log(`Asistente: ${response.content[0].text.value}`);
      rl.setPrompt("Tú: ");
    } else {
      console.log(`Tú: ${response.content[0].text.value}`);
      rl.setPrompt("Asistente: ");
    }

    rl.prompt();
  });


  conversationManager.onEvent("error", (error) => {
    console.error(`Error: ${error}`);
    rl.setPrompt("Tú: ");
    rl.prompt();
  });
} catch (error) {
  console.error(`Error al inicializar el asistente: ${error}`);
}
