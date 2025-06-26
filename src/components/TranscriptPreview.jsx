import React from 'react'
import { useTranscript } from '../context/TranscriptContext'

const TranscriptPreview = () => {
  const { transcriptData } = useTranscript()

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateGPA = () => {
    if (transcriptData.cumulativeGPA) {
      return parseFloat(transcriptData.cumulativeGPA).toFixed(2)
    }
    
    // Calculate from courses if no manual GPA provided
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    }
    
    let totalPoints = 0
    let totalCredits = 0
    
    transcriptData.courses.forEach(course => {
      const credits = parseFloat(course.credits) || 0
      const points = gradePoints[course.grade] || 0
      totalPoints += points * credits
      totalCredits += credits
    })
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
  }

  const getTotalCredits = () => {
    return transcriptData.courses.reduce((total, course) => {
      return total + (parseFloat(course.credits) || 0)
    }, 0)
  }

  return (
    <div className="transcript-preview bg-white p-8 min-h-[800px]" id="transcript-preview">
      {/* Header */}
      <div className="header">
        <h1>{transcriptData.institutionName || 'University Name'}</h1>
        <p className="text-sm mb-2">{transcriptData.institutionAddress || 'University Address'}</p>
        <h2>OFFICIAL ACADEMIC TRANSCRIPT</h2>
      </div>

      {/* Student Information */}
      <div className="student-info">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Student Name:</strong> {transcriptData.studentName || 'Student Name'}
              </div>
              <div>
                <strong>Student ID:</strong> {transcriptData.studentId || 'Student ID'}
              </div>
              <div>
                <strong>Date of Birth:</strong> {formatDate(transcriptData.dateOfBirth)}
              </div>
              <div>
                <strong>Program:</strong> {transcriptData.program || 'Program'}
              </div>
              <div>
                <strong>Major:</strong> {transcriptData.major || 'Major'}
              </div>
              {transcriptData.minor && (
                <div>
                  <strong>Minor:</strong> {transcriptData.minor}
                </div>
              )}
              {transcriptData.graduationDate && (
                <div>
                  <strong>Graduation Date:</strong> {formatDate(transcriptData.graduationDate)}
                </div>
              )}
            </div>
          </div>
          
          {/* Student Photo */}
          {transcriptData.photo && (
            <div className="ml-6">
              <img
                src={transcriptData.photo.preview}
                alt="Student"
                className="w-24 h-32 object-cover border-2 border-gray-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* Academic Record */}
      <div className="mb-6">
        <h2>ACADEMIC RECORD</h2>
        
        {transcriptData.courses.length > 0 ? (
          <table className="grades-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Term</th>
              </tr>
            </thead>
            <tbody>
              {transcriptData.courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td className="text-center">{course.credits}</td>
                  <td className="text-center font-semibold">{course.grade}</td>
                  <td>{course.semester} {course.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="border border-gray-300 rounded p-4 text-center text-gray-500">
            No courses added yet
          </div>
        )}
      </div>

      {/* Academic Summary */}
      <div className="mb-6">
        <h2>ACADEMIC SUMMARY</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Total Credits Earned:</strong> {getTotalCredits()}
          </div>
          <div>
            <strong>Cumulative GPA:</strong> {calculateGPA()}
          </div>
        </div>
      </div>

      {/* Honors & Awards */}
      {transcriptData.honors && (
        <div className="mb-6">
          <h2>HONORS & AWARDS</h2>
          <p className="text-sm">{transcriptData.honors}</p>
        </div>
      )}

      {/* Additional Notes */}
      {transcriptData.notes && (
        <div className="mb-6">
          <h2>ADDITIONAL NOTES</h2>
          <p className="text-sm">{transcriptData.notes}</p>
        </div>
      )}

      {/* Footer with Signatures */}
      <div className="footer mt-8">
        <div className="signature-section">
          {transcriptData.digitalStamp && (
            <div className="mb-4">
              <img
                src={transcriptData.digitalStamp.preview}
                alt="Official Stamp"
                className="h-16 mx-auto"
              />
            </div>
          )}
          <div className="signature-line">
            <p className="text-xs">Official Stamp</p>
          </div>
        </div>
        
        <div className="signature-section">
          {transcriptData.signature && (
            <div className="mb-4">
              <img
                src={transcriptData.signature.preview}
                alt="Signature"
                className="h-12 mx-auto"
              />
            </div>
          )}
          <div className="signature-line">
            <p className="text-xs">Registrar's Signature</p>
          </div>
        </div>
      </div>

      {/* Issue Date */}
      <div className="text-right mt-6">
        <p className="text-xs text-gray-600">
          Issued on: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  )
}

export default TranscriptPreview