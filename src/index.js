import OpenAIClient from "./OpenAIClient.js";
import OpenAIAssistantManager from "./OpenAIAssistantManager.js";
import EventEmitterWrapper from "./EventEmitterWrapper.js";
import {Assistant,Message} from "./openai.d.js";

/**
 * Clase que maneja la conversación con OpenAI.
 * @class
 * @property {OpenAIAssistantManager} assistantManager - Manejador de asistente de OpenAI.
 * @property {EventEmitterWrapper} eventEmitter - Emisor de eventos.
 * @property {Object} executionHandlers - Manejadores de ejecución.
 * @property {Function} executionHandlers.completed - Manejador de ejecución completada.
 * @property {Function} executionHandlers.failed - Manejador de ejecución fallida.
 * @property {Function} executionHandlers.cancelled - Manejador de ejecución cancelada.
 * @property {Function} executionHandlers.expired - Manejador de ejecución expirada.
 * @property {Function} executionHandlers.
 */
class OpenAIConversationManager {
  /**
   * Crea una instancia de OpenAIConversationManager.
   * @constructor
   * @param {Object} config - Configuración del asistente.
   * @param {string} config.apiKey - Clave de API de OpenAI.
   * @param {string} config.organization - Organización de OpenAI.
   */
  constructor(config) {
    /**
     * Manejador de asistente de OpenAI.
     * @type {OpenAIAssistantManager}
     */
    const openaiClient = new OpenAIClient(config = {
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
    });
    this.assistantManager = new OpenAIAssistantManager(openaiClient);

    /**
     * Emisor de eventos.
     * @type {EventEmitterWrapper}
     */
    this.eventEmitter = new EventEmitterWrapper();

    /**
     * Manejadores de ejecución.
     * @type {Object}
     * @property {Function} completed - Manejador de ejecución completada.
     * @property {Function} failed - Manejador de ejecución fallida.
     * @property {Function} cancelled - Manejador de ejecución cancelada.
     * @property {Function} expired - Manejador de ejecución expirada.
     */
    this.executionHandlers = {
      completed: this.handleCompleted.bind(this),
      failed: this.handleErrorState.bind(this),
      cancelled: this.handleErrorState.bind(this),
      expired: this.handleErrorState.bind(this),
    };
  }

  /**
   * Inicializa el asistente con el nombre y modelo especificados.
   * @async
   * @param {Assistant} config - Configuración del asistente.
   * 
   * @returns {Promise<Assistant>} - Una promesa que se resuelve con el asistente inicializado.
   *
   */
  async initializeAssistant(config) {
    try {
      await this.assistantManager.createAssistant(config)
    } catch (error) {
      this.eventEmitter.emit(
        "error",
        `Error al inicializar el asistente: ${error}`
      );
    }
    
  }
  /**
   * Obtiene el asistente con el ID especificado.
   * @async
   * @param {string} id - ID del asistente.
   * 
   */

  async getAssistant(id) {
    await this.assistantManager.getAssistant(id);
  }
  

  /**
   * Envía una pregunta al asistente.
   * @async
   * @param {Message} question - Enviar 
   * @returns {Promise<Message>}
   */
  async submitQuestion(question) {
    try {
      const execution = await this.assistantManager.submitQuestion(question);
      this.verifyExecutionStatus(execution.id);
    } catch (error) {
      this.eventEmitter.emit("error", `Error al enviar la pregunta: ${error}`);
    }
  }

  /**
   * Verifica el estado de una ejecución en un modelo de Lenguaje de Gran Escala (LLM) y realiza reintentos con back-off exponencial si es necesario.
   *
   * @param {string} executionId - El identificador único de la ejecución cuyo estado se debe verificar.
   * @param {number} retryCount - Contador actual de reintentos, utilizado para calcular el tiempo de espera en el back-off exponencial.
   * @async
   * @returns {Promise<void>} Una promesa que se resuelve cuando la verificación de estado es exitosa o cuando se alcanza el máximo de reintentos.
   *
   * Funcionamiento:
   * 1. Intenta recuperar el resultado de la ejecución usando el `executionId`.
   * 2. Verifica el estado de la ejecución.
   * 3. Si hay un manejador definido para el estado, lo invoca.
   * 4. Si el estado aún no está finalizado y no se ha alcanzado el máximo de reintentos, espera un tiempo calculado mediante back-off exponencial.
   * 5. Si se alcanza el máximo de reintentos, emite un evento de error.
   * 6. Captura y maneja cualquier error que ocurra durante el proceso.
   *
   * El back-off exponencial:
   * - Comienza con un tiempo base de espera y lo duplica en cada reintento, hasta un tiempo máximo definido.
   * - Esto ayuda a evitar sobrecargas en el sistema y manejar mejor las situaciones de alta latencia o respuestas retardadas.
   */
  async verifyExecutionStatus(executionId, retryCount = 0) {
    const MAX_RETRIES = 14; // Máximo número de reintentos
    const BASE_DELAY = 500; // Tiempo base de espera en milisegundos
    const MAX_DELAY = 5000; // Tiempo máximo de espera en milisegundos

    try {
      const executionResult =
        await this.assistantManager.openaiClient.retrieveExecution(
          this.assistantManager.currentThreadId,
          executionId
        );
      const executionStatus = executionResult.status;
      const stepRun = await this.assistantManager.getSteps(executionId);
      const handler = this.executionHandlers[executionStatus];
      if (handler) {
        handler(executionId, executionStatus);
      } else if (retryCount < MAX_RETRIES) {
          const delay = Math.min(MAX_DELAY, BASE_DELAY * Math.pow(2, retryCount));        
        await new Promise((resolve) => setTimeout(resolve, delay));
        this.getStatusChanger({status:executionStatus,stepRun});
        await this.verifyExecutionStatus(executionId, retryCount + 1);
      } else {
        this.eventEmitter.emit(
          "error",
          `Se alcanzó el máximo número de reintentos para la ejecución: ${executionId}`
        );
      }
    } catch (error) {
      this.eventEmitter.emit(
        "error",
        `Error al verificar el estado de la ejecución: ${error}`
      );
    }
  }

  /**
   * Manejador de ejecución completada.
   * @async
   * @param {string} _executionId - ID de la ejecución.
   * @returns {Promise<void>}
   */
  async handleCompleted(_executionId, status) {
    const run = await this.assistantManager.getSteps(_executionId);
    console.log(run)
    /**
     * @type {Message}
     */
    const response = await this.assistantManager.getLastMessage();
    this.eventEmitter.emit('response', {response});
  }

  /**
   * Manejador de estado de ejecución fallida o cancelada/expirada.
   * @async
   * @param {string} executionId - ID de la ejecución.
   * @param {string} status - Estado de la ejecución.
   * @returns {Promise<void>}
   */
  handleErrorState(executionId, status) {
    this.eventEmitter.emit(
      "error",
      `Ejecución fallida o cancelada/expirada. Estado: ${status}
       ID de ejecución: ${executionId}
      `
    );
  }
  
  /**
   * Get status changer
   * @param {string} staus - Estado de la ejecución.
   * @returns {Promise<void>}
   */
  getStatusChanger(staus) {
    return this.eventEmitter.emit('status', staus);
  }

  /**
   * Agrega un listener de eventos.
   * @param {string} event - Nombre del evento.
   * @param {Function} listener - Listener del evento.
   * @returns {void}
   */
  on(event, listener) {
    this.eventEmitter.on(event, listener);
  }

  
}

export default OpenAIConversationManager;
