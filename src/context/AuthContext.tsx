import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Profile, SystemUser } from '../types/database';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_SYSTEM_USERS } from '../lib/mockData';

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
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

const DEFAULT_DEMO_USERS: Record<UserRole, Profile> = {
  admin: adminProfile,
  colaborador: colabProfile,
  cliente: clientProfile,
  collaborator: { ...colabProfile, role: 'collaborator' },
  customer: { ...clientProfile, role: 'customer' }
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
