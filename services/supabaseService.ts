
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lktaussreukarhvbltai.supabase.co';
const SUPABASE_KEY = 'sb_publishable_VRrXBKVa4cT-4E93te6hXg_aqWeKSIJ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Registra um evento de login no Supabase para auditoria.
 * Assume a existência de uma tabela 'admin_logins' ou similar.
 * Caso a tabela não exista, o erro será capturado silenciosamente para não travar o app.
 */
export const saveAdminLogin = async (username: string) => {
  try {
    const { error } = await supabase
      .from('admin_logins')
      .insert([
        { 
          username, 
          logged_at: new Date().toISOString(),
          app_context: 'AuriDelivery Manager'
        }
      ]);
    
    if (error) console.warn('Supabase: Erro ao registrar login (tabela pode não existir):', error.message);
    else console.log('Supabase: Login registrado com sucesso para', username);
  } catch (e) {
    console.error('Supabase: Falha crítica na conexão:', e);
  }
};
