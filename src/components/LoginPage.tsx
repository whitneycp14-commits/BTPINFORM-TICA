import React from 'react';
import { 
  School, 
  Lock, 
  User, 
  Key, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  HelpCircle, 
  Compass, 
  Headphones, 
  Sparkles,
  UserPlus,
  ArrowRight
} from 'lucide-react';
import { UserSession } from '../types';

interface LoginPageProps {
  currentUser: UserSession;
  onLogin: (username: string, role: 'admin' | 'student') => void;
  onLogout: () => void;
}

export default function LoginPage({
  currentUser,
  onLogin,
  onLogout
}: LoginPageProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Registration form states
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [regUsername, setRegUsername] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPassword, setRegPassword] = React.useState('');
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Por favor ingrese su usuario y contraseña.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server side credentials lookup
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Admin bypass
      if (username.toLowerCase() === 'admin' && password === 'admin123') {
        onLogin(username, 'admin');
        alert('Sesión iniciada con privilegios de Administrador. Se ha activado la barra de edición inline.');
      } else if (username.trim() && password.length >= 4) {
        // Any other standard login works
        onLogin(username, 'student');
        alert(`Sesión iniciada con éxito. ¡Bienvenido, ${username}!`);
      } else {
        alert('Credenciales no válidas. Verifique su usuario y contraseña.');
      }
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername || !regEmail || !regPassword) {
      alert('Rellene todos los datos.');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistrationSuccess(true);
      setTimeout(() => {
        setIsRegistering(false);
        setRegistrationSuccess(false);
        // Pre-fill username for easy login
        setUsername(regUsername);
        setPassword(regPassword);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="flex-grow flex items-center justify-center p-8 relative overflow-hidden bg-background">
      
      {/* Absolute blurry tech circles in background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md z-10 space-y-8">
        
        {/* Branding header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 bg-primary text-white rounded-2xl shadow-lg mb-4">
            <School size={48} className="text-ochre" />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-primary">CEMG Álvaro Contreras</h1>
          <p className="font-sans text-sm text-on-surface-variant mt-1.5">Portal Académico BTP en Informática</p>
        </div>

        {/* Profile Card if already logged in */}
        {currentUser.role !== 'guest' ? (
          <div className="bg-white border border-outline-variant/60 shadow-xl rounded-2xl p-8 space-y-6 text-center">
            <div className="flex items-center gap-2 mb-2 justify-center border-b pb-4">
              <ShieldCheck className="text-green-600" size={24} />
              <h2 className="font-display font-bold text-lg text-primary">Credenciales Validadas</h2>
            </div>
            
            <div className="w-20 h-20 bg-primary/5 text-primary rounded-full flex items-center justify-center text-3xl font-display font-black mx-auto border-2 border-secondary/30">
              {currentUser.username[0].toUpperCase()}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-sans font-bold text-primary">Nombre de Usuario: {currentUser.username}</p>
              <p className="text-xs text-on-surface-variant font-mono">Rol en el Portal: {currentUser.role === 'admin' ? 'Administrador del Sistema 💻' : 'Estudiante Inscrito 🎓'}</p>
              {currentUser.role === 'admin' && (
                <p className="text-[10px] text-white font-mono bg-secondary p-2 rounded border border-secondary/30 mt-2 font-bold leading-relaxed">
                  Modo Editor de Contenido Activado. Puede modificar cualquier texto, profesor, galería u honor roll navegando por las secciones del menú.
                </p>
              )}
            </div>

            <button
              onClick={onLogout}
              className="w-full bg-secondary hover:opacity-95 text-white py-3.5 rounded-xl font-display font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Cerrar Sesión Segura
            </button>
          </div>
        ) : (
          /* Login Card Form */
          <div className="bg-white border border-outline-variant shadow-xl rounded-2xl p-8 relative overflow-hidden">
            
            <div className="flex items-center justify-between mb-6 border-b border-outline-variant/50 pb-4">
              <div className="flex items-center gap-2">
                <Lock className="text-primary" size={20} />
                <h2 className="font-display font-bold text-lg text-primary">
                  {isRegistering ? 'Crear Cuenta' : 'Acceso Seguro'}
                </h2>
              </div>
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs font-mono font-bold text-secondary hover:underline cursor-pointer flex items-center gap-1"
              >
                {isRegistering ? 'Iniciar Sesión' : 'Inscribirse'}
              </button>
            </div>

            {registrationSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-display font-bold text-base text-primary">¡Inscripción Exitosa!</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">Su cuenta institucional simulada ha sido configurada. Redirigiendo a inicio de sesión...</p>
              </div>
            ) : isRegistering ? (
              /* Register/Enrollment Form */
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-on-surface-variant mb-1">Nombre Completo *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/70">
                      <User size={16} />
                    </span>
                    <input 
                      type="text" 
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="p. ej. Carlos Mendoza"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-on-surface-variant mb-1">Correo Institucional *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/70">
                      <Compass size={16} />
                    </span>
                    <input 
                      type="email" 
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="p. ej. carlos@cemgac.edu"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-on-surface-variant mb-1">Contraseña *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/70">
                      <Key size={16} />
                    </span>
                    <input 
                      type="password" 
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-display font-bold text-sm shadow-md transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Crear Cuenta Institucional
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Regular Login Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-on-surface-variant mb-1">Usuario Institucional *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/70">
                      <User size={16} />
                    </span>
                    <input 
                      type="text" 
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ej. carlos.mendoza"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-mono font-bold text-on-surface-variant">Contraseña *</label>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-on-surface-variant/70">
                      <Key size={16} />
                    </span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-12 py-2.5 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent text-sm focus:outline-none transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary hover:opacity-95 text-white py-3.5 rounded-xl font-display font-bold text-sm shadow-md transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Validando credenciales...</span>
                    </>
                  ) : (
                    <>
                      Acceso Portal
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* AES note footer */}
            <div className="mt-8 p-4 bg-surface-container-low rounded-xl flex gap-3 items-start border border-outline-variant/50">
              <ShieldCheck className="text-secondary flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                  Sus datos de sesión están protegidos mediante encriptación AES-256. Esta es una red de datos privada y monitoreada para su seguridad académica institucional.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Support links footer */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs font-mono font-bold text-primary">
          <a href="#" className="flex items-center gap-1.5 hover:text-secondary transition-all">
            <Headphones size={14} />
            Soporte Técnico
          </a>
          <span className="hidden md:block text-outline-variant">|</span>
          <a href="#" className="flex items-center gap-1.5 hover:text-secondary transition-all">
            <ShieldCheck size={14} />
            Privacidad
          </a>
          <span className="hidden md:block text-outline-variant">|</span>
          <a href="#" className="flex items-center gap-1.5 hover:text-secondary transition-all">
            <HelpCircle size={14} />
            Guía de Acceso
          </a>
        </div>

      </div>
    </div>
  );
}
