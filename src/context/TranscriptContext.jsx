import React, { createContext, useContext, useState } from 'react'

const TranscriptContext = createContext()

export const useTranscript = () => {
  const context = useContext(TranscriptContext)
  if (!context) {
    throw new Error('useTranscript must be used within a TranscriptProvider')
  }
  return context
}

export const TranscriptProvider = ({ children }) => {
  const [transcriptData, setTranscriptData] = useState({
    // Institution Information
    institutionName: '',
    institutionAddress: '',
    institutionPhone: '',
    institutionEmail: '',
    ceebCode: '',
    
    // Student Information
    studentName: '',
    studentNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    guardian: '',
    ssn: '', // Full SSN stored here
    
    // Academic Information
    cumulativeGPA: '',
    totalCredits: '',
    
    // Principal Information
    principalName: '',
    dateSigned: '',
    
    // Comments
    comments: '',
    
    // Enrollment Summary
    enrollmentSummary: [
      { startEndDate: '', grade: '', school: '' },
      { startEndDate: '', grade: '', school: '' },
      { startEndDate: '', grade: '', school: '' }
    ],
    
    // Credit Summary
    creditSummary: [
      { subject: 'History/Social Science', earned: 0, required: 0 },
      { subject: 'English', earned: 0, required: 0 },
      { subject: 'Mathematics', earned: 0, required: 0 },
      { subject: 'Laboratory Science', earned: 0, required: 0 },
      { subject: 'Foreign Language', earned: 0, required: 0 },
      { subject: 'Arts', earned: 0, required: 0 },
      { subject: 'Elective', earned: 0, required: 0 },
      { subject: 'Physical Education', earned: 0, required: 0 }
    ],
    
    // Courses
    courses: [],
    
    // Files
    photo: null,
    digitalStamp: null,
    signature: null
  })

  const [savedTranscripts, setSavedTranscripts] = useState([])

  const updateTranscriptData = (newData) => {
    setTranscriptData(prev => ({ ...prev, ...newData }))
  }

  // Helper function to format SSN for display (show only last 4 digits)
  const formatSSNForDisplay = (ssn) => {
    if (!ssn) return '********'
    if (ssn.length < 4) return '********'
    return '****' + ssn.slice(-4)
  }

  // Helper function to validate SSN format
  const validateSSN = (ssn) => {
    // Remove any non-digit characters
    const cleanSSN = ssn.replace(/\D/g, '')
    return cleanSSN.length === 9
  }

  // Helper function to format SSN input (XXX-XX-XXXX)
  const formatSSNInput = (ssn) => {
    const cleanSSN = ssn.replace(/\D/g, '')
    if (cleanSSN.length <= 3) return cleanSSN
    if (cleanSSN.length <= 5) return `${cleanSSN.slice(0, 3)}-${cleanSSN.slice(3)}`
    return `${cleanSSN.slice(0, 3)}-${cleanSSN.slice(3, 5)}-${cleanSSN.slice(5, 9)}`
  }

  const addCourse = (course) => {
    setTranscriptData(prev => ({
      ...prev,
      courses: [...prev.courses, { ...course, id: Date.now() }]
    }))
  }

  const updateCourse = (courseId, updatedCourse) => {
    setTranscriptData(prev => ({
      ...prev,
      courses: prev.courses.map(course => 
        course.id === courseId ? { ...course, ...updatedCourse } : course
      )
    }))
  }

  const deleteCourse = (courseId) => {
    setTranscriptData(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== courseId)
    }))
  }

  const saveTranscript = (name) => {
    const transcript = {
      id: Date.now(),
      name,
      data: transcriptData,
      createdAt: new Date().toISOString()
    }
    setSavedTranscripts(prev => [...prev, transcript])
    return transcript
  }

  const loadTranscript = (transcriptId) => {
    const transcript = savedTranscripts.find(t => t.id === transcriptId)
    if (transcript) {
      setTranscriptData(transcript.data)
    }
  }

  const deleteTranscript = (transcriptId) => {
    setSavedTranscripts(prev => prev.filter(t => t.id !== transcriptId))
  }

  const value = {
    transcriptData,
    updateTranscriptData,
    addCourse,
    updateCourse,
    deleteCourse,
    savedTranscripts,
    saveTranscript,
    loadTranscript,
    deleteTranscript,
    formatSSNForDisplay,
    validateSSN,
    formatSSNInput
  }

  return (
    <TranscriptContext.Provider value={value}>
      {children}
    </TranscriptContext.Provider>
  )
}