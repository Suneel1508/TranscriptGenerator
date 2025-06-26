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
    studentName: 'Smith, John',
    studentNumber: '12345',
    address: '1234 Main Street, San Jose, CA 95124',
    dateOfBirth: '2002-03-15',
    gender: 'Male',
    guardian: 'Robert Smith, Jennifer Smith',
    ssn: '********',
    
    // Academic Information
    cumulativeGPA: '4.25',
    totalCredits: '20',
    
    // Principal Information
    principalName: 'Dr. Johnson',
    dateSigned: new Date().toISOString().split('T')[0],
    
    // Comments
    comments: 'UNOFFICIAL TRANSCRIPT\nS- College Level\nIP- In Progress\nP- Pass\nF- Fail',
    
    // Enrollment Summary
    enrollmentSummary: [
      { startEndDate: '2016-2017', grade: '9', school: 'Leigh High School' },
      { startEndDate: '2017-2018', grade: '10', school: 'Foothill College' },
      { startEndDate: '2018-2019', grade: '11', school: 'Legend College Preparatory' }
    ],
    
    // Credit Summary
    creditSummary: [
      { subject: 'History/Social Science', earned: 25, required: 30 },
      { subject: 'English', earned: 40, required: 40 },
      { subject: 'Mathematics', earned: 45, required: 40 },
      { subject: 'Laboratory Science', earned: 35, required: 30 },
      { subject: 'Foreign Language', earned: 10, required: 20 },
      { subject: 'Arts', earned: 10, required: 20 },
      { subject: 'Elective', earned: 60, required: 70 },
      { subject: 'Physical Education', earned: 20, required: 10 }
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