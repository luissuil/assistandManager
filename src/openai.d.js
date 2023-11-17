/**
 * @fileoverview Este archivo contiene todas las definiciones de tipos utilizadas en el proyecto.
 */

/**
 * Enumeration of OpenAI models.
 * @typedef {"gpt-4-1106-preview" | "gpt-4-vision-preview" | "gpt-4-0613" | "gpt-4-32k-0613" | "gpt-3.5-turbo-1106" | "gpt-3.5-turbo" | "gpt-3.5-turbo-16k" | "gpt-3.5-turbo-instruct"} OpenAIModels
 * @enum {string}
 */

let OpenAIModels

/**
 * @typedef {'code_interpreter' | 'retrieval' | 'function'} ToolType
 */

let ToolType

/**
 * @typedef {Object} Tool
 * @property {ToolType} type - Tool type.
 */

let Tool

/**
 * @typedef {Tool} CodeInterpreter
 * @property {'code_interpreter'} type - The tool type is 'code_interpreter'.
 */

let CodeInterpreter

/**
 * @typedef {Tool} Retrieval
 * @property {'retrieval'} type - The tool type is 'retrieval'.
 */

let Retrieval

/**
 * @typedef {Tool} FunctionTool
 * @property {'function'} type - The tool type is 'function'.
 * @property {string} name - Function name.
 * @property {string} description - Function description.
 */

let FunctionTool

/**
 * Represents a virtual assistant.
 * @typedef {Object} Assistant
 * @property {string} id - The unique identifier of the assistant.
 * @property {string} object - Object type.
 * @property {number} created_at - Timestamp of the assistant's creation.
 * @property {string} name - Assistant's name.
 * @property {?string} description - Assistant's description.
 * @property {string} model - Assistant's model.
 * @property {string} instructions - Instructions for the assistant.
 * @property {(CodeInterpreter|Retrieval|FunctionTool)[]} tools - Available tools for the assistant.
 * @property {string[]} file_ids - IDs of files associated with the assistant.
 * @property {Object} metadata - Additional metadata of the assistant.
 */

let Assistant

/**
 * @description is the OpenAI Threads object.
 * @typedef {Object} Thread
 * @property {string} id - The unique identifier of the thread.
 * @property {string} object - Object type.
 * @property {number} created_at - Timestamp of the thread's creation.
 * @property {object} metadata - Additional metadata of the thread.
 */

let Thread

/**
 * Represents a message within a thread.
 * @typedef {Object} Message
 * @property {string} id - The identifier, which can be referenced in API endpoints.
 * @property {string} object - The object type, always 'thread.message'.
 * @property {number} created_at - The Unix timestamp (in seconds) for when the message was created.
 * @property {string} thread_id - The thread ID that this message belongs to.
 * @property {role} role - The entity that produced the message. One of 'user' or 'assistant'.
 * @property {Array.<(ImageFile|Text)>} content - The content of the message in an array of text and/or images.
 * @property {string|null} assistant_id - If applicable, the ID of the assistant that authored this message.
 * @property {string|null} run_id - If applicable, the ID of the run associated with the authoring of this message.
 * @property {Array.<string>} file_ids - A list of file IDs that the assistant should use.
 * @property {Object.<string, string>} metadata - A map of key-value pairs for storing additional information.
 */

let Message

/**
 * References an image File in the content of a message.
 * @typedef {Object} ImageFile
 * @property {string} type - Always 'image_file'.
 * @property {Object} image_file - The details of the image file.
 * @property {string} image_file.file_id - The File ID of the image in the message content.
 */


let ImageFile

/**
 * The text content that is part of a message.
 * @typedef {Object} Text
 * @property {string} type - Always 'text'.
 * @property {Object} text - The text details.
 * @property {string} text.value - The data that makes up the text.
 * @property {Array.<(FileCitation|FilePath)>} annotations - An array of annotations like file citations or file paths.
 */

let Text

/**
 * A citation within the message that points to a specific quote from a specific File.
 * @typedef {Object} FileCitation
 * @property {string} type - Always 'file_citation'.
 * @property {string} text - The text in the message content that needs to be replaced.
 * @property {Object} file_citation - The file citation details.
 * @property {number} file_citation.start_index - The start index of the citation.
 * @property {number} file_citation.end_index - The end index of the citation.
 */

let FileCitation

/**
 * A URL for the file that's generated when the assistant uses the code_interpreter tool.
 * @typedef {Object} FilePath
 * @property {string} type - Always 'file_path'.
 * @property {string} text - The text in the message content that needs to be replaced.
 * @property {Object} file_path - The file path details.
 * @property {number} file_path.start_index - The start index of the file path.
 * @property {number} file_path.end_index - The end index of the file path.
 */

let FilePath

/**
 * @typedef {Object} role
 * @property {('assistants'|'user')} role
 */

export { Assistant, CodeInterpreter, FileCitation, FilePath, FunctionTool, ImageFile, Message, OpenAIModels, Retrieval, Text, Thread, Tool, ToolType };