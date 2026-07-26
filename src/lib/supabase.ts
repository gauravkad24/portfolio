import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mpigwkehbrgsljqskzuw.supabase.co'
const supabaseAnonKey = 'sb_publishable_Q5mSOj-9L9t_0rENxRlwwQ_o9sAFAKB'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fetch all projects from database
export const fetchProjectsFromDB = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) console.error('Error fetching projects:', error)
  return data || []
}