# AssistantManager

## Descripción

`AssistantManagerjs` es una clase moderna de JavaScript diseñada para facilitar la interacción con la API de OpenAI. Esta clase encapsula la lógica necesaria para inicializar asistentes de OpenAI, enviar preguntas y gestionar respuestas, y manejar eventos de ejecución de manera eficiente.

## Características

- Inicialización y manejo de asistentes de OpenAI.
- Envío de preguntas y manejo de respuestas en tiempo real.
- Recuperación de la historia completa de la conversación o del último mensaje.
- Manejo avanzado de eventos para respuestas y errores.
- Implementación de Top-Level Await para operaciones asíncronas.

## Requisitos Previos

- Node.js instalado en tu sistema.
- Una clave API de OpenAI.
- Conocimientos básicos de JavaScript y Node.js.

## Instalación

- usa `npm` para instalar el paquete:

```bash
npm install assistant-manager
```

tambien puedes usar `yarn`:

```bash
yarn add assistant-manager
```

o `pnpm`:

```bash
pnpm add assistant-manager
```

## Configuración

Crea un archivo `.env` en el directorio raíz del proyecto y añade tu clave API de OpenAI:

```
OPENAI_API_KEY=tu_clave_api_aquí
```

## Uso

### Inicialización de la Clase

```javascript
import OpenAIConversationManager from './OpenAIConversationManager.js';

const manager = new OpenAIConversationManager({
  apiKey: process.env.OPENAI_API_KEY,
  organization: 'tu_organización'
});
```

### Inicializar un Asistente y Enviar Preguntas

```javascript
await manager.initializeAssistant({
  name: 'AsistenteMatemático',
  model: 'davinci-codex',
  instructions: 'Responde preguntas matemáticas.',
  tools: ['code_interpreter']
});

await manager.submitQuestion('¿Cuál es la raíz cuadrada de 144?');
```

### Manejar Eventos

```javascript
manager.onEvent('responseReceived', response => {
  console.log('Respuesta recibida:', response);
});

manager.onEvent('error', error => {
  console.error('Error:', error);
});
```
## Documentación de OpenAI

Para más información sobre la API de OpenAI, consulta la [documentación de referencia de la API](https://platform.openai.com/docs/api-reference) y la [visión general de la plataforma](https://platform.openai.com/docs/overview).


## Contribuciones

Las contribuciones son bienvenidas. Por favor, envía tus pull requests a la rama principal.

## Licencia

Este proyecto se distribuye bajo la licencia MIT.np