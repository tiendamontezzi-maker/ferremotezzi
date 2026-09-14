import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database';
import { X, UserPlus, Check, Building2, Phone, Mail, MapPin, Shield } from 'lucide-react';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated?: (userId: string) => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onUserCreated
}) => {
  const { createSystemUser } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('cliente');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Medellín');
  const [status, setStatus] = useState<'activo' | 'inactivo'>('activo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Por favor ingresa el nombre o razón social.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = createSystemUser({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        role,
        company: company.trim(),
        phone: phone.trim(),
        city: city.trim(),
        status
      });

      setSuccessMessage(`Usuario ${newUser.full_name} creado exitosamente.`);
      if (onUserCreated) {
        onUserCreated(newUser.id);
      }

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al crear el usuario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-black/15 shadow-2xl rounded-sm w-full max-w-xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-black/10 flex items-center justify-between bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-black text-white flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-base text-obsidian uppercase font-bold tracking-wider">
                Registrar Nuevo Usuario
              </h3>
              <p className="text-[11px] text-obsidian/60 font-sans">
                Alta de arquitecto, cliente mayorista o colaborador del showroom
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-obsidian/50 hover:text-black hover:bg-black/5 rounded-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-sans">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-sans rounded-xs">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans rounded-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-obsidian/70 font-medium">Nombre Completo y Título *</label>
            <input
              type="text"
              required
              placeholder="Ej: Arq. Alejandro Gómez o Diseñador Lucas V."
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-obsidian/70 font-medium">Correo Electrónico *</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-obsidian/40" />
                <input
                  type="email"
                  required
                  placeholder="ejemplo@estudio.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-obsidian/70 font-medium">Teléfono / WhatsApp</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-obsidian/40" />
                <input
                  type="text"
                  placeholder="+57 300 000 0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-obsidian/70 font-medium">Estudio / Empresa / Razón Social</label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-obsidian/40" />
                <input
                  type="text"
                  placeholder="Estudio Gómez & Cía."
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-obsidian/70 font-medium">Ciudad Principal</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-obsidian/40" />
                <input
                  type="text"
                  placeholder="Medellín / Bogotá / Cali"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-black/15 rounded-xs focus:outline-hidden focus:border-black text-obsidian"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-black/10">
            <div className="space-y-1">
              <label className="text-obsidian/70 font-medium">Rol en la Plataforma</label>
              <div className="relative">
                <Shield className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-obsidian/40" />
                <select
                  value={role}
                  onChange={e => setRole(e.target.value as UserRole)}
                  className="w-full pl-8 pr-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black text-obsidian"
                >
                  <option value="cliente">Cliente / Profesional (Arquitecto o Ebanista)</option>
                  <option value="colaborador">Colaborador (Asesor de Ventas Showroom)</option>
                  <option value="admin">Administrador (Acceso Total)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-obsidian/70 font-medium">Estado de la Cuenta</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as 'activo' | 'inactivo')}
                className="w-full px-3 py-2 border border-black/15 rounded-xs bg-white focus:outline-hidden focus:border-black text-obsidian"
              >
                <option value="activo">Activo (Habilitado)</option>
                <option value="inactivo">Inactivo / En Espera</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-wider text-obsidian/70 hover:text-black border border-black/15 rounded-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-black/85 transition-all shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Usuario</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
