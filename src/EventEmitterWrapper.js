import { EventEmitter } from "events";

/**
 * A wrapper class for EventEmitter.
 */
/**
 * Clase que envuelve la funcionalidad de EventEmitter de Node.js
 * @class
 * @property {EventEmitter} eventEmitter - Instancia de EventEmitter
 */
class EventEmitterWrapper {
    /**
     * Crea una instancia de EventEmitterWrapper
     */
    constructor() {
        /**
         * Instancia de EventEmitter
         * @type {EventEmitter}
         */
        this.eventEmitter = new EventEmitter();
    }

    /**
     * Emite un evento con los datos especificados
     * @param {string} event - Nombre del evento a emitir
     * @param {*} data - Datos a enviar junto con el evento
     */
    emit(event, data) {
        this.eventEmitter.emit(event, data);
    }

    /**
     * Registra un listener para el evento especificado
     * @param {string} event - Nombre del evento a escuchar
     * @param {Function} listener - Función que se ejecutará cuando se emita el evento
     */
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
}

export default EventEmitterWrapper;
