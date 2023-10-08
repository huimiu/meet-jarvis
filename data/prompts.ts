export interface ChatModel {
  role: string;
  content: string;
}

export interface Prompt {
  id: string;
  name: string;
  messages: ChatModel[];
  tags: string[];
}
