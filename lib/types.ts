export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  model?: string;
  quality?: number;
  confidence?: number;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
}

export interface ModelConfig {
  id: string;
  name: string;
  enabled: boolean;
  temperature: number;
  maxTokens: number;
}