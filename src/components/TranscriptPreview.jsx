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

  // Group courses by school first, then by semester within each school
  const groupCoursesBySchoolAndSemester = () => {
    const schoolGroups = {}
    
    transcriptData.courses.forEach(course => {
      const school = course.school || 'Unknown School'
      if (!schoolGroups[school]) {
        schoolGroups[school] = {}
      }
      
      const semesterKey = course.semester
      if (!schoolGroups[school][semesterKey]) {
        schoolGroups[school][semesterKey] = {
          semester: course.semester,
          courses: []
        }
      }
      schoolGroups[school][semesterKey].courses.push(course)
    })
    
    return schoolGroups
  }

  const schoolGroups = groupCoursesBySchoolAndSemester()
  const semesterGPAs = calculateSemesterGPA(transcriptData.courses, true)

  return (
    <div 
      className="transcript-preview" 
      id="transcript-preview" 
      style={{ 
        fontFamily: 'Arial, sans-serif', 
        fontSize: '11px', 
        lineHeight: '1.2', 
        color: '#000',
        maxWidth: '8.5in',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '20px',
        minHeight: '11in'
      }}
    >
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        border: '2px solid #000', 
        padding: '10px',
        fontSize: '14px',
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0'
      }}>
        {transcriptData.institutionName || 'LEGEND COLLEGE PREPARATORY'} TRANSCRIPT
      </div>

      {/* Institution Info */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        fontSize: '10px',
        lineHeight: '1.4'
      }}>
        <div style={{ marginBottom: '5px' }}>
          {transcriptData.institutionAddress || '21050 McClellan Road, Cupertino CA 95014'}
        </div>
        <div>
          Tel: {transcriptData.institutionPhone || '(408)865-0366'} &nbsp;&nbsp;
          Email: {transcriptData.institutionEmail || 'transcript@legendcp.com'} &nbsp;&nbsp;
          CEEB Code: {transcriptData.ceebCode || '054732'}
        </div>
      </div>

      {/* Student Information */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '20px',
        border: '2px solid #000'
      }}>
        <tbody>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              fontWeight: 'bold',
              width: '20%',
              fontSize: '10px'
            }}>
              Student Name:
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              width: '30%',
              fontSize: '10px'
            }}>
              {transcriptData.studentName || 'Kondor, Anirud'}
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              fontWeight: 'bold',
              width: '20%',
              fontSize: '10px'
            }}>
              Student Number:
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              width: '30%',
              fontSize: '10px'
            }}>
              {transcriptData.studentNumber || '11807'}
            </td>
          </tr>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              fontWeight: 'bold',
              fontSize: '10px'
            }}>
              Address:
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              fontSize: '10px'
            }} colSpan="3">
              {transcriptData.address || '4848 Tilden Dr., San Jose, CA 95124'}
            </td>
          </tr>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              fontWeight: 'bold',
              fontSize: '10px'
            }}>
              Date of Birth:
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              fontSize: '10px'
            }}>
              {formatDate(transcriptData.dateOfBirth) || 'April 25, 2002'}
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              fontWeight: 'bold',
              fontSize: '10px'
            }}>
              Gender:
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              fontSize: '10px'
            }}>
              {transcriptData.gender || 'Male'}
            </td>
          </tr>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              fontWeight: 'bold',
              fontSize: '10px'
            }}>
              Guardian:
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              fontSize: '10px'
            }}>
              {transcriptData.guardian || 'Padman Kondor, Sangeetha Kondor'}
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              fontWeight: 'bold',
              fontSize: '10px'
            }}>
              SSN:
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              fontSize: '10px'
            }}>
              {formatSSNForDisplay(transcriptData.ssn)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* GPA and Credit Summary */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '20px',
        border: '2px solid #000'
      }}>
        <tbody>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              backgroundColor: '#f0f0f0', 
              fontWeight: 'bold',
              width: '50%',
              fontSize: '10px'
            }}>
              GPA Summary
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              backgroundColor: '#f0f0f0', 
              fontWeight: 'bold',
              width: '50%',
              fontSize: '10px'
            }}>
              Total Credit Completed
            </td>
          </tr>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              fontSize: '10px'
            }}>
              Cumulative GPA (Weighted): {transcriptData.cumulativeGPA || '4.33'}
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              fontSize: '10px'
            }}>
              {transcriptData.totalCredits || '20'} {transcriptData.institutionName || 'Legend College Preparatory'}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Enrollment Summary */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '20px',
        border: '2px solid #000'
      }}>
        <tbody>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              backgroundColor: '#f0f0f0', 
              fontWeight: 'bold',
              fontSize: '10px'
            }} colSpan="4">
              Enrollment Summary
            </td>
          </tr>
          <tr style={{ backgroundColor: '#f8f8f8' }}>
            <td style={{ 
              border: '1px solid #000', 
              padding: '5px', 
              fontWeight: 'bold',
              fontSize: '9px'
            }}>
              Start/End Date
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '5px', 
              fontWeight: 'bold',
              fontSize: '9px'
            }}>
              Grade
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '5px', 
              fontWeight: 'bold',
              fontSize: '9px'
            }}>
              School
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '5px', 
              fontWeight: 'bold',
              fontSize: '9px'
            }}>
              Total Credit Transferred
            </td>
          </tr>
          {transcriptData.enrollmentSummary.slice(0, 7).map((enrollment, index) => (
            <tr key={index}>
              <td style={{ 
                border: '1px solid #000', 
                padding: '5px',
                fontSize: '9px'
              }}>
                {enrollment.startEndDate || (index === 0 ? '2016-2017' : index === 1 ? '2016-2017' : index === 2 ? '2017-2018' : index === 3 ? '2017-2018' : index === 4 ? '2017-2018' : index === 5 ? '2016-2017' : '2016-2017')}
              </td>
              <td style={{ 
                border: '1px solid #000', 
                padding: '5px',
                fontSize: '9px'
              }}>
                {enrollment.grade || (index === 0 ? '9' : index === 1 ? '9' : index === 2 ? '10' : index === 3 ? '10' : index === 4 ? '10' : index === 5 ? '11' : '11')}
              </td>
              <td style={{ 
                border: '1px solid #000', 
                padding: '5px',
                fontSize: '9px'
              }}>
                {enrollment.school || (index === 0 ? 'Leigh High School' : index === 1 ? 'Foothill College' : index === 2 ? 'Leigh High School' : index === 3 ? 'Foothill College' : index === 4 ? 'De Anza College' : index === 5 ? 'Legend College Preparatory' : 'Leigh High School')}
              </td>
              <td style={{ 
                border: '1px solid #000', 
                padding: '5px',
                fontSize: '9px'
              }}>
                {index === 0 ? '150 Leigh High School' : index === 1 ? '30 Foothill College' : index === 2 ? '10 De Anza College' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Credit Summary */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '20px',
        border: '2px solid #000'
      }}>
        <tbody>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px', 
              backgroundColor: '#f0f0f0', 
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '10px'
            }} colSpan="2">
              Credit Summary<br />
              Curriculum Track: College Prep, Honors
            </td>
          </tr>
          <tr>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              width: '50%',
              fontSize: '9px',
              verticalAlign: 'top'
            }}>
              <div style={{ marginBottom: '5px' }}>
                <strong>History/Social Science</strong> &nbsp;&nbsp; 
                Earned: {transcriptData.creditSummary[0]?.earned || 25} &nbsp;&nbsp; 
                Required: {transcriptData.creditSummary[0]?.required || 30}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>English</strong> &nbsp;&nbsp; 
                Earned: {transcriptData.creditSummary[1]?.earned || 25} &nbsp;&nbsp; 
                Required: {transcriptData.creditSummary[1]?.required || 40}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Foreign Language</strong> &nbsp;&nbsp; 
                Earned: {transcriptData.creditSummary[4]?.earned || 10} &nbsp;&nbsp; 
                Required: {transcriptData.creditSummary[4]?.required || 20}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Physical Education</strong> &nbsp;&nbsp; 
                Earned: {transcriptData.creditSummary[7]?.earned || 20} &nbsp;&nbsp; 
                Required: {transcriptData.creditSummary[7]?.required || 10}
              </div>
              <div>
                <strong>Elective</strong> &nbsp;&nbsp; 
                Earned: {transcriptData.creditSummary[6]?.earned || 60} &nbsp;&nbsp; 
                Required: {transcriptData.creditSummary[6]?.required || 70}
              </div>
            </td>
            <td style={{ 
              border: '1px solid #000', 
              padding: '8px',
              width: '50%',
              fontSize: '9px',
              verticalAlign: 'top'
            }}>
              <div style={{ marginBottom: '5px' }}>
                <strong>Mathematics</strong> &nbsp;&nbsp; 
                Earned: {transcriptData.creditSummary[2]?.earned || 45} &nbsp;&nbsp; 
                Required: {transcriptData.creditSummary[2]?.required || 40}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Laboratory Science</strong> &nbsp;&nbsp; 
                Earned: {transcriptData.creditSummary[3]?.earned || 35} &nbsp;&nbsp; 
                Required: {transcriptData.creditSummary[3]?.required || 30}
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Arts</strong> &nbsp;&nbsp; 
                Earned: {transcriptData.creditSummary[5]?.earned || 10} &nbsp;&nbsp; 
                Required: {transcriptData.creditSummary[5]?.required || 20}
              </div>
              <div style={{ marginBottom: '5px', color: '#666' }}>
                [Additional Subject]
              </div>
              <div style={{ color: '#666' }}>
                [Additional Subject]
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Course Records by School */}
      {Object.keys(schoolGroups).length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          {Object.entries(schoolGroups)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([school, semesterGroups]) => {
              const semesters = Object.values(semesterGroups).sort((a, b) => a.semester.localeCompare(b.semester))
              
              return (
                <table key={school} style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse', 
                  marginBottom: '15px',
                  border: '2px solid #000',
                  pageBreakInside: 'avoid'
                }}>
                  <tbody>
                    {/* School Header */}
                    <tr>
                      <td style={{ 
                        border: '1px solid #000',
                        backgroundColor: '#e8e8e8', 
                        padding: '8px', 
                        fontWeight: 'bold', 
                        fontSize: '11px',
                        textAlign: 'center'
                      }} colSpan="12">
                        #{school}
                      </td>
                    </tr>

                    {/* Semester Headers Side by Side */}
                    {Array.from({ length: Math.ceil(semesters.length / 2) }, (_, rowIndex) => {
                      const leftSemester = semesters[rowIndex * 2]
                      const rightSemester = semesters[rowIndex * 2 + 1]
                      
                      return (
                        <React.Fragment key={rowIndex}>
                          {/* Semester Headers */}
                          <tr>
                            <td style={{ 
                              border: '1px solid #000',
                              backgroundColor: '#f8f8f8',
                              padding: '6px',
                              fontWeight: 'bold',
                              fontSize: '9px'
                            }} colSpan={rightSemester ? "6" : "12"}>
                              {leftSemester.semester} Semester:
                            </td>
                            {rightSemester && (
                              <td style={{ 
                                border: '1px solid #000',
                                backgroundColor: '#f8f8f8',
                                padding: '6px',
                                fontWeight: 'bold',
                                fontSize: '9px'
                              }} colSpan="6">
                                {rightSemester.semester} Semester:
                              </td>
                            )}
                          </tr>

                          {/* Column Headers */}
                          <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>Grade Level</td>
                            <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>School Year</td>
                            <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>Course Title</td>
                            <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>H/AP</td>
                            <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>Grade</td>
                            <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>Credits</td>
                            {rightSemester && (
                              <>
                                <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>Grade Level</td>
                                <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>School Year</td>
                                <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>Course Title</td>
                                <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>H/AP</td>
                                <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>Grade</td>
                                <td style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold', fontSize: '8px' }}>Credits</td>
                              </>
                            )}
                          </tr>

                          {/* Course Rows */}
                          {renderSemesterCourseRows(leftSemester, rightSemester, semesterGPAs)}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
                </table>
              )
            })}
        </div>
      )}

      {/* Comments and Signature Section */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        border: '2px solid #000'
      }}>
        <tbody>
          <tr>
            <td style={{ 
              border: '1px solid #000',
              padding: '10px',
              width: '60%',
              verticalAlign: 'top',
              fontSize: '9px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '10px' }}>
                Comments
              </div>
              <div style={{ minHeight: '80px', lineHeight: '1.4' }}>
                {transcriptData.comments || 'UNOFFICIAL TRANSCRIPT\nCL-College Level IP- In Progress P- Pass F- Fail'}
              </div>
              
              {/* Digital Stamp */}
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
            
            <td style={{ 
              border: '1px solid #000',
              padding: '10px',
              width: '40%',
              textAlign: 'center',
              verticalAlign: 'top',
              fontSize: '9px'
            }}>
              {/* Principal Signature */}
              <div style={{ marginTop: '20px' }}>
                {transcriptData.signature && (
                  <div style={{ marginBottom: '15px' }}>
                    <img
                      src={transcriptData.signature.preview}
                      alt="Principal Signature"
                      style={{ height: '60px', maxWidth: '150px', margin: '0 auto', objectFit: 'contain' }}
                    />
                  </div>
                )}
                <div style={{ 
                  borderTop: '1px solid #000', 
                  paddingTop: '8px', 
                  marginTop: '30px'
                }}>
                  <div style={{ marginBottom: '5px' }}>
                    Principal Signature: {transcriptData.principalName || 'Principal Name'}
                  </div>
                  <div>
                    Date: {formatDate(transcriptData.dateSigned) || 'January 31, 2019'}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// Helper function to render course rows for side-by-side semesters
const renderSemesterCourseRows = (leftSemester, rightSemester, semesterGPAs) => {
  // Group courses by grade level for both semesters
  const groupByGradeLevel = (semester) => {
    const gradeGroups = {}
    semester.courses.forEach(course => {
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
    return Object.values(gradeGroups).sort((a, b) => a.gradeLevel - b.gradeLevel)
  }

  const leftGradeGroups = groupByGradeLevel(leftSemester)
  const rightGradeGroups = rightSemester ? groupByGradeLevel(rightSemester) : []
  
  const rows = []
  const maxGroups = Math.max(leftGradeGroups.length, rightGradeGroups.length)

  for (let i = 0; i < maxGroups; i++) {
    const leftGroup = leftGradeGroups[i]
    const rightGroup = rightGradeGroups[i]
    
    if (leftGroup || rightGroup) {
      // Render courses for this grade level
      const maxCourses = Math.max(
        leftGroup ? leftGroup.courses.length : 0,
        rightGroup ? rightGroup.courses.length : 0
      )

      for (let j = 0; j < maxCourses; j++) {
        const leftCourse = leftGroup ? leftGroup.courses[j] : null
        const rightCourse = rightGroup ? rightGroup.courses[j] : null

        rows.push(
          <tr key={`${i}-${j}`}>
            {/* Left Semester Course */}
            <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
              {leftCourse ? leftCourse.gradeLevel : ''}
            </td>
            <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
              {leftCourse ? `'${leftCourse.schoolYear}` : ''}
            </td>
            <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
              {leftCourse ? leftCourse.courseTitle : ''}
            </td>
            <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
              {leftCourse ? (leftCourse.hap || '') : ''}
            </td>
            <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
              {leftCourse ? leftCourse.grade : ''}
            </td>
            <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
              {leftCourse ? (isGradeCountedForGPA(leftCourse.grade) ? leftCourse.credits : '') : ''}
            </td>
            
            {/* Right Semester Course (if exists) */}
            {rightSemester && (
              <>
                <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
                  {rightCourse ? rightCourse.gradeLevel : ''}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
                  {rightCourse ? `'${rightCourse.schoolYear}` : ''}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
                  {rightCourse ? rightCourse.courseTitle : ''}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
                  {rightCourse ? (rightCourse.hap || '') : ''}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
                  {rightCourse ? rightCourse.grade : ''}
                </td>
                <td style={{ border: '1px solid #000', padding: '3px', fontSize: '8px' }}>
                  {rightCourse ? (isGradeCountedForGPA(rightCourse.grade) ? rightCourse.credits : '') : ''}
                </td>
              </>
            )}
          </tr>
        )
      }

      // Add GPA rows for each grade level
      const leftGpaKey = leftGroup ? `${leftGroup.gradeLevel}-${leftGroup.schoolYear}-${leftSemester.semester}` : null
      const rightGpaKey = rightGroup ? `${rightGroup.gradeLevel}-${rightGroup.schoolYear}-${rightSemester?.semester}` : null
      const leftGPA = leftGpaKey ? semesterGPAs[leftGpaKey] : null
      const rightGPA = rightGpaKey ? semesterGPAs[rightGpaKey] : null

      if (leftGPA || rightGPA) {
        rows.push(
          <tr key={`gpa-${i}`} style={{ backgroundColor: '#f9f9f9' }}>
            <td style={{ 
              border: '1px solid #000', 
              padding: '4px', 
              fontWeight: 'bold', 
              fontSize: '8px'
            }} colSpan={rightSemester ? "6" : "12"}>
              {leftGPA ? `Sem. GPA (Weighted): ${leftGPA.gpa.toFixed(2)}` : ''}
            </td>
            {rightSemester && (
              <td style={{ 
                border: '1px solid #000', 
                padding: '4px', 
                fontWeight: 'bold', 
                fontSize: '8px'
              }} colSpan="6">
                {rightGPA ? `Sem. GPA (Weighted): ${rightGPA.gpa.toFixed(2)}` : ''}
              </td>
            )}
          </tr>
        )
      }
    }
  }

  return rows
}

export default TranscriptPreview