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
    institutionName: 'LEGEND COLLEGE PREPARATORY TRANSCRIPT',
    institutionAddress: '21050 McClellan Road, Cupertino CA 95014',
    institutionPhone: 'Tel: (408)865-0366',
    institutionEmail: 'transcript@legendcp.com',
    ceebCode: '054732',
    
    // Student Information
    studentName: '',
    studentNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    guardian: '',
    ssn: '',
    
    // Academic Information
    cumulativeGPA: '',
    totalCredits: '',
    
    // Principal Information
    principalName: '',
    dateSigned: '',
    
    // Comments
    comments: 'UNOFFICIAL TRANSCRIPT\nS- College Level\nIP- In Progress\nP- Pass\nF- Fail',
    
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
    deleteTranscript
  }

  return (
    <TranscriptContext.Provider value={value}>
      {children}
    </TranscriptContext.Provider>
  )
}