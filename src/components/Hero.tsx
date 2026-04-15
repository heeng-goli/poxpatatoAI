import { motion } from "motion/react";
import { Bot, Zap, Shield, Cpu } from "lucide-react";

export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest uppercase mb-6 text-brand-primary">
              The Future of Autonomous Intelligence
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
              Build the Next Generation of <span className="text-glow">AI Agents</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl mx-auto">
              poxpatatoAI provides a premium platform for orchestrating, managing, and scaling autonomous agents with enterprise-grade security and role-based access.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 rounded-full bg-brand-primary text-black font-bold text-lg hover:scale-105 transition-transform"
              >
                Get Started Free
              </button>
              <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors">
                View Documentation
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Zap, title: "Ultra Fast", desc: "Low-latency agent execution engine." },
              { icon: Shield, title: "Secure", desc: "Enterprise-grade encryption and RBAC." },
              { icon: Cpu, title: "Scalable", desc: "Deploy thousands of agents seamlessly." }
            ].map((feature, i) => (
              <div key={i} className="glass p-8 rounded-3xl text-left hover:border-white/20 transition-colors group">
                <feature.icon className="w-10 h-10 text-brand-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/50">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
