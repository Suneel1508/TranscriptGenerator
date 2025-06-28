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

  // Function to render courses for a school with side-by-side semester layout
  const renderSchoolCourses = (school, semesterGroups) => {
    const semesters = Object.values(semesterGroups).sort((a, b) => a.semester.localeCompare(b.semester))
    
    // Group semesters in pairs for side-by-side display
    const semesterPairs = []
    for (let i = 0; i < semesters.length; i += 2) {
      semesterPairs.push({
        left: semesters[i],
        right: semesters[i + 1] || null
      })
    }

    return (
      <div key={school} style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
        {/* School Header */}
        <div style={{ 
          backgroundColor: '#f0f0f0', 
          border: '2px solid black', 
          padding: '4px 8px', 
          fontWeight: 'bold', 
          fontSize: '10px',
          marginBottom: '2px'
        }}>
          #{school}
        </div>

        {/* Semester Tables - Side by Side with Simplified Structure */}
        {semesterPairs.map((pair, pairIndex) => (
          <table key={pairIndex} style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            fontSize: '9px', 
            border: '2px solid black',
            marginBottom: '5px'
          }}>
            <tbody>
              {/* Semester Headers Row */}
              <tr>
                <td style={{ 
                  padding: '4px 8px', 
                  fontWeight: 'bold', 
                  backgroundColor: '#f0f0f0', 
                  border: '1px solid black',
                  width: '50%'
                }}>
                  {pair.left.semester} Semester:
                </td>
                {pair.right && (
                  <td style={{ 
                    padding: '4px 8px', 
                    fontWeight: 'bold', 
                    backgroundColor: '#f0f0f0', 
                    border: '1px solid black',
                    width: '50%'
                  }}>
                    {pair.right.semester} Semester:
                  </td>
                )}
                {!pair.right && (
                  <td style={{ 
                    border: '1px solid black',
                    width: '50%'
                  }}></td>
                )}
              </tr>
              
              {/* Column Headers Row */}
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <td style={{ 
                  padding: '2px 4px', 
                  fontWeight: 'bold', 
                  border: '1px solid black',
                  fontSize: '8px'
                }}>
                  Grade Level | School Year | Course Title | H/AP | Grade | Credits
                </td>
                {pair.right && (
                  <td style={{ 
                    padding: '2px 4px', 
                    fontWeight: 'bold', 
                    border: '1px solid black',
                    fontSize: '8px'
                  }}>
                    Grade Level | School Year | Course Title | H/AP | Grade | Credits
                  </td>
                )}
                {!pair.right && (
                  <td style={{ border: '1px solid black' }}></td>
                )}
              </tr>

              {/* Course Rows */}
              {renderSemesterCourseRows(pair.left, pair.right)}
            </tbody>
          </table>
        ))}
      </div>
    )
  }

  // Function to render course rows for side-by-side semesters - SIMPLIFIED
  const renderSemesterCourseRows = (leftSemester, rightSemester) => {
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
              <td style={{ 
                padding: '2px 4px', 
                border: '1px solid black',
                fontSize: '8px'
              }}>
                {leftCourse ? (
                  `${leftCourse.gradeLevel} | '${leftCourse.schoolYear} | ${leftCourse.courseTitle} | ${leftCourse.hap || ''} | ${leftCourse.grade} | ${isGradeCountedForGPA(leftCourse.grade) ? leftCourse.credits : ''}`
                ) : ''}
              </td>
              <td style={{ 
                padding: '2px 4px', 
                border: '1px solid black',
                fontSize: '8px'
              }}>
                {rightCourse ? (
                  `${rightCourse.gradeLevel} | '${rightCourse.schoolYear} | ${rightCourse.courseTitle} | ${rightCourse.hap || ''} | ${rightCourse.grade} | ${isGradeCountedForGPA(rightCourse.grade) ? rightCourse.credits : ''}`
                ) : ''}
              </td>
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
                padding: '3px 4px', 
                fontWeight: 'bold', 
                fontSize: '8px', 
                border: '1px solid black'
              }}>
                {leftGPA ? `Sem. GPA (Weighted): ${leftGPA.gpa.toFixed(2)}` : ''}
              </td>
              <td style={{ 
                padding: '3px 4px', 
                fontWeight: 'bold', 
                fontSize: '8px', 
                border: '1px solid black'
              }}>
                {rightGPA ? `Sem. GPA (Weighted): ${rightGPA.gpa.toFixed(2)}` : ''}
              </td>
            </tr>
          )
        }
      }
    }

    return rows
  }

  return (
    <div className="transcript-preview bg-white p-6 min-h-[800px]" id="transcript-preview" style={{ 
      fontFamily: 'Arial, sans-serif', 
      fontSize: '11px', 
      lineHeight: '1.2', 
      color: 'black',
      maxWidth: '8.5in',
      margin: '0 auto'
    }}>
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

      {/* Student Information */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', border: '2px solid black', fontSize: '10px' }}>
        <tbody>
          <tr>
            <td style={{ padding: '4px 8px', border: '1px solid black', fontWeight: 'bold', width: '15%' }}>Student Name:</td>
            <td style={{ padding: '4px 8px', border: '1px solid black', width: '35%' }}>{transcriptData.studentName || 'Kondor, Anirud'}</td>
            <td style={{ padding: '4px 8px', border: '1px solid black', fontWeight: 'bold', width: '15%' }}>Student Number:</td>
            <td style={{ padding: '4px 8px', border: '1px solid black', width: '35%' }}>{transcriptData.studentNumber || '11807'}</td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', border: '1px solid black', fontWeight: 'bold' }}>Address:</td>
            <td style={{ padding: '4px 8px', border: '1px solid black' }} colSpan="3">{transcriptData.address || '4848 Tilden Dr., San Jose, CA 95124'}</td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', border: '1px solid black', fontWeight: 'bold' }}>Date of Birth:</td>
            <td style={{ padding: '4px 8px', border: '1px solid black' }}>{formatDate(transcriptData.dateOfBirth) || 'April 25, 2002'}</td>
            <td style={{ padding: '4px 8px', border: '1px solid black', fontWeight: 'bold' }}>Gender:</td>
            <td style={{ padding: '4px 8px', border: '1px solid black' }}>{transcriptData.gender || 'Male'}</td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', border: '1px solid black', fontWeight: 'bold' }}>Guardian:</td>
            <td style={{ padding: '4px 8px', border: '1px solid black' }}>{transcriptData.guardian || 'Padman Kondor, Sangeetha Kondor'}</td>
            <td style={{ padding: '4px 8px', border: '1px solid black', fontWeight: 'bold' }}>SSN:</td>
            <td style={{ padding: '4px 8px', border: '1px solid black' }}>{formatSSNForDisplay(transcriptData.ssn)}</td>
          </tr>
        </tbody>
      </table>

      {/* GPA and Credit Summary */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', border: '2px solid black', marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', border: '1px solid black', width: '50%' }}>GPA Summary</td>
            <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', border: '1px solid black', width: '50%' }}>Total Credit Completed</td>
          </tr>
          <tr>
            <td style={{ padding: '4px 8px', border: '1px solid black' }}>Cumulative GPA (Weighted): {transcriptData.cumulativeGPA || '4.33'}</td>
            <td style={{ padding: '4px 8px', border: '1px solid black' }}>{transcriptData.totalCredits || '20'} {transcriptData.institutionName || 'Legend College Preparatory'}</td>
          </tr>
        </tbody>
      </table>

      {/* Enrollment Summary */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', border: '2px solid black', marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', border: '1px solid black' }} colSpan="3">Enrollment Summary</td>
            <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', border: '1px solid black' }}>Total Credit Transferred</td>
          </tr>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <td style={{ padding: '3px 8px', fontWeight: 'bold', border: '1px solid black', width: '25%' }}>Start/End Date</td>
            <td style={{ padding: '3px 8px', fontWeight: 'bold', border: '1px solid black', width: '15%' }}>Grade</td>
            <td style={{ padding: '3px 8px', fontWeight: 'bold', border: '1px solid black', width: '35%' }}>School</td>
            <td style={{ padding: '3px 8px', border: '1px solid black', width: '25%' }}></td>
          </tr>
          {transcriptData.enrollmentSummary.slice(0, 7).map((enrollment, index) => (
            <tr key={index}>
              <td style={{ padding: '3px 8px', border: '1px solid black' }}>{enrollment.startEndDate || (index === 0 ? '2016-2017' : index === 1 ? '2016-2017' : index === 2 ? '2017-2018' : index === 3 ? '2017-2018' : index === 4 ? '2017-2018' : index === 5 ? '2016-2017' : '2016-2017')}</td>
              <td style={{ padding: '3px 8px', border: '1px solid black' }}>{enrollment.grade || (index === 0 ? '9' : index === 1 ? '9' : index === 2 ? '10' : index === 3 ? '10' : index === 4 ? '10' : index === 5 ? '11' : '11')}</td>
              <td style={{ padding: '3px 8px', border: '1px solid black' }}>{enrollment.school || (index === 0 ? 'Leigh High School' : index === 1 ? 'Foothill College' : index === 2 ? 'Leigh High School' : index === 3 ? 'Foothill College' : index === 4 ? 'De Anza College' : index === 5 ? 'Legend College Preparatory' : 'Leigh High School')}</td>
              <td style={{ padding: '3px 8px', border: '1px solid black' }}>{index === 0 ? '150 Leigh High School' : index === 1 ? '30 Foothill College' : index === 2 ? '10 De Anza College' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Credit Summary */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ backgroundColor: '#e8e8e8', border: '2px solid black', borderBottom: '1px solid black', padding: '4px 8px', fontWeight: 'bold', fontSize: '10px' }}>
          Credit Summary<br />
          Curriculum Track: College Prep, Honors
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid black', borderTop: 'none', fontSize: '9px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 8px', border: '1px solid black', width: '50%' }}>
                <strong>History/Social Science</strong> Earned: {transcriptData.creditSummary[0]?.earned || 25} Required: {transcriptData.creditSummary[0]?.required || 30}
              </td>
              <td style={{ padding: '4px 8px', border: '1px solid black', width: '50%' }}>
                <strong>English</strong> Earned: {transcriptData.creditSummary[1]?.earned || 25} Required: {transcriptData.creditSummary[1]?.required || 40}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px', border: '1px solid black' }}>
                <strong>Mathematics</strong> Earned: {transcriptData.creditSummary[2]?.earned || 45} Required: {transcriptData.creditSummary[2]?.required || 40}
              </td>
              <td style={{ padding: '4px 8px', border: '1px solid black' }}>
                <strong>Laboratory Science</strong> Earned: {transcriptData.creditSummary[3]?.earned || 35} Required: {transcriptData.creditSummary[3]?.required || 30}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px', border: '1px solid black' }}>
                <strong>Foreign Language</strong> Earned: {transcriptData.creditSummary[4]?.earned || 10} Required: {transcriptData.creditSummary[4]?.required || 20}
              </td>
              <td style={{ padding: '4px 8px', border: '1px solid black' }}>
                <strong>Arts</strong> Earned: {transcriptData.creditSummary[5]?.earned || 10} Required: {transcriptData.creditSummary[5]?.required || 20}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px', border: '1px solid black' }}>
                <strong>Elective</strong> Earned: {transcriptData.creditSummary[6]?.earned || 60} Required: {transcriptData.creditSummary[6]?.required || 70}
              </td>
              <td style={{ padding: '4px 8px', border: '1px solid black' }}>
                <strong>Physical Education</strong> Earned: {transcriptData.creditSummary[7]?.earned || 20} Required: {transcriptData.creditSummary[7]?.required || 10}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Course Records - SCHOOL-BASED GROUPING WITH SIMPLIFIED SIDE-BY-SIDE SEMESTERS */}
      {Object.keys(schoolGroups).length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          {Object.entries(schoolGroups)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([school, semesterGroups]) => renderSchoolCourses(school, semesterGroups))}
        </div>
      )}

      {/* Comments and Signature Section */}
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid black', marginTop: '30px' }}>
        <tbody>
          <tr>
            <td style={{ padding: '8px', width: '60%', verticalAlign: 'top', border: '1px solid black' }}>
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
            
            <td style={{ padding: '8px', width: '40%', verticalAlign: 'top', textAlign: 'center', border: '1px solid black' }}>
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
  )
}

export default TranscriptPreview