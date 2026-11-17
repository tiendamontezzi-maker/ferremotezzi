import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Profile, SystemUser } from '../types/database';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_SYSTEM_USERS } from '../lib/mockData';

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  systemUsers: SystemUser[];
  createSystemUser: (userData: {
    full_name: string;
    email: string;
    role: UserRole;
    phone?: string;
    company?: string;
    city?: string;
    status?: 'activo' | 'inactivo';
  }) => SystemUser;
  updateSystemUserStatus: (id: string, status: 'activo' | 'inactivo') => void;
}

const adminProfile: Profile = {
  id: 'usr-admin-01',
  user_id: 'usr-admin-01',
  full_name: 'Carlos Mendoza (Director General)',
  role: 'admin',
  email: 'admin@montezzi.com',
  company: 'Montezzi S.A.S.',
  permissions: ['dashboard_view', 'orders_view', 'orders_edit', 'products_manage', 'billing_issue', 'analytics_view', 'coupons_manage', 'reviews_manage', 'settings_manage'],
  status: 'active',
  created_at: '2026-01-01T00:00:00.000Z'
};

const colabProfile: Profile = {
  id: 'usr-colab-02',
  user_id: 'usr-colab-02',
  full_name: 'Santiago Arango (Gestión de Operaciones)',
  role: 'colaborador',
  email: 'operaciones@montezzi.com',
  company: 'Montezzi Showroom',
  permissions: ['dashboard_view', 'orders_view', 'products_manage', 'billing_issue'],
  status: 'active',
  created_at: '2026-02-15T00:00:00.000Z'
};

const clientProfile: Profile = {
  id: 'usr-client-03',
  user_id: 'usr-client-03',
  full_name: 'Arq. Mariana Londoño',
  role: 'cliente',
  email: 'mariana@arquitecturacontemporanea.com',
  company: 'Estudio Londoño Arquitectos',
  permissions: ['orders_view'],
  status: 'active',
  created_at: '2026-03-10T00:00:00.000Z'
};

// Perfiles de ejemplo (ya no se usan para iniciar sesión)
export const DEFAULT_DEMO_USERS: Record<UserRole, Profile> = {
  admin: adminProfile,
  colaborador: colabProfile,
  cliente: clientProfile,
  collaborator: { ...colabProfile, role: 'collaborator' },
  customer: { ...clientProfile, role: 'customer' }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // La sesión sale SOLO de Supabase Auth + la tabla profiles (rol). Nunca de localStorage ni de usuarios demo:
  // el panel /admin y las escrituras dependen de ese rol, y la base de datos lo vuelve a validar con RLS.
  const [user, setUser] = useState<Profile | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(isSupabaseConfigured && supabase));

  const [systemUsers, setSystemUsers] = useState<SystemUser[]>(() => {
    const saved = localStorage.getItem('montezzi_system_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_SYSTEM_USERS; }
    }
    return INITIAL_SYSTEM_USERS;
  });

  useEffect(() => {
    localStorage.setItem('montezzi_system_users', JSON.stringify(systemUsers));
  }, [systemUsers]);

  useEffect(() => {
    // Limpia la sesión demo que versiones anteriores dejaban guardada en el navegador
    localStorage.removeItem('montezzi_auth_user');
  }, []);

  const loadProfile = async (authUserId: string): Promise<Profile | null> => {
    if (!supabase) return null;
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', authUserId).maybeSingle();
    if (!profile || profile.status !== 'active') return null;
    return { ...profile, user_id: profile.id } as Profile;
  };

  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    let active = true;
    const applySession = async (authUserId: string | undefined) => {
      const profile = authUserId ? await loadProfile(authUserId) : null;
      if (active) {
        setUser(profile);
        setIsLoading(false);
      }
    };

    client.auth.getSession()
      .then(({ data: { session } }) => applySession(session?.user?.id))
      .catch(() => applySession(undefined));

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      // Sin await dentro del callback (recomendación de supabase-js para evitar bloqueos)
      setTimeout(() => applySession(session?.user?.id), 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    if (!isSupabaseConfigured || !supabase) return { ok: false, error: 'El acceso no está disponible en este momento.' };
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error || !data.user) return { ok: false, error: 'Correo o contraseña incorrectos.' };
      const profile = await loadProfile(data.user.id);
      if (!profile) {
        await supabase.auth.signOut();
        return { ok: false, error: 'Tu usuario no tiene acceso al panel.' };
      }
      setUser(profile);
      return { ok: true };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  // Ya no existe "simular rol": el rol viene del perfil en Supabase. Se deja la función para no romper imports.
  const switchRole = (_newRole: UserRole) => {};

  const createSystemUser = (userData: {
    full_name: string;
    email: string;
    role: UserRole;
    phone?: string;
    company?: string;
    city?: string;
    status?: 'activo' | 'inactivo';
  }): SystemUser => {
    const newId = `usr-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newUser: SystemUser = {
      id: newId,
      user_id: newId,
      full_name: userData.full_name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone || '',
      company: userData.company || '',
      city: userData.city || 'Bogotá D.C.',
      total_orders: 0,
      total_spent: 0,
      status: userData.status || 'activo',
      created_at: new Date().toISOString()
    };

    setSystemUsers(prev => [newUser, ...prev]);
    return newUser;
  };

  const updateSystemUserStatus = (id: string, status: 'activo' | 'inactivo') => {
    setSystemUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
  };

  const role: UserRole = user?.role || 'cliente';
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        logout,
        switchRole,
        systemUsers,
        createSystemUser,
        updateSystemUserStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
