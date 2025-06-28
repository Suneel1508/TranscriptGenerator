import React from 'react'
import { useTranscript } from '../context/TranscriptContext'
import { 
  calculateSemesterGPA,
  isGradeCountedForGPA 
} from '../utils/gpaCalculator'

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

  // Group courses by semester for the new table structure
  const groupCoursesBySemester = () => {
    const grouped = {}
    transcriptData.courses.forEach(course => {
      const key = course.semester
      if (!grouped[key]) {
        grouped[key] = {
          semester: course.semester,
          courses: []
        }
      }
      grouped[key].courses.push(course)
    })
    return Object.values(grouped).sort((a, b) => a.semester.localeCompare(b.semester))
  }

  const semesterGroups = groupCoursesBySemester()
  const semesterGPAs = calculateSemesterGPA(transcriptData.courses, true)

  return (
    <div className="transcript-preview bg-white p-6 min-h-[800px]" id="transcript-preview" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', lineHeight: '1.2', color: 'black' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '15px', backgroundColor: '#e8e8e8', padding: '8px', border: '2px solid black' }}>
        <h1 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0', textTransform: 'uppercase' }}>
          {transcriptData.institutionName || 'LEGEND COLLEGE PREPARATORY'} TRANSCRIPT
        </h1>
      </div>

      {/* Institution Info */}
      <div style={{ textAlign: 'center', marginBottom: '15px', fontSize: '10px' }}>
        <div>{transcriptData.institutionAddress || '21050 McClellan Road, Cupertino CA 95014'}</div>
        <div>
          Tel: {transcriptData.institutionPhone || '(408)865-0366'} &nbsp;&nbsp;
          Email: <span style={{ color: 'blue', textDecoration: 'underline' }}>{transcriptData.institutionEmail || 'transcript@legendcp.com'}</span> &nbsp;&nbsp;
          CEEB Code: {transcriptData.ceebCode || '054732'}
        </div>
      </div>

      {/* Student Information - CLEAN FORMAT WITHOUT INTERNAL BORDERS */}
      <div style={{ marginBottom: '15px', border: '2px solid black', padding: '8px', fontSize: '10px' }}>
        <div style={{ display: 'flex', marginBottom: '4px' }}>
          <span style={{ fontWeight: 'bold', width: '15%' }}>Student Name:</span>
          <span style={{ width: '35%' }}>{transcriptData.studentName || 'Kondor, Anirud'}</span>
          <span style={{ fontWeight: 'bold', width: '15%' }}>Student Number:</span>
          <span style={{ width: '35%' }}>{transcriptData.studentNumber || '11807'}</span>
        </div>
        <div style={{ display: 'flex', marginBottom: '4px' }}>
          <span style={{ fontWeight: 'bold', width: '15%' }}>Address:</span>
          <span style={{ width: '85%' }}>{transcriptData.address || '4848 Tilden Dr., San Jose, CA 95124'}</span>
        </div>
        <div style={{ display: 'flex', marginBottom: '4px' }}>
          <span style={{ fontWeight: 'bold', width: '15%' }}>Date of Birth:</span>
          <span style={{ width: '35%' }}>{formatDate(transcriptData.dateOfBirth) || 'April 25, 2002'}</span>
          <span style={{ fontWeight: 'bold', width: '15%' }}>Gender:</span>
          <span style={{ width: '35%' }}>{transcriptData.gender || 'Male'}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <span style={{ fontWeight: 'bold', width: '15%' }}>Guardian:</span>
          <span style={{ width: '35%' }}>{transcriptData.guardian || 'Padman Kondor, Sangeetha Kondor'}</span>
          <span style={{ fontWeight: 'bold', width: '15%' }}>SSN:</span>
          <span style={{ width: '35%' }}>{formatSSNForDisplay(transcriptData.ssn)}</span>
        </div>
      </div>

      {/* GPA and Credit Summary - CLEAN FORMAT */}
      <div style={{ marginBottom: '15px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', border: '2px solid black' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', width: '50%', border: 'none' }}>GPA Summary</td>
              <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', width: '50%', borderLeft: '1px solid black', border: 'none', borderLeft: '1px solid black' }}>Total Credit Completed</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px', border: 'none' }}>Cumulative GPA (Weighted): {transcriptData.cumulativeGPA || '4.33'}</td>
              <td style={{ padding: '4px 8px', border: 'none', borderLeft: '1px solid black' }}>{transcriptData.totalCredits || '20'} {transcriptData.institutionName || 'Legend College Preparatory'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Enrollment Summary - CLEAN FORMAT */}
      <div style={{ marginBottom: '15px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', border: '2px solid black' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', border: 'none' }} colSpan="3">Enrollment Summary</td>
              <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', borderLeft: '1px solid black', border: 'none', borderLeft: '1px solid black' }}>Total Credit Transferred</td>
            </tr>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', border: 'none', width: '25%' }}>Start/End Date</td>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', border: 'none', width: '15%' }}>Grade</td>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', border: 'none', width: '35%' }}>School</td>
              <td style={{ padding: '3px 8px', border: 'none', borderLeft: '1px solid black', width: '25%' }}></td>
            </tr>
            {transcriptData.enrollmentSummary.slice(0, 7).map((enrollment, index) => (
              <tr key={index}>
                <td style={{ padding: '3px 8px', border: 'none' }}>{enrollment.startEndDate || (index === 0 ? '2016-2017' : index === 1 ? '2016-2017' : index === 2 ? '2017-2018' : index === 3 ? '2017-2018' : index === 4 ? '2017-2018' : index === 5 ? '2016-2017' : '2016-2017')}</td>
                <td style={{ padding: '3px 8px', border: 'none' }}>{enrollment.grade || (index === 0 ? '9' : index === 1 ? '9' : index === 2 ? '10' : index === 3 ? '10' : index === 4 ? '10' : index === 5 ? '11' : '11')}</td>
                <td style={{ padding: '3px 8px', border: 'none' }}>{enrollment.school || (index === 0 ? 'Leigh High School' : index === 1 ? 'Foothill College' : index === 2 ? 'Leigh High School' : index === 3 ? 'Foothill College' : index === 4 ? 'De Anza College' : index === 5 ? 'Legend College Preparatory' : 'Leigh High School')}</td>
                <td style={{ padding: '3px 8px', border: 'none', borderLeft: '1px solid black' }}>{index === 0 ? '150 Leigh High School' : index === 1 ? '30 Foothill College' : index === 2 ? '10 De Anza College' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Credit Summary - FIXED FORMAT - Single Line Per Subject */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ backgroundColor: '#e8e8e8', border: '2px solid black', borderBottom: '1px solid black', padding: '4px 8px', fontWeight: 'bold', fontSize: '10px' }}>
          Credit Summary<br />
          Curriculum Track: College Prep, Honors
        </div>
        <div style={{ border: '2px solid black', borderTop: 'none', padding: '8px', fontSize: '9px' }}>
          {/* First Row */}
          <div style={{ display: 'flex', marginBottom: '4px' }}>
            <div style={{ width: '50%', paddingRight: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>History/Social Science</span>
              <span style={{ marginLeft: '8px' }}>Earned: {transcriptData.creditSummary[0]?.earned || 25}</span>
              <span style={{ marginLeft: '8px' }}>Required: {transcriptData.creditSummary[0]?.required || 30}</span>
            </div>
            <div style={{ width: '50%' }}>
              <span style={{ fontWeight: 'bold' }}>English</span>
              <span style={{ marginLeft: '8px' }}>Earned: {transcriptData.creditSummary[1]?.earned || 25}</span>
              <span style={{ marginLeft: '8px' }}>Required: {transcriptData.creditSummary[1]?.required || 40}</span>
            </div>
          </div>
          
          {/* Second Row */}
          <div style={{ display: 'flex', marginBottom: '4px' }}>
            <div style={{ width: '50%', paddingRight: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>Mathematics</span>
              <span style={{ marginLeft: '8px' }}>Earned: {transcriptData.creditSummary[2]?.earned || 45}</span>
              <span style={{ marginLeft: '8px' }}>Required: {transcriptData.creditSummary[2]?.required || 40}</span>
            </div>
            <div style={{ width: '50%' }}>
              <span style={{ fontWeight: 'bold' }}>Laboratory Science</span>
              <span style={{ marginLeft: '8px' }}>Earned: {transcriptData.creditSummary[3]?.earned || 35}</span>
              <span style={{ marginLeft: '8px' }}>Required: {transcriptData.creditSummary[3]?.required || 30}</span>
            </div>
          </div>
          
          {/* Third Row */}
          <div style={{ display: 'flex', marginBottom: '4px' }}>
            <div style={{ width: '50%', paddingRight: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>Foreign Language</span>
              <span style={{ marginLeft: '8px' }}>Earned: {transcriptData.creditSummary[4]?.earned || 10}</span>
              <span style={{ marginLeft: '8px' }}>Required: {transcriptData.creditSummary[4]?.required || 20}</span>
            </div>
            <div style={{ width: '50%' }}>
              <span style={{ fontWeight: 'bold' }}>Arts</span>
              <span style={{ marginLeft: '8px' }}>Earned: {transcriptData.creditSummary[5]?.earned || 10}</span>
              <span style={{ marginLeft: '8px' }}>Required: {transcriptData.creditSummary[5]?.required || 20}</span>
            </div>
          </div>
          
          {/* Fourth Row */}
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%', paddingRight: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>Elective</span>
              <span style={{ marginLeft: '8px' }}>Earned: {transcriptData.creditSummary[6]?.earned || 60}</span>
              <span style={{ marginLeft: '8px' }}>Required: {transcriptData.creditSummary[6]?.required || 70}</span>
            </div>
            <div style={{ width: '50%' }}>
              <span style={{ fontWeight: 'bold' }}>Physical Education</span>
              <span style={{ marginLeft: '8px' }}>Earned: {transcriptData.creditSummary[7]?.earned || 20}</span>
              <span style={{ marginLeft: '8px' }}>Required: {transcriptData.creditSummary[7]?.required || 10}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Records - NEW TABLE STRUCTURE */}
      {semesterGroups.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          {semesterGroups.map((semesterGroup, semesterIndex) => {
            // Group courses by grade level within semester
            const gradeGroups = {}
            semesterGroup.courses.forEach(course => {
              const gradeKey = `${course.gradeLevel}-${course.schoolYear}`
              if (!gradeGroups[gradeKey]) {
                gradeGroups[gradeKey] = {
                  gradeLevel: course.gradeLevel,
                  schoolYear: course.schoolYear,
                  courses: []
                }
              }
              gradeGroups[gradeKey].courses.push(course)
            })

            return (
              <div key={semesterIndex} style={{ marginBottom: '15px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', border: '2px solid black' }}>
                  <tbody>
                    {/* Semester Header */}
                    <tr>
                      <td style={{ padding: '4px 8px', fontWeight: 'bold', backgroundColor: '#f0f0f0', borderBottom: '1px solid black' }} colSpan="6">
                        {semesterGroup.semester} Semester:
                      </td>
                    </tr>
                    
                    {/* Column Headers */}
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                      <td style={{ padding: '2px 4px', fontWeight: 'bold', border: '1px solid black', width: '12%' }}>Grade Level</td>
                      <td style={{ padding: '2px 4px', fontWeight: 'bold', border: '1px solid black', width: '15%' }}>School Year</td>
                      <td style={{ padding: '2px 4px', fontWeight: 'bold', border: '1px solid black', width: '35%' }}>Course Title</td>
                      <td style={{ padding: '2px 4px', fontWeight: 'bold', border: '1px solid black', width: '10%' }}>H/AP</td>
                      <td style={{ padding: '2px 4px', fontWeight: 'bold', border: '1px solid black', width: '10%' }}>Grade</td>
                      <td style={{ padding: '2px 4px', fontWeight: 'bold', border: '1px solid black', width: '18%' }}>Credits</td>
                    </tr>

                    {/* Course Rows by Grade Level */}
                    {Object.values(gradeGroups)
                      .sort((a, b) => a.gradeLevel - b.gradeLevel)
                      .map((gradeGroup, gradeIndex) => {
                        const gradeKey = `${gradeGroup.gradeLevel}-${gradeGroup.schoolYear}-${semesterGroup.semester}`
                        const gradeGPA = semesterGPAs[gradeKey]
                        
                        return (
                          <React.Fragment key={gradeIndex}>
                            {gradeGroup.courses.map((course, courseIndex) => (
                              <tr key={courseIndex}>
                                <td style={{ padding: '2px 4px', border: '1px solid black' }}>{course.gradeLevel}</td>
                                <td style={{ padding: '2px 4px', border: '1px solid black' }}>'{course.schoolYear}</td>
                                <td style={{ padding: '2px 4px', border: '1px solid black' }}>{course.courseTitle}</td>
                                <td style={{ padding: '2px 4px', border: '1px solid black' }}>{course.hap || ''}</td>
                                <td style={{ padding: '2px 4px', border: '1px solid black' }}>{course.grade}</td>
                                <td style={{ padding: '2px 4px', border: '1px solid black' }}>
                                  {isGradeCountedForGPA(course.grade) ? course.credits : ''}
                                </td>
                              </tr>
                            ))}
                            {/* Semester GPA Row for this grade level */}
                            {gradeGPA && (
                              <tr style={{ backgroundColor: '#f9f9f9' }}>
                                <td colSpan="6" style={{ padding: '3px 4px', fontWeight: 'bold', fontSize: '8px', border: '1px solid black' }}>
                                  Sem. GPA (Weighted): {gradeGPA.gpa.toFixed(2)}
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
      )}

      {/* Comments and Signature Section */}
      <div style={{ marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid black' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px', width: '60%', verticalAlign: 'top', borderRight: '1px solid black' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '10px' }}>Comments</div>
                <div style={{ fontSize: '9px', minHeight: '80px' }}>
                  {transcriptData.comments || 'UNOFFICIAL TRANSCRIPT\nCL-College Level IP- In Progress P- Pass F- Fail'}
                </div>
                
                {/* Digital Stamp in Comments Section */}
                {transcriptData.digitalStamp && (
                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <img
                      src={transcriptData.digitalStamp.preview}
                      alt="Official Stamp"
                      style={{ height: '80px', maxWidth: '120px', objectFit: 'contain' }}
                    />
                  </div>
                )}
              </td>
              
              <td style={{ padding: '8px', width: '40%', verticalAlign: 'top', textAlign: 'center' }}>
                {/* Principal Signature */}
                <div style={{ marginTop: '20px' }}>
                  {transcriptData.signature && (
                    <div style={{ marginBottom: '10px' }}>
                      <img
                        src={transcriptData.signature.preview}
                        alt="Principal Signature"
                        style={{ height: '60px', maxWidth: '150px', margin: '0 auto', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                  <div style={{ borderTop: '1px solid black', paddingTop: '5px', fontSize: '9px' }}>
                    <div>Principal Signature: {transcriptData.principalName || 'Principal Name'}</div>
                    <div>Date: {formatDate(transcriptData.dateSigned) || 'January 31, 2019'}</div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TranscriptPreview