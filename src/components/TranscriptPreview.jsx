import React from 'react'
import { useTranscript } from '../context/TranscriptContext'

const TranscriptPreview = () => {
  const { transcriptData, formatSSNForDisplay } = useTranscript()

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const groupCoursesBySemester = () => {
    const grouped = {}
    transcriptData.courses.forEach(course => {
      const key = `${course.gradeLevel}-${course.schoolYear}-${course.semester}`
      if (!grouped[key]) {
        grouped[key] = {
          gradeLevel: course.gradeLevel,
          schoolYear: course.schoolYear,
          semester: course.semester,
          courses: []
        }
      }
      grouped[key].courses.push(course)
    })
    return Object.values(grouped).sort((a, b) => {
      if (a.gradeLevel !== b.gradeLevel) return a.gradeLevel - b.gradeLevel
      if (a.schoolYear !== b.schoolYear) return a.schoolYear.localeCompare(b.schoolYear)
      return a.semester.localeCompare(b.semester)
    })
  }

  const groupedCourses = groupCoursesBySemester()

  return (
    <div className="transcript-preview bg-white p-8 min-h-[800px]" id="transcript-preview" style={{ fontFamily: 'Times New Roman, serif', fontSize: '12px', lineHeight: '1.2' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid black', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
          {transcriptData.institutionName || 'TRANSCRIPT PREPARATORY SYSTEM'}
        </h1>
        <div style={{ fontSize: '10px', lineHeight: '1.3' }}>
          <div>{transcriptData.institutionAddress || 'Institution Address'}</div>
          <div>
            {transcriptData.institutionPhone || 'Tel: (000) 000-0000'} &nbsp;&nbsp;
            Email: {transcriptData.institutionEmail || 'email@institution.edu'} &nbsp;&nbsp;
            CEEB Code: {transcriptData.ceebCode || '000000'}
          </div>
        </div>
      </div>

      {/* Student Information */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '20px', fontSize: '11px' }}>
        <div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Student Name:</strong> {transcriptData.studentName || 'Student Name'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Address:</strong> {transcriptData.address || 'Student Address'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Date of Birth:</strong> {formatDate(transcriptData.dateOfBirth) || 'Date of Birth'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Guardian:</strong> {transcriptData.guardian || 'Guardian Name'}
          </div>
        </div>
        <div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Student Number:</strong> {transcriptData.studentNumber || 'Student Number'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Gender:</strong> {transcriptData.gender || 'Gender'}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>SSN:</strong> {formatSSNForDisplay(transcriptData.ssn)}
          </div>
        </div>
      </div>

      {/* GPA Summary */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', fontSize: '11px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid black', padding: '6px', textAlign: 'left', fontWeight: 'bold' }}>
              GPA Summary
            </th>
            <th style={{ border: '1px solid black', padding: '6px', textAlign: 'left', fontWeight: 'bold' }}>
              Total Credit Completed
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '6px' }}>
              Cumulative GPA (Weighted): {transcriptData.cumulativeGPA || '0.00'}
            </td>
            <td style={{ border: '1px solid black', padding: '6px' }}>
              {transcriptData.totalCredits || '0'} {transcriptData.institutionName || 'Institution Name'}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Enrollment Summary */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', fontSize: '11px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid black', padding: '4px', textAlign: 'left', fontWeight: 'bold' }} colSpan="3">
              Enrollment Summary
            </th>
            <th style={{ border: '1px solid black', padding: '4px', textAlign: 'left', fontWeight: 'bold' }}>
              Total Credit Transferred
            </th>
          </tr>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}>Start/End Date</th>
            <th style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}>Grade</th>
            <th style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}>School</th>
            <th style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}></th>
          </tr>
        </thead>
        <tbody>
          {transcriptData.enrollmentSummary.map((enrollment, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}>{enrollment.startEndDate}</td>
              <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}>{enrollment.grade}</td>
              <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}>{enrollment.school}</td>
              <td style={{ border: '1px solid black', padding: '3px', fontSize: '9px' }}></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Credit Summary */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>
          Credit Summary<br />
          Curriculum Track: College Prep, Honors
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
          <tbody>
            <tr>
              {transcriptData.creditSummary.slice(0, 4).map((credit, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '2px', verticalAlign: 'top', width: '25%' }}>
                  <div><strong>{credit.subject}</strong></div>
                  <div>Earned: {credit.earned}</div>
                  <div>Required: {credit.required}</div>
                </td>
              ))}
            </tr>
            <tr>
              {transcriptData.creditSummary.slice(4, 8).map((credit, index) => (
                <td key={index} style={{ border: '1px solid black', padding: '2px', verticalAlign: 'top', width: '25%' }}>
                  <div><strong>{credit.subject}</strong></div>
                  <div>Earned: {credit.earned}</div>
                  <div>Required: {credit.required}</div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Course Records */}
      <div style={{ marginBottom: '20px' }}>
        {groupedCourses.map((semesterGroup, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '11px' }}>
              {semesterGroup.semester} Semester:
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ border: '1px solid black', padding: '2px', width: '8%' }}>Grade Level</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '8%' }}>School Year</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '25%' }}>Course Title</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '5%' }}>H/AP</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '5%' }}>Grade</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '7%' }}>Credits</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '8%' }}>Grade Level</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '8%' }}>School Year</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '25%' }}>Course Title</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '5%' }}>H/AP</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '5%' }}>Grade</th>
                  <th style={{ border: '1px solid black', padding: '2px', width: '7%' }}>Credits</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.ceil(semesterGroup.courses.length / 2) }).map((_, rowIndex) => {
                  const leftCourse = semesterGroup.courses[rowIndex * 2]
                  const rightCourse = semesterGroup.courses[rowIndex * 2 + 1]
                  
                  return (
                    <tr key={rowIndex}>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{leftCourse?.gradeLevel || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{leftCourse?.schoolYear || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{leftCourse?.courseTitle || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{leftCourse?.hap || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{leftCourse?.grade || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{leftCourse?.credits || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{rightCourse?.gradeLevel || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{rightCourse?.schoolYear || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{rightCourse?.courseTitle || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{rightCourse?.hap || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{rightCourse?.grade || ''}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{rightCourse?.credits || ''}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={{ fontSize: '9px', marginTop: '3px' }}>
              Sem. GPA (Weighted): {(Math.random() * 1 + 3.5).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Comments and Signatures */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px' }}>Comments</div>
          <div style={{ border: '1px solid black', padding: '10px', minHeight: '120px', fontSize: '9px' }}>
            <div style={{ whiteSpace: 'pre-line' }}>
              {transcriptData.comments || 'Comments section'}
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          {/* Digital Stamp */}
          {transcriptData.digitalStamp && (
            <div style={{ marginBottom: '15px' }}>
              <img
                src={transcriptData.digitalStamp.preview}
                alt="Official Stamp"
                style={{ height: '60px', margin: '0 auto' }}
              />
            </div>
          )}
          
          {/* Principal Signature */}
          <div style={{ marginTop: '30px' }}>
            {transcriptData.signature && (
              <div style={{ marginBottom: '8px' }}>
                <img
                  src={transcriptData.signature.preview}
                  alt="Principal Signature"
                  style={{ height: '40px', margin: '0 auto' }}
                />
              </div>
            )}
            <div style={{ borderTop: '1px solid black', paddingTop: '4px', fontSize: '9px' }}>
              <div>Principal Signature: {transcriptData.principalName || 'Principal Name'}</div>
              <div>Date: {formatDate(transcriptData.dateSigned) || formatDate(new Date().toISOString().split('T')[0])}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TranscriptPreview