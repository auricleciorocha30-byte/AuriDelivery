
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lktaussreukarhvbltai.supabase.co';
const SUPABASE_KEY = 'sb_publishable_VRrXBKVa4cT-4E93te6hXg_aqWeKSIJ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Registra um evento de login no Supabase para auditoria.
 * Exclusivo para acesso de gestão.
 */
export const saveAdminLogin = async (email: string) => {
  try {
    const { error } = await supabase
      .from('admin_logins')
      .insert([
        { 
          email: email,
          logged_at: new Date().toISOString(),
          app_context: 'AuriDelivery Manager Panel',
          device_info: navigator.userAgent
        }
      ]);
    
    if (error) {
      console.warn('Supabase: A tabela "admin_logins" pode não estar criada. Detalhe:', error.message);
    } else {
      console.log('Supabase: Login administrativo persistido com sucesso.');
    }
  } catch (e) {
    console.error('Supabase: Erro crítico na conexão persistente:', e);
  }
};

/**
 * Recupera os últimos acessos administrativos para exibição no dashboard.
 */
export const getAdminLogins = async () => {
  try {
    const { data, error } = await supabase
      .from('admin_logins')
      .select('*')
      .order('logged_at', { ascending: false })
      .limit(5);

    if (error) {
      console.warn('Supabase: Não foi possível ler os logs:', error.message);
      return [];
    }
    return data;
  } catch (e) {
    return [];
  }
};
