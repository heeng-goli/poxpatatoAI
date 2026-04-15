import { motion } from "motion/react";
import { Zap, Shield, Cpu, Globe, Code, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Execution",
    desc: "Our proprietary engine ensures your agents respond in milliseconds, not seconds."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade encryption and granular role-based access control for your data."
  },
  {
    icon: Cpu,
    title: "Neural Orchestration",
    desc: "Advanced multi-agent coordination for complex, multi-step autonomous tasks."
  },
  {
    icon: Globe,
    title: "Global Scale",
    desc: "Deploy agents across multiple regions with automatic load balancing."
  },
  {
    icon: Code,
    title: "Developer First",
    desc: "Robust API and SDKs to integrate poxpatatoAI into your existing workflow."
  },
  {
    icon: Layers,
    title: "Custom Models",
    desc: "Bring your own fine-tuned models or use our optimized foundation models."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 bg-bg-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            Engineered for the <span className="text-brand-primary">Next Era</span>
          </motion.h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            poxpatatoAI provides the infrastructure you need to build truly autonomous systems that learn, adapt, and execute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[2.5rem] hover:border-brand-primary/30 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
