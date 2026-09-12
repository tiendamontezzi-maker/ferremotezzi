import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Profile } from '../types/database';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
}

const DEFAULT_DEMO_USERS: Record<UserRole, Profile> = {
  admin: {
    id: 'usr-admin-01',
    user_id: 'usr-admin-01',
    full_name: 'Carlos Mendoza (Director General)',
    role: 'admin',
    email: 'admin@montezzi.com',
    company: 'Montezzi S.A.S.',
    created_at: '2026-01-01T00:00:00.000Z'
  },
  colaborador: {
    id: 'usr-colab-02',
    user_id: 'usr-colab-02',
    full_name: 'Santiago Arango (Gestión de Operaciones)',
    role: 'colaborador',
    email: 'operaciones@montezzi.com',
    company: 'Montezzi Showroom',
    created_at: '2026-02-15T00:00:00.000Z'
  },
  cliente: {
    id: 'usr-client-03',
    user_id: 'usr-client-03',
    full_name: 'Arq. Mariana Londoño',
    role: 'cliente',
    email: 'mariana@arquitecturacontemporanea.com',
    company: 'Estudio Londoño Arquitectos',
    created_at: '2026-03-10T00:00:00.000Z'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(() => {
    const saved = localStorage.getItem('montezzi_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_DEMO_USERS.admin; }
    }
    return DEFAULT_DEMO_USERS.admin; // Start as admin by default for smooth exploration of the full app & dashboard
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('montezzi_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('montezzi_auth_user');
    }
  }, [user]);

  // Handle Supabase Auth if configured
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    const checkSession = async () => {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          const { data: profile } = await client
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (profile) {
            setUser(profile as Profile);
          }
        }
      } catch (err) {
        console.warn('Error fetching Supabase session, continuing with local session:', err);
      }
    };

    checkSession();

    const { data: { subscription } } = client.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await client
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        if (profile) setUser(profile as Profile);
      } else {
        // Only clear if we were using real supabase
        if (isSupabaseConfigured) {
          setUser(null);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, requestedRole: UserRole = 'admin'): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        // Real Supabase login attempt
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
      }
      
      // Select mock user matching the requested role
      const matched = DEFAULT_DEMO_USERS[requestedRole];
      setUser({ ...matched, email: email || matched.email });
      return true;
    } catch (err) {
      console.error('Login error:', err);
      // Fallback to local profile
      setUser(DEFAULT_DEMO_USERS[requestedRole]);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('montezzi_auth_user');
  };

  const switchRole = (newRole: UserRole) => {
    setUser(DEFAULT_DEMO_USERS[newRole]);
  };

  const role: UserRole = user?.role || 'cliente';
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
