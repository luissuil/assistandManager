export default EventEmitterWrapper;
/**
 * A wrapper class for EventEmitter.
 */
/**
 * Clase que envuelve la funcionalidad de EventEmitter de Node.js
 * @class
 * @property {EventEmitter} eventEmitter - Instancia de EventEmitter
 */
declare class EventEmitterWrapper {
    /**
     * Instancia de EventEmitter
     * @type {EventEmitter}
     */
    eventEmitter: EventEmitter;
    /**
     * Emite un evento con los datos especificados
     * @param {string} event - Nombre del evento a emitir
     * @param {*} data - Datos a enviar junto con el evento
     */
    emit(event: string, data: any): void;
    /**
     * Registra un listener para el evento especificado
     * @param {string} event - Nombre del evento a escuchar
     * @param {Function} listener - Función que se ejecutará cuando se emita el evento
     */
    on(event: string, listener: Function): void;
}
import { EventEmitter } from "events";
