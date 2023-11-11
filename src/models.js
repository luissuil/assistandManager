/**
 * Enumeración de los modelos de OpenAI.
 * @typedef {"gpt-4-1106-preview" | "gpt-4-vision-preview" | "gpt-4-0613" | "gpt-4-32k-0613" | "gpt-3.5-turbo-1106" | "gpt-3.5-turbo" | "gpt-3.5-turbo-16k" | "gpt-3.5-turbo-instruct"} OpenAIModels
 * @enum {string}
 */
const OpenAIModels = Object.freeze({
  /**
   * GPT-4 Turbo - El modelo GPT-4 más reciente con mejor seguimiento de instrucciones, modo JSON, salidas reproducibles, llamadas a funciones en paralelo y más. Devuelve un máximo de 4,096 tokens de salida. Modelo en vista previa, no apto aún para tráfico de producción.
   * Ventana de contexto: 128,000 tokens
   * Datos de entrenamiento: Hasta abril de 2023
   */
  GPT4_1106_PREVIEW: "gpt-4-1106-preview",

  /**
   * GPT-4 Turbo con capacidad visual - Añade la habilidad de entender imágenes a las capacidades de GPT-4 Turbo. Devuelve un máximo de 4,096 tokens de salida. Versión de modelo en vista previa, no apta aún para tráfico de producción.
   * Ventana de contexto: 128,000 tokens
   * Datos de entrenamiento: Hasta abril de 2023
   */
  GPT4_VISION_PREVIEW: "gpt-4-vision-preview",

  /**
   * GPT-4 - Modelo base con una ventana de contexto estándar. Punto actual a gpt-4-0613.
   * Ventana de contexto: 8,192 tokens
   * Datos de entrenamiento: Hasta septiembre de 2021
   */
  GPT4: "gpt-4-0613",

  /**
   * GPT-4 con ventana de contexto extendida - Versión de GPT-4 con una ventana de contexto ampliada. Punto actual a gpt-4-32k-0613.
   * Ventana de contexto: 32,768 tokens
   * Datos de entrenamiento: Hasta septiembre de 2021
   */
  GPT4_32K: "gpt-4-32k-0613",

  /**
   * GPT-3.5 Turbo actualizado - El último modelo GPT-3.5 Turbo con mejor seguimiento de instrucciones, modo JSON, salidas reproducibles, llamadas a funciones en paralelo y más. Devuelve un máximo de 4,096 tokens de salida.
   * Ventana de contexto: 16,385 tokens
   * Datos de entrenamiento: Hasta septiembre de 2021
   */
  GPT3_5_TURBO_1106: "gpt-3.5-turbo-1106",

  /**
   * GPT-3.5 Turbo - Modelo base de GPT-3.5 con capacidades Turbo. Apuntará a gpt-3.5-turbo-1106 a partir del 11 de diciembre de 2023.
   * Ventana de contexto: 4,096 tokens
   * Datos de entrenamiento: Hasta septiembre de 2021
   */
  GPT3_5_TURBO: "gpt-3.5-turbo",

  /**
   * GPT-3.5 Turbo con ventana de contexto extendida - Versión de GPT-3.5 Turbo con una ventana de contexto ampliada. Apuntará a gpt-3.5-turbo-1106 a partir del 11 de diciembre de 2023.
   * Ventana de contexto: 16,385 tokens
   * Datos de entrenamiento: Hasta septiembre de 2021
   */
  GPT3_5_TURBO_16K: "gpt-3.5-turbo-16k",
});


export default OpenAIModels;
