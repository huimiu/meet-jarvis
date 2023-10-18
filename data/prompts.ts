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

export interface PromptTable {
  id: string;
  name: string;
  messages: string;
  tags: string;
}
