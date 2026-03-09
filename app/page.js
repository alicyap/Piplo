import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-3xl">
        {/* Logo / Branding */}
        <h1 className="text-8xl font-black text-blue-600 tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Piplo
        </h1>
        
        <p className="text-2xl text-slate-600 mb-10 font-medium leading-relaxed">
          Le CRM nouvelle génération pour piloter votre <br className="hidden md:block" /> 
          pipeline commercial avec clarté et efficacité.
        </p>
        
        {/* Boutons d'action prioritaires */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/login" 
            className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
          >
            Démarrer maintenant
          </Link>
          
          <Link 
            href="/register" 
            className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
          >
            Créer un compte
          </Link>
        </div>
      </div>
      
      {/* Footer minimaliste */}
      <div className="absolute bottom-10 text-slate-400 text-sm font-medium tracking-wide uppercase">
        Projet Piplo | Gestion de Pipeline & Contacts - 2026
      </div>
    </div>
  );
}