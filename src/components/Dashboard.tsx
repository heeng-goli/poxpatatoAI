import { motion } from "motion/react";
import { Bot, Plus, Settings, MessageSquare, Users, Activity } from "lucide-react";
import { useState } from "react";
import { Agent, UserProfile } from "../types";
import Chat from "./Chat";
import { User } from "firebase/auth";

const MOCK_AGENTS: Agent[] = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles common customer inquiries.",
    systemInstruction: "You are a helpful support agent.",
    createdBy: "user1",
    createdAt: new Date().toISOString(),
    status: "active"
  },
  {
    id: "2",
    name: "Data Analyst",
    description: "Analyzes complex datasets and provides insights.",
    systemInstruction: "You are a data scientist.",
    createdBy: "user1",
    createdAt: new Date().toISOString(),
    status: "active"
  }
];

export default function Dashboard({ user, profile }: { user: User | null, profile: UserProfile | null }) {
  const [agents] = useState<Agent[]>(MOCK_AGENTS);
  const [activeChat, setActiveChat] = useState<{ id: string, name: string } | null>(null);

  if (activeChat) {
    return <Chat agentId={activeChat.id} agentName={activeChat.name} user={user} onBack={() => setActiveChat(null)} />;
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">Agent Dashboard</h2>
          <p className="text-white/50">Manage and monitor your autonomous intelligence fleet.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-primary text-black font-bold hover:scale-105 transition-transform">
          <Plus className="w-5 h-5" />
          Create New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {[
          { label: "Total Agents", value: "12", icon: Bot },
          { label: "Active Sessions", value: "1,284", icon: Activity },
          { label: "Total Users", value: "450", icon: Users },
          { label: "Messages Sent", value: "45.2k", icon: MessageSquare }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-6 h-6 text-brand-primary" />
              <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Live</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-white/50">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <motion.div 
            key={agent.id}
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-[2rem] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Settings className="w-5 h-5 text-white/50" />
              </button>
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6 text-brand-primary" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
            <p className="text-white/50 text-sm mb-6 line-clamp-2">{agent.description}</p>
            
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Active</span>
              </div>
              <button 
                onClick={() => setActiveChat({ id: agent.id, name: agent.name })}
                className="text-sm font-bold text-brand-primary hover:underline"
              >
                Launch Chat
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
