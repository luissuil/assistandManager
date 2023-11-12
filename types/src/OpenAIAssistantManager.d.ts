export default OpenAIAssistantManager;
declare class OpenAIAssistantManager {
    constructor(openaiClient: any);
    openaiClient: any;
    currentAssistantId: any;
    currentThreadId: any;
    initializeAssistant(assistantName: any, model: any): Promise<void>;
    submitQuestion(question: any): Promise<any>;
    getConversationHistory(): Promise<any>;
    getLastMessage(): Promise<any>;
}
