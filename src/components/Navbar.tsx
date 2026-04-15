import { motion } from "motion/react";
import { Bot, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { User } from "firebase/auth";

export default function Navbar({ onDashboardClick, onLandingClick, onFeaturesClick, onPricingClick, onLogin, onLogout, user }: { 
  onDashboardClick: () => void, 
  onLandingClick: () => void,
  onFeaturesClick: () => void,
  onPricingClick: () => void,
  onLogin: () => void,
  onLogout: () => void,
  user: User | null
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={onLandingClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bot className="w-8 h-8 text-brand-primary" />
            <span className="text-xl font-bold tracking-tighter">POXPATATO AI</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={onFeaturesClick} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</button>
            <button onClick={onDashboardClick} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Agents</button>
            <button onClick={onPricingClick} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</button>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <UserIcon className="w-4 h-4 text-brand-primary" />
                  <span className="text-xs font-medium truncate max-w-[100px]">{user.displayName}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-white/5 p-6 flex flex-col gap-4"
        >
          <button onClick={() => { onFeaturesClick(); setIsOpen(false); }} className="text-lg font-medium text-left">Features</button>
          <button onClick={() => { onDashboardClick(); setIsOpen(false); }} className="text-lg font-medium text-left">Agents</button>
          <button onClick={() => { onPricingClick(); setIsOpen(false); }} className="text-lg font-medium text-left">Pricing</button>
          {user ? (
            <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold">
              Sign Out
            </button>
          ) : (
            <button onClick={() => { onLogin(); setIsOpen(false); }} className="w-full py-3 rounded-xl bg-white text-black font-bold">
              Sign In
            </button>
          )}
        </motion.div>
      )}
    </nav>
  );
}
