export default OpenAIConversationManager;
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
 */
declare class OpenAIConversationManager {
    /**
     * Crea una instancia de OpenAIConversationManager.
     * @constructor
     * @param {Object} config - Configuración del asistente.
     * @param {string} config.apiKey - Clave de API de OpenAI.
     * @param {string} config.organization - Organización de OpenAI.
     */
    constructor(config: {
        apiKey: string;
        organization: string;
    });
    assistantManager: OpenAIAssistantManager;
    /**
     * Emisor de eventos.
     * @type {EventEmitterWrapper}
     */
    eventEmitter: EventEmitterWrapper;
    /**
     * Manejadores de ejecución.
     * @type {Object}
     * @property {Function} completed - Manejador de ejecución completada.
     * @property {Function} failed - Manejador de ejecución fallida.
     * @property {Function} cancelled - Manejador de ejecución cancelada.
     * @property {Function} expired - Manejador de ejecución expirada.
     */
    executionHandlers: any;
    /**
     * Inicializa el asistente con el nombre y modelo especificados.
     * @async
     * @param {Object} config - Configuración del asistente.
     * @param {string} config.name - Nombre del asistente.
     * @param {OpenAIModels} config.model - Modelo del asistente.
     * @param {string} config.instructions - Instrucciones del asistente.
     * @param {Array<string>} config.tools - Herramientas del asistente.
     *
     */
    initializeAssistant(config: {
        name: string;
        model: OpenAIModels;
        instructions: string;
        tools: Array<string>;
    }): Promise<void>;
    /**
     * Envía una pregunta al asistente.
     * @async
     * @param {string} question - Pregunta a enviar.
     * @returns {Promise<void>}
     */
    submitQuestion(question: string): Promise<void>;
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
    verifyExecutionStatus(executionId: string, retryCount?: number): Promise<void>;
    /**
     * Manejador de ejecución completada.
     * @async
     * @param {string} executionId - ID de la ejecución.
     * @returns {Promise<void>}
     */
    handleCompleted(executionId: string): Promise<void>;
    /**
     * Manejador de estado de ejecución fallida o cancelada/expirada.
     * @async
     * @param {string} executionId - ID de la ejecución.
     * @param {string} status - Estado de la ejecución.
     * @returns {Promise<void>}
     */
    handleErrorState(executionId: string, status: string): Promise<void>;
    /**
     * Agrega un listener de eventos.
     * @param {string} event - Nombre del evento.
     * @param {Function} listener - Listener del evento.
     * @returns {void}
     */
    onEvent(event: string, listener: Function): void;
}
import OpenAIAssistantManager from "./OpenAIAssistantManager.js";
import EventEmitterWrapper from "./EventEmitterWrapper.js";
import OpenAIModels from "./models.js";
