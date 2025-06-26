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
    <div className="transcript-preview bg-white p-6 min-h-[800px] text-sm" id="transcript-preview">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-black pb-4">
        <h1 className="text-xl font-bold mb-2">
          {transcriptData.institutionName || 'LEGEND COLLEGE PREPARATORY TRANSCRIPT'}
        </h1>
        <div className="text-xs space-y-1">
          <p>{transcriptData.institutionAddress || '21050 McClellan Road, Cupertino CA 95014'}</p>
          <p>
            {transcriptData.institutionPhone || 'Tel: (408)865-0366'} &nbsp;&nbsp;
            Email: {transcriptData.institutionEmail || 'transcript@legendcp.com'} &nbsp;&nbsp;
            CEEB Code: {transcriptData.ceebCode || '054732'}
          </p>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="space-y-2">
          <div className="flex">
            <span className="font-semibold w-24">Student Name:</span>
            <span>{transcriptData.studentName || 'Student Name'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Address:</span>
            <span>{transcriptData.address || 'Student Address'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Date of Birth:</span>
            <span>{formatDate(transcriptData.dateOfBirth) || 'Date of Birth'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Guardian:</span>
            <span>{transcriptData.guardian || 'Guardian Name'}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex">
            <span className="font-semibold w-24">Student Number:</span>
            <span>{transcriptData.studentNumber || 'Student Number'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">Gender:</span>
            <span>{transcriptData.gender || 'Gender'}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-24">SSN:</span>
            <span>{transcriptData.ssn || '********'}</span>
          </div>
        </div>
      </div>

      {/* GPA Summary */}
      <div className="mb-6">
        <table className="w-full border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-2 text-left font-bold">GPA Summary</th>
              <th className="border border-black p-2 text-left font-bold">Total Credit Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">
                Cumulative GPA (Weighted): {transcriptData.cumulativeGPA || '0.00'}
              </td>
              <td className="border border-black p-2">
                {transcriptData.totalCredits || '0'} Legend College Preparatory
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Enrollment Summary */}
      <div className="mb-6">
        <table className="w-full border border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black p-2 text-left font-bold" colSpan="4">Enrollment Summary</th>
              <th className="border border-black p-2 text-left font-bold">Total Credit Transferred</th>
            </tr>
            <tr className="bg-gray-100">
              <th className="border border-black p-1 text-xs">Start/End Date</th>
              <th className="border border-black p-1 text-xs">Grade</th>
              <th className="border border-black p-1 text-xs">School</th>
              <th className="border border-black p-1 text-xs"></th>
              <th className="border border-black p-1 text-xs"></th>
            </tr>
          </thead>
          <tbody>
            {/* Sample enrollment data - you can make this dynamic */}
            <tr>
              <td className="border border-black p-1 text-xs">2016-2017</td>
              <td className="border border-black p-1 text-xs">9</td>
              <td className="border border-black p-1 text-xs">Leigh High School</td>
              <td className="border border-black p-1 text-xs"></td>
              <td className="border border-black p-1 text-xs"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Course Records */}
      <div className="mb-6">
        {groupedCourses.map((semesterGroup, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold mb-2">
              {semesterGroup.semester} Semester:
            </h3>
            <table className="w-full border border-black text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1">Grade Level</th>
                  <th className="border border-black p-1">School Year</th>
                  <th className="border border-black p-1">Course Title</th>
                  <th className="border border-black p-1">H/AP</th>
                  <th className="border border-black p-1">Grade</th>
                  <th className="border border-black p-1">Credits</th>
                  <th className="border border-black p-1">Grade Level</th>
                  <th className="border border-black p-1">School Year</th>
                  <th className="border border-black p-1">Course Title</th>
                  <th className="border border-black p-1">H/AP</th>
                  <th className="border border-black p-1">Grade</th>
                  <th className="border border-black p-1">Credits</th>
                </tr>
              </thead>
              <tbody>
                {/* Split courses into two columns */}
                {Array.from({ length: Math.ceil(semesterGroup.courses.length / 2) }).map((_, rowIndex) => {
                  const leftCourse = semesterGroup.courses[rowIndex * 2]
                  const rightCourse = semesterGroup.courses[rowIndex * 2 + 1]
                  
                  return (
                    <tr key={rowIndex}>
                      <td className="border border-black p-1">{leftCourse?.gradeLevel || ''}</td>
                      <td className="border border-black p-1">{leftCourse?.schoolYear || ''}</td>
                      <td className="border border-black p-1">{leftCourse?.courseTitle || ''}</td>
                      <td className="border border-black p-1">{leftCourse?.hap || ''}</td>
                      <td className="border border-black p-1">{leftCourse?.grade || ''}</td>
                      <td className="border border-black p-1">{leftCourse?.credits || ''}</td>
                      <td className="border border-black p-1">{rightCourse?.gradeLevel || ''}</td>
                      <td className="border border-black p-1">{rightCourse?.schoolYear || ''}</td>
                      <td className="border border-black p-1">{rightCourse?.courseTitle || ''}</td>
                      <td className="border border-black p-1">{rightCourse?.hap || ''}</td>
                      <td className="border border-black p-1">{rightCourse?.grade || ''}</td>
                      <td className="border border-black p-1">{rightCourse?.credits || ''}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="text-xs mt-1">
              Sem. GPA (Weighted): {(Math.random() * 1 + 3.5).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Comments and Signatures */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="font-bold mb-2">Comments</h3>
          <div className="border border-black p-4 min-h-32">
            <div className="whitespace-pre-line text-xs">
              {transcriptData.comments || 'UNOFFICIAL TRANSCRIPT\nS- College Level\nIP- In Progress\nP- Pass\nF- Fail'}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          {/* Digital Stamp */}
          {transcriptData.digitalStamp && (
            <div className="mb-4">
              <img
                src={transcriptData.digitalStamp.preview}
                alt="Official Stamp"
                className="h-20 mx-auto"
              />
            </div>
          )}
          
          {/* Principal Signature */}
          <div className="mt-8">
            {transcriptData.signature && (
              <div className="mb-2">
                <img
                  src={transcriptData.signature.preview}
                  alt="Principal Signature"
                  className="h-12 mx-auto"
                />
              </div>
            )}
            <div className="border-t border-black pt-1">
              <p className="text-xs">Principal Signature: {transcriptData.principalName || 'Principal Name'}</p>
              <p className="text-xs">Date: {formatDate(transcriptData.dateSigned) || formatDate(new Date().toISOString().split('T')[0])}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TranscriptPreview