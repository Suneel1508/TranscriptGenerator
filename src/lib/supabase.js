import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin authentication functions
export const authenticateAdmin = async (email, password) => {
  try {
    const { data, error } = await supabase.rpc('authenticate_admin', {
      user_email: email,
      user_password: password
    })

    if (error) throw error
    
    if (data && data.length > 0) {
      const user = data[0]
      // Store user session in localStorage
      localStorage.setItem('admin_user', JSON.stringify(user))
      return { success: true, user }
    }
    
    return { success: false, error: 'Invalid credentials' }
  } catch (error) {
    console.error('Authentication error:', error)
    return { success: false, error: error.message }
  }
}

export const createAdminUser = async (email, password, name) => {
  try {
    const { data, error } = await supabase.rpc('create_admin_user', {
      user_email: email,
      user_password: password,
      user_name: name
    })

    if (error) throw error
    
    return { success: true, userId: data }
  } catch (error) {
    console.error('Create admin user error:', error)
    return { success: false, error: error.message }
  }
}

export const getCurrentAdmin = () => {
  try {
    const adminUser = localStorage.getItem('admin_user')
    return adminUser ? JSON.parse(adminUser) : null
  } catch (error) {
    console.error('Error getting current admin:', error)
    return null
  }
}

export const logoutAdmin = () => {
  localStorage.removeItem('admin_user')
}

// Transcript functions
export const saveTranscript = async (transcriptData, name) => {
  try {
    const currentAdmin = getCurrentAdmin()
    if (!currentAdmin) {
      throw new Error('No authenticated admin user')
    }

    const { data, error } = await supabase
      .from('transcripts')
      .insert({
        name,
        student_name: transcriptData.studentName,
        student_ssn: transcriptData.ssn,
        data: transcriptData,
        created_by: currentAdmin.user_id
      })
      .select()
      .single()

    if (error) throw error
    
    return { success: true, transcript: data }
  } catch (error) {
    console.error('Save transcript error:', error)
    return { success: false, error: error.message }
  }
}

export const getTranscripts = async () => {
  try {
    const { data, error } = await supabase
      .from('transcripts')
      .select(`
        *,
        admin_users!transcripts_created_by_fkey(name, email)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return { success: true, transcripts: data }
  } catch (error) {
    console.error('Get transcripts error:', error)
    return { success: false, error: error.message }
  }
}

export const updateTranscript = async (id, transcriptData, name) => {
  try {
    const { data, error } = await supabase
      .from('transcripts')
      .update({
        name,
        student_name: transcriptData.studentName,
        student_ssn: transcriptData.ssn,
        data: transcriptData
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    
    return { success: true, transcript: data }
  } catch (error) {
    console.error('Update transcript error:', error)
    return { success: false, error: error.message }
  }
}

export const deleteTranscript = async (id) => {
  try {
    const { error } = await supabase
      .from('transcripts')
      .delete()
      .eq('id', id)

    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Delete transcript error:', error)
    return { success: false, error: error.message }
  }
}

export const getTranscriptsBySSN = async (ssn) => {
  try {
    const { data, error } = await supabase
      .from('transcripts')
      .select(`
        *,
        admin_users!transcripts_created_by_fkey(name, email)
      `)
      .eq('student_ssn', ssn)
      .order('created_at', { ascending: false })

    if (error) throw error
    
    return { success: true, transcripts: data }
  } catch (error) {
    console.error('Get transcripts by SSN error:', error)
    return { success: false, error: error.message }
  }
}