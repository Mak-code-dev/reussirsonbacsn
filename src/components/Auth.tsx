import React, { useState, useEffect } from 'react';
import { GraduationCap, Mail, Lock, User, School, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthProps {
  onLoginSuccess: (studentData: { name: string; school: string; email: string }) => void;
}

export default function Auth({ onLoginSuccess }: AuthProps) {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('Lycée Mame Yelli Badiane');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleStep, setGoogleStep] = useState(0); // 0:Idle, 1:Connecting, 2:Verified, 3:Done

  // Motivational quote rotator
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "« la réussite est le fruit de l'effort constant et de l'organisation. »",
    "« l'apprentissage est un trésor qui suivra son propriétaire partout. »",
    "« n'abandonnez jamais, vous êtes plus proche de votre réussite que vous ne le croyez. »",
    "« le baccalauréat se prépare jour après jour, révision après révision. »",
    "« la persévérance surpasse tous les obstacles de l'examen. »"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onLoginSuccess({
      name: name,
      school: school || 'Lycée de Dakar',
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`
    });
  };

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    setGoogleStep(1);

    // Simulated Google Authentication flow
    setTimeout(() => {
      setGoogleStep(2);
      setTimeout(() => {
        setGoogleStep(3);
        setTimeout(() => {
          onLoginSuccess({
            name: 'MAK Élève',
            school: 'Lycée Mame Yelli Badiane',
            email: 'dibordang42@gmail.com'
          });
        }, 1200);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f6] dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      {/* Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl p-8 relative overflow-hidden"
      >
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />

        <div className="flex flex-col items-center text-center pb-6">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-4"
          >
            <GraduationCap size={44} />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">baccalauréat 2026</h1>
            <p className="text-xs text-zinc-400 font-medium">préparez vos révisions avec la plateforme de terminale complète</p>
          </div>
        </div>

        {/* Dynamic quote banner */}
        <div className="h-12 flex items-center justify-center text-center my-1 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl px-4 border border-zinc-50/50 dark:border-zinc-800">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-medium italic text-zinc-500 dark:text-zinc-400 lowercase leading-relaxed"
            >
              {quotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Regular Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">votre prénom & nom</label>
            <div className="relative">
              <input
                required
                type="text"
                placeholder="ex: mak badiane"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all text-zinc-800 dark:text-zinc-100"
              />
              <User size={14} className="absolute left-3 top-3.5 text-zinc-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">votre lycée / établissement</label>
            <div className="relative">
              <input
                type="text"
                placeholder="ex: lycée mame yelli badiane"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all text-zinc-800 dark:text-zinc-100"
              />
              <School size={14} className="absolute left-3 top-3.5 text-zinc-400" />
            </div>
          </div>

          {/* Email / Password Mock */}
          <div className="grid grid-cols-2 gap-3 pb-2">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">adresse email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100"
                />
                <Mail size={12} className="absolute left-2.5 top-3 text-zinc-400" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] uppercase font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100"
                />
                <Lock size={12} className="absolute left-2.5 top-3 text-zinc-400" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full group bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-emerald-500/10 lowercase"
          >
            continuer sur le site <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-zinc-100 dark:border-zinc-850" />
          <span className="text-[10px] px-3 text-zinc-400 lowercase">ou s'inscrire via google</span>
          <div className="flex-1 border-t border-zinc-100 dark:border-zinc-850" />
        </div>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          disabled={isGoogleLoading}
          className="w-full bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm relative overflow-hidden"
        >
          {isGoogleLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {googleStep === 1 && "initialisation de google..."}
              {googleStep === 2 && "signature du profil..."}
              {googleStep === 3 && "authentifié avec succès !"}
            </span>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38a4.91,4.91,0,0,1-2.12,3.22V19.1h3.42A9.45,9.45,0,0,0,21.35,11.1Z" fill="#4285f4" />
                  <path d="M12,20.5A8.52,8.52,0,0,0,17.68,17l-3.42-2.08A5.33,5.33,0,0,1,12,16a5.41,5.41,0,0,1-5.08-3.72H3.34v2.2A8.6,8.6,0,0,0,12,20.5Z" fill="#34a853" />
                  <path d="M6.92,12.28A5.15,5.15,0,0,1,6.6,10.5a5.15,5.15,0,0,1,.32-1.78V6.52H3.34a8.61,8.61,0,0,0,0,8l3.58-2.24Z" fill="#fbbc05" />
                  <path d="M12,5a5,5,0,0,1,3.48,1.38l2.6-2.6A8.58,8.58,0,0,0,12,.5,8.6,8.6,0,0,0,3.34,6.52L6.92,8.76A5.41,5.41,0,0,1,12,5Z" fill="#ea4335" />
                </g>
              </svg>
              s'inscrire avec google
            </>
          )}
        </button>

        {/* Footer info about Lycée */}
        <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <p className="text-[10px] text-zinc-400 lowercase leading-relaxed">
            site de révision officiel créé par <strong className="text-zinc-500 dark:text-zinc-300">mak badiane</strong>
          </p>
          <p className="text-[9px] text-zinc-350 dark:text-zinc-600 lowercase mt-0.5">
            lycée mame yelli badiane &copy; 2026 - tous droits réservés
          </p>
        </div>
      </motion.div>
    </div>
  );
}
