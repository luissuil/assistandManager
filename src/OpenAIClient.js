// @ts-nocheck
import OpenAI from "openai";
import { Assistant } from "./openai.d.js";

/**
 * Clase que representa un cliente de OpenAI.
 * @class
 */
class OpenAIClient {
  /**
   * @param {Assistant} config
   * 
   * @returns {Promise<Assistant>}
   * 
   */
  constructor(config) {
    this.client = new OpenAI(config);
  }

  /**
   * Crea un asistente virtual.
   * @async
   * @param {Object} config - La configuración del asistente virtual.
   * @param {string} config.name - El nombre del asistente virtual.
   * @param {OpenAIModels} config.model - El modelo del asistente virtual.
   * @param {string} config.instructions - Las instrucciones del asistente virtual.
   * @param {Array<{type: string}>} config.tools - Las herramientas del asistente virtual.
   *
   * @returns {Promise<Object>} - Una promesa que se resuelve con el asistente virtual creado.
   */
  async createAssistant(config) {
    return this.client.beta.assistants.create(config);
  }

  async getAssistant(assistantId) {
    const assistant = await this.client.beta.assistants.retrieve(assistantId);

    if (assistant) {
      return assistant;
    } else {
      console.error(`No se encontró el asistente con ID ${assistantId}.`);
    }
  }



  /**
   * Crea un hilo de conversación.
   * @async
   * @returns {Promise<Object>} - Una promesa que se resuelve con el hilo de conversación creado.
   */
  async createThread() {
    return this.client.beta.threads.create();
  }
  

  /**
   * Envía un mensaje a un hilo de conversación.
   * @async
   * @param {string} threadId - El ID del hilo de conversación.
   * @param {string} message - El mensaje a enviar.
   * @returns {Promise<Object>} - Una promesa que se resuelve con el mensaje enviado.
   */
  async sendMessage(threadId, message) {
    return this.client.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });
  }

  /**
   * Ejecuta un hilo de conversación con un asistente virtual.
   * @async
   * @param {string} threadId - El ID del hilo de conversación.
   * @param {string} assistantId - El ID del asistente virtual.
   * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la ejecución del hilo de conversación.
   */
  async executeThread(threadId, assistantId) {
    console.log(`threadId ${threadId} assistantId ${assistantId}`)
    return this.client.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
  }

  async stepRun(threadId, executionId) {
    return await this.client.beta.threads.runs.steps.list(threadId, executionId)
  }

  /**
   * Obtiene el resultado de la ejecución de un hilo de conversación.
   * @async
   * @param {string} threadId - El ID del hilo de conversación.
   * @param {string} executionId - El ID de la ejecución del hilo de conversación.
   * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la ejecución del hilo de conversación.
   */
  async retrieveExecution(threadId, executionId) {
    return this.client.beta.threads.runs.retrieve(threadId, executionId);
  }

  /**
   * Obtiene la lista de mensajes de un hilo de conversación.
   * @async
   * @param {string} threadId - El ID del hilo de conversación.
   * @returns {Promise<Object>} - Una promesa que se resuelve con la lista de mensajes del hilo de conversación.
   */
  async listMessages(threadId) {
    return this.client.beta.threads.messages.list(threadId);
  }
}

export default OpenAIClient;
