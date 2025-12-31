
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lktaussreukarhvbltai.supabase.co';
const SUPABASE_KEY = 'sb_publishable_VRrXBKVa4cT-4E93te6hXg_aqWeKSIJ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Registra um evento de login no Supabase para auditoria.
 * Agora utiliza o e-mail como identificador principal.
 */
export const saveAdminLogin = async (email: string) => {
  try {
    const { error } = await supabase
      .from('admin_logins')
      .insert([
        { 
          email: email, // Alterado de username para email
          logged_at: new Date().toISOString(),
          app_context: 'AuriDelivery Manager Panel',
          device_info: navigator.userAgent
        }
      ]);
    
    if (error) console.warn('Supabase Log Warning (Email registration):', error.message);
    else console.log('Supabase: Acesso administrativo registrado via e-mail:', email);
  } catch (e) {
    console.error('Supabase Connectivity Failure:', e);
  }
};
