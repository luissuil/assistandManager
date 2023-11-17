class OpenAIAssistantManager {
  constructor(openaiClient) {
    this.openaiClient = openaiClient;
    this.currentAssistantId = null;
    this.currentThreadId = null;
  }

  async initializeAssistant(assistantName, model) {
    const assistant = await this.openaiClient.createAssistant(assistantName, model);
    this.currentAssistantId = assistant.id;
    this.createThread()
  }

  async getAssistant(id) {
    const assistant = await this.openaiClient.getAssistant(id);
    if(assistant) {
      this.currentAssistantId = assistant.id
      this.createThread()
    }else{
      return null
    }
      
  }

  async getSteps(runId) {
    if(this.currentThreadId !== null && this.currentAssistantId){
      const steps = await this.openaiClient.stepRun(this.currentThreadId, runId)
      return steps
    }else{
      return null
    }
  }

  async createThread() {
    const thread = await this.openaiClient.createThread();
    this.currentThreadId = thread.id;
  }

  async submitQuestion(question) {
    await this.openaiClient.sendMessage(this.currentThreadId, question);
    return this.openaiClient.executeThread(this.currentThreadId, this.currentAssistantId);
  }

  async getConversationHistory() {
    const chatHistory = await this.openaiClient.listMessages(this.currentThreadId);
    return chatHistory.data.map(message => message.content);
  }

  async getLastMessage() {
    const chatHistory = await this.openaiClient.listMessages(this.currentThreadId);
    if (chatHistory.data.length > 0) {
      const lastMessage = chatHistory.data[0];
      return lastMessage;
    }
    return null;
  }
}

export default OpenAIAssistantManager;
