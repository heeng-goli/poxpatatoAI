export type UserRole = 'admin' | 'user';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  systemInstruction: string;
  createdBy: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface ChatMessage {
  id: string;
  agentId: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
