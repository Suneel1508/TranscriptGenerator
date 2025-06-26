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
    // Student Information
    studentName: '',
    studentId: '',
    dateOfBirth: '',
    program: '',
    major: '',
    minor: '',
    graduationDate: '',
    
    // Institution Information
    institutionName: 'University of Excellence',
    institutionAddress: '123 Education Street, Academic City, AC 12345',
    
    // Academic Records
    courses: [],
    
    // GPA Information
    cumulativeGPA: '',
    totalCredits: '',
    
    // Additional Information
    honors: '',
    notes: '',
    
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