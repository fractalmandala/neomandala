type Role = 'system' | 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

interface Chat {
  id: string;
  messages: Message[];
  title?: string; // The title will be added after at least 2 user messages
}
