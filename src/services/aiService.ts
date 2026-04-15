import { GoogleGenAI } from "@google/genai";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.error(`Firestore Error [${operationType}] at [${path}]:`, error);
  throw error;
}

export async function generateAgentResponse(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a helpful AI agent.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

export async function saveMessage(chatId: string, userId: string, agentId: string, role: 'user' | 'assistant', content: string) {
  const path = `chats/${chatId}/messages`;
  try {
    await addDoc(collection(db, path), {
      agentId,
      userId,
      role,
      content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
