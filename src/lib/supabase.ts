import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      feedback: {
        Row: {
          id: string
          candidate_id: string
          module_id: string
          session_type: string
          feedback_text: string
          feedback_type: string
          author: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          module_id: string
          session_type: string
          feedback_text: string
          feedback_type: string
          author?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          module_id?: string
          session_type?: string
          feedback_text?: string
          feedback_type?: string
          author?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}