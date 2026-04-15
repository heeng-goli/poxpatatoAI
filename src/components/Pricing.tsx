import { motion } from "motion/react";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "0",
    desc: "Perfect for individuals exploring AI agents.",
    features: ["3 Active Agents", "1,000 Messages/mo", "Community Support", "Basic Analytics"]
  },
  {
    name: "Pro",
    price: "49",
    desc: "For power users and small teams scaling up.",
    features: ["Unlimited Agents", "50,000 Messages/mo", "Priority Support", "Advanced Analytics", "Custom Instructions"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Full control and dedicated infrastructure.",
    features: ["Dedicated Instances", "Unlimited Messages", "24/7 Support", "SLA Guarantee", "Custom Integrations"]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Simple, Transparent <span className="text-brand-primary">Pricing</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">Choose the plan that fits your intelligence needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass p-10 rounded-[2.5rem] flex flex-col ${plan.popular ? 'border-brand-primary/50 relative' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price === "Custom" ? "" : "$"}</span>
                  <span className="text-6xl font-bold tracking-tighter">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-white/30">/mo</span>}
                </div>
                <p className="text-white/50 mt-4 text-sm">{plan.desc}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-primary" />
                    </div>
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-brand-primary text-black hover:scale-[1.02]' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
