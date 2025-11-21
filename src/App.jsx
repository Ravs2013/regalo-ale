import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Lock, Unlock, Code, Scale, Star, Sparkles } from 'lucide-react';

// --- COMPONENTES VISUALES (CSS PURO) ---

// 1. Bolita de Luz (Simulada con CSS Avanzado)
const Orb = ({ color, intensity = 1 }) => (
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="relative w-64 h-64 md:w-96 md:h-96"
  >
    {/* Núcleo Brillante */}
    <div 
      className="absolute inset-0 rounded-full blur-[50px] transition-colors duration-1000"
      style={{ 
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: intensity 
      }}
    />
    {/* Aura Externa */}
    <div 
      className="absolute inset-0 rounded-full blur-[80px] mix-blend-screen transition-colors duration-1000"
      style={{ 
        background: `radial-gradient(circle, ${color} 0%, transparent 80%)`,
        opacity: 0.5 
      }}
    />
    {/* Centro Sólido (para dar sensación de cuerpo) */}
    <div className="absolute inset-0 m-auto w-32 h-32 bg-white/10 rounded-full blur-md backdrop-blur-sm" />
  </motion.div>
);

// 2. Fondo de Estrellas (CSS Generado)
const StarField = () => {
  // Generamos estrellas estáticas para evitar recálculos
  const stars = [...Array(50)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-0"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// --- INTERFAZ UI ---

const Section = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className="min-h-screen flex flex-col justify-center items-center p-6 relative z-10"
  >
    {children}
  </motion.div>
);

const Card = ({ children, title, icon: Icon }) => (
  <div className="relative group w-full max-w-lg">
    {/* Borde brillante animado */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-amber-500 rounded-2xl opacity-30 group-hover:opacity-100 transition duration-500 blur"></div>
    <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      {title && (
        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          {Icon && <Icon className="text-amber-400 w-6 h-6" />}
          <h3 className="text-amber-400 font-bold text-xl tracking-wider uppercase">{title}</h3>
        </div>
      )}
      {children}
    </div>
  </div>
);

export default function AleUniverse() {
  const [unlocked, setUnlocked] = useState(false);
  const activeColor = unlocked ? '#fbbf24' : '#d946ef'; // Ambar vs Rosa Magenta

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* FONDO FIJO */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
      <StarField />
      
      {/* ORB DE FONDO (Sigue el scroll suavemente) */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <Orb color={activeColor} intensity={0.6} />
      </div>

      <div className="relative z-10">
        
        {/* HEADER */}
        <Section>
          <div className="text-center space-y-8">
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="flex justify-center items-center gap-6"
             >
                <span className="p-4 bg-slate-900 rounded-full border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <Code className="w-8 h-8 text-blue-400" />
                </span>
                <span className="h-px w-20 bg-gradient-to-r from-blue-500 to-amber-500" />
                <span className="p-4 bg-slate-900 rounded-full border border-amber-500/30 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                  <Scale className="w-8 h-8 text-amber-400" />
                </span>
             </motion.div>

             <div>
               <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 pb-2">
                 Ale & Ale
               </h1>
               <p className="text-xl text-slate-500 font-light tracking-[0.3em] mt-4">
                 SISTEMAS <span className="text-amber-500 mx-2">+</span> DERECHO
               </p>
             </div>

             <motion.div 
               animate={{ y: [0, 10, 0] }} 
               transition={{ repeat: Infinity, duration: 2 }}
               className="pt-20 opacity-50"
             >
               <p className="text-xs mb-2 tracking-widest">DESCUBRE LA HISTORIA</p>
               <div className="w-px h-16 bg-gradient-to-b from-slate-500 to-transparent mx-auto" />
             </motion.div>
          </div>
        </Section>

        {/* 1 DE AGOSTO */}
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl w-full">
            <div className="text-center md:text-right space-y-4">
              <h2 className="text-8xl font-black text-slate-800 relative inline-block">
                01
                <span className="absolute -top-6 -right-6 text-3xl font-light text-amber-500 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">AGOSTO</span>
              </h2>
              <p className="text-2xl text-slate-300 italic">"El día que compiló el destino"</p>
            </div>
            
            <Card title="System.log('Encuentro')" icon={Sparkles}>
              <p className="text-lg text-slate-300 leading-relaxed">
                Entre tantos censistas y jefes, el universo ejecutó el algoritmo perfecto para alinearnos.
                <br/><br/>
                Tú con tu hermosa forma de ser que me cautivó desde el inicio, y yo con mis historias locas de cada día. Dos mundos distintos que, contra todo pronóstico, encontraron su propio <strong>protocolo de conexión</strong>.
              </p>
            </Card>
          </div>
        </Section>

        {/* EL POEMA */}
        <Section>
           <div className="relative max-w-2xl w-full">
             <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-25"></div>
             <div className="relative bg-slate-900 p-10 md:p-14 rounded-2xl border border-slate-800 text-center">
                <Star className="w-10 h-10 text-amber-400 mx-auto mb-8" />
                <div className="space-y-6 font-serif text-xl md:text-2xl text-slate-200 italic leading-relaxed">
                  <p>
                    "Un 1 de agosto te conocí,<br/>
                    al verte fijamente me sorprendí,<br/>
                    <span className="not-italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">¡Oh Dios mío!</span><br/>
                    acaso será aquel ángel que siempre soñé."
                  </p>
                  <div className="w-20 h-px bg-slate-700 mx-auto" />
                  <p>
                    "Has llenado los huecos donde antes vivía la soledad,<br/>
                    y hasta la tristeza se calma<br/>
                    cuando es abrazada por tu amabilidad."
                  </p>
                </div>
                <p className="text-right mt-10 text-sm font-sans font-bold text-slate-500 tracking-wider">
                  — DE ALE PARA ALE
                </p>
             </div>
           </div>
        </Section>

        {/* BOLITA DE LUZ */}
        <Section>
          <div className="flex flex-col items-center gap-12 max-w-4xl text-center">
             <div className="relative">
               {/* Orb Central Visible */}
               <Orb color={activeColor} intensity={1} />
               <div className="absolute inset-0 flex items-center justify-center">
                 <Zap className={`w-12 h-12 ${unlocked ? 'text-amber-900' : 'text-white'} z-20 mix-blend-overlay`} />
               </div>
             </div>

             <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Mi <span className={`${unlocked ? 'text-amber-400' : 'text-pink-400'} transition-colors duration-500`}>Bolita de Luz</span>
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Sé que a veces soy intenso (a veces "la fastidio", lo sé 😅). Pero tú eres ese rayito que ilumina mis días grises. 
                  Admiro profundamente tu fuerza, tu gran sentido de responsabilidad y esa capacidad única de brillar <strong>incluso frente a la adversidad</strong>.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-sm">#UnDíaALaVez</span>
                  <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-sm">#Paciencia</span>
                  <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-sm">#Incondicional</span>
                </div>
             </div>
          </div>
        </Section>

        {/* FINAL INTERACTIVO */}
        <Section>
          <div className="text-center w-full max-w-xl">
             {!unlocked ? (
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => setUnlocked(true)}
                 className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-amber-500/50 text-amber-500 rounded-full text-lg font-bold tracking-wide overflow-hidden transition-all hover:bg-amber-500 hover:text-slate-900 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]"
               >
                 <Lock className="w-5 h-5" />
                 DESBLOQUEAR PROMESA
               </motion.button>
             ) : (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.15)] relative overflow-hidden"
               >
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
                 
                 <Unlock className="w-10 h-10 text-amber-400 mx-auto mb-6" />
                 <h3 className="text-2xl font-bold text-white mb-4">Promesa de Ingeniero</h3>
                 
                 <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                   Te prometo optimizar mis tiempos para darte lo mejor de mí, debugear mis inseguridades y proteger tu corazón como el dato más valioso y crítico de mi servidor.
                   <br/><br/>
                   <span className="text-amber-400 font-bold block mt-4 text-xl">Que Diosito te me cuide mucho, mi niña.</span>
                 </p>
                 
                 <Heart className="w-16 h-16 text-red-500 fill-red-500 mx-auto animate-pulse drop-shadow-lg" />
               </motion.div>
             )}
          </div>
        </Section>

        <footer className="pb-10 text-center text-slate-600 text-xs tracking-widest uppercase">
          Diseñado con código y corazón de Ale para Ale
        </footer>

      </div>
    </div>
  );
}