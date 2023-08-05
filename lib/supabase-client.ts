import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASEURL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SERVICE_KEY ?? '';
export const supabase = createClient(supabaseUrl, supabaseKey);