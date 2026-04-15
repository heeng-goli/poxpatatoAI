import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User as UserIcon, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatMessage } from "../types";
import { generateAgentResponse, saveMessage } from "../services/aiService";
import { User } from "firebase/auth";

export default function Chat({ agentId, agentName, user, onBack }: { 
  agentId: string, 
  agentName: string, 
  user: User | null,
  onBack: () => void 
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      agentId,
      userId: user?.uid || "anonymous",
      role: "user",
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Save user message to Firestore
    if (user) {
      saveMessage("session_" + agentId, user.uid, agentId, "user", input);
    }

    try {
      const response = await generateAgentResponse(input);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        agentId,
        userId: user?.uid || "anonymous",
        role: "assistant",
        content: response || "I'm sorry, I couldn't generate a response.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Save assistant message to Firestore
      if (user) {
        saveMessage("session_" + agentId, user.uid, agentId, "assistant", response || "");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-bg-dark flex flex-col">
      <header className="glass p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-bold">{agentName}</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
            <Bot className="w-16 h-16 mb-4" />
            <p className="text-lg">Start a conversation with {agentName}</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-brand-primary/20'}`}>
                {msg.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5 text-brand-primary" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-brand-primary text-black font-medium' : 'glass'}`}>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="glass p-4 rounded-2xl flex gap-1">
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-white/50" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 glass border-t border-white/5">
        <div className="container mx-auto max-w-4xl relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${agentName}...`}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-brand-primary/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-brand-primary text-black hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
