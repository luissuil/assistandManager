export default OpenAIClient;
/**
 * Clase que representa un cliente de OpenAI.
 * @class
 */
declare class OpenAIClient {
    /**
     * Crea una instancia de OpenAIClient.
     * @constructor
     * @param {Object} config - La configuración del cliente de OpenAI.
     * @param {string} config.apiKey - La clave de API de OpenAI.
     * @param {string} config.organization - La organización de OpenAI.
     */
    constructor(config: {
        apiKey: string;
        organization: string;
    });
    client: OpenAI;
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
    createAssistant(config: {
        name: string;
        model: OpenAIModels;
        instructions: string;
        tools: Array<{
            type: string;
        }>;
    }): Promise<any>;
    /**
     * Crea un hilo de conversación.
     * @async
     * @returns {Promise<Object>} - Una promesa que se resuelve con el hilo de conversación creado.
     */
    createThread(): Promise<any>;
    /**
     * Envía un mensaje a un hilo de conversación.
     * @async
     * @param {string} threadId - El ID del hilo de conversación.
     * @param {string} message - El mensaje a enviar.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el mensaje enviado.
     */
    sendMessage(threadId: string, message: string): Promise<any>;
    /**
     * Ejecuta un hilo de conversación con un asistente virtual.
     * @async
     * @param {string} threadId - El ID del hilo de conversación.
     * @param {string} assistantId - El ID del asistente virtual.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la ejecución del hilo de conversación.
     */
    executeThread(threadId: string, assistantId: string): Promise<any>;
    /**
     * Obtiene el resultado de la ejecución de un hilo de conversación.
     * @async
     * @param {string} threadId - El ID del hilo de conversación.
     * @param {string} executionId - El ID de la ejecución del hilo de conversación.
     * @returns {Promise<Object>} - Una promesa que se resuelve con el resultado de la ejecución del hilo de conversación.
     */
    retrieveExecution(threadId: string, executionId: string): Promise<any>;
    /**
     * Obtiene la lista de mensajes de un hilo de conversación.
     * @async
     * @param {string} threadId - El ID del hilo de conversación.
     * @returns {Promise<Object>} - Una promesa que se resuelve con la lista de mensajes del hilo de conversación.
     */
    listMessages(threadId: string): Promise<any>;
}
import OpenAI from "openai";
import OpenAIModels from "./models.js";
