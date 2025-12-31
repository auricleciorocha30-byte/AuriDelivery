
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
          device_info: navigator.userAgent,
          event_type: 'LOGIN'
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
 * Cria uma nova conta de administrador no Supabase e registra o evento.
 */
export const registerAdminAccount = async (email: string, name: string) => {
  try {
    // 1. Salva na tabela de contas
    const { error: accError } = await supabase
      .from('admin_accounts')
      .insert([
        { 
          email, 
          full_name: name,
          created_at: new Date().toISOString()
        }
      ]);
    
    // 2. Registra o evento de criação no log de auditoria
    await supabase
      .from('admin_logins')
      .insert([
        { 
          email: email,
          logged_at: new Date().toISOString(),
          app_context: 'AuriDelivery Manager Panel',
          event_type: 'ACCOUNT_CREATED'
        }
      ]);

    if (accError) {
      console.warn('Supabase Account Error:', accError.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Supabase Registration Failure:', e);
    return false;
  }
};

/**
 * Verifica se um e-mail está registrado na base de gestores.
 */
export const checkAdminExists = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('admin_accounts')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (error) return false;
    return !!data;
  } catch (e) {
    return false;
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
      .limit(8);

    if (error) {
      console.warn('Supabase: Não foi possível ler os logs:', error.message);
      return [];
    }
    return data;
  } catch (e) {
    return [];
  }
};
