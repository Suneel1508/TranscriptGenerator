import { supabase } from './supabase'

// Upload file to Supabase storage
export const uploadFile = async (file, path) => {
  try {
    const { data, error } = await supabase.storage
      .from('transcript-files')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) throw error
    
    return { success: true, path: data.path }
  } catch (error) {
    console.error('Error uploading file:', error)
    return { success: false, error: error.message }
  }
}

// Get public URL for a file
export const getFileUrl = (path) => {
  try {
    const { data } = supabase.storage
      .from('transcript-files')
      .getPublicUrl(path)
    
    return data.publicUrl
  } catch (error) {
    console.error('Error getting file URL:', error)
    return null
  }
}

// Delete file from storage
export const deleteFile = async (path) => {
  try {
    const { error } = await supabase.storage
      .from('transcript-files')
      .remove([path])

    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting file:', error)
    return { success: false, error: error.message }
  }
}

// Upload transcript files (photo, stamp, signature)
export const uploadTranscriptFiles = async (transcriptId, files) => {
  const uploadedFiles = {}
  
  try {
    for (const [fileType, fileData] of Object.entries(files)) {
      if (fileData && fileData.file) {
        const fileName = `${transcriptId}/${fileType}_${Date.now()}_${fileData.file.name}`
        const result = await uploadFile(fileData.file, fileName)
        
        if (result.success) {
          uploadedFiles[fileType] = {
            path: result.path,
            url: getFileUrl(result.path),
            name: fileData.name,
            size: fileData.size
          }
        }
      }
    }
    
    return { success: true, files: uploadedFiles }
  } catch (error) {
    console.error('Error uploading transcript files:', error)
    return { success: false, error: error.message }
  }
}