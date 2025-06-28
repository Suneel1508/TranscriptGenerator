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

  // Simple border style for all elements
  const borderStyle = '1px solid #000'
  const thickBorderStyle = '2px solid #000'

  return (
    <div 
      className="transcript-preview bg-white p-6 min-h-[800px]" 
      id="transcript-preview" 
      style={{ 
        fontFamily: 'Arial, sans-serif', 
        fontSize: '11px', 
        lineHeight: '1.2', 
        color: '#000',
        maxWidth: '8.5in',
        margin: '0 auto',
        backgroundColor: '#fff'
      }}
    >
      {/* Header - Simple Box */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '15px', 
        backgroundColor: '#e8e8e8', 
        padding: '8px', 
        border: thickBorderStyle,
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        {transcriptData.institutionName || 'LEGEND COLLEGE PREPARATORY'} TRANSCRIPT
      </div>

      {/* Institution Info - Simple Text */}
      <div style={{ textAlign: 'center', marginBottom: '15px', fontSize: '10px' }}>
        <div>{transcriptData.institutionAddress || '21050 McClellan Road, Cupertino CA 95014'}</div>
        <div>
          Tel: {transcriptData.institutionPhone || '(408)865-0366'} &nbsp;&nbsp;
          Email: {transcriptData.institutionEmail || 'transcript@legendcp.com'} &nbsp;&nbsp;
          CEEB Code: {transcriptData.ceebCode || '054732'}
        </div>
      </div>

      {/* Student Information - Simple Grid Layout */}
      <div style={{ 
        border: thickBorderStyle, 
        padding: '8px', 
        marginBottom: '15px',
        fontSize: '10px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '4px' }}>
          <div><strong>Student Name:</strong> {transcriptData.studentName || 'Kondor, Anirud'}</div>
          <div><strong>Student Number:</strong> {transcriptData.studentNumber || '11807'}</div>
        </div>
        <div style={{ marginBottom: '4px' }}>
          <strong>Address:</strong> {transcriptData.address || '4848 Tilden Dr., San Jose, CA 95124'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '4px' }}>
          <div><strong>Date of Birth:</strong> {formatDate(transcriptData.dateOfBirth) || 'April 25, 2002'}</div>
          <div><strong>Gender:</strong> {transcriptData.gender || 'Male'}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div><strong>Guardian:</strong> {transcriptData.guardian || 'Padman Kondor, Sangeetha Kondor'}</div>
          <div><strong>SSN:</strong> {formatSSNForDisplay(transcriptData.ssn)}</div>
        </div>
      </div>

      {/* GPA and Credit Summary - Simple Grid */}
      <div style={{ 
        border: thickBorderStyle, 
        marginBottom: '15px',
        fontSize: '10px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          backgroundColor: '#e8e8e8',
          padding: '4px 8px',
          fontWeight: 'bold',
          borderBottom: borderStyle
        }}>
          <div>GPA Summary</div>
          <div>Total Credit Completed</div>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          padding: '4px 8px'
        }}>
          <div>Cumulative GPA (Weighted): {transcriptData.cumulativeGPA || '4.33'}</div>
          <div>{transcriptData.totalCredits || '20'} {transcriptData.institutionName || 'Legend College Preparatory'}</div>
        </div>
      </div>

      {/* Enrollment Summary - Simple Layout */}
      <div style={{ 
        border: thickBorderStyle, 
        marginBottom: '15px',
        fontSize: '10px'
      }}>
        <div style={{ 
          backgroundColor: '#e8e8e8',
          padding: '4px 8px',
          fontWeight: 'bold',
          borderBottom: borderStyle
        }}>
          Enrollment Summary
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 2fr 1fr', 
          gap: '8px',
          padding: '4px 8px',
          backgroundColor: '#f5f5f5',
          fontWeight: 'bold',
          borderBottom: borderStyle
        }}>
          <div>Start/End Date</div>
          <div>Grade</div>
          <div>School</div>
          <div>Total Credit Transferred</div>
        </div>
        {transcriptData.enrollmentSummary.slice(0, 7).map((enrollment, index) => (
          <div key={index} style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 2fr 1fr', 
            gap: '8px',
            padding: '3px 8px',
            borderBottom: index < 6 ? borderStyle : 'none'
          }}>
            <div>{enrollment.startEndDate || (index === 0 ? '2016-2017' : index === 1 ? '2016-2017' : index === 2 ? '2017-2018' : index === 3 ? '2017-2018' : index === 4 ? '2017-2018' : index === 5 ? '2016-2017' : '2016-2017')}</div>
            <div>{enrollment.grade || (index === 0 ? '9' : index === 1 ? '9' : index === 2 ? '10' : index === 3 ? '10' : index === 4 ? '10' : index === 5 ? '11' : '11')}</div>
            <div>{enrollment.school || (index === 0 ? 'Leigh High School' : index === 1 ? 'Foothill College' : index === 2 ? 'Leigh High School' : index === 3 ? 'Foothill College' : index === 4 ? 'De Anza College' : index === 5 ? 'Legend College Preparatory' : 'Leigh High School')}</div>
            <div>{index === 0 ? '150 Leigh High School' : index === 1 ? '30 Foothill College' : index === 2 ? '10 De Anza College' : ''}</div>
          </div>
        ))}
      </div>

      {/* Credit Summary - Simple Grid Layout */}
      <div style={{ 
        border: thickBorderStyle, 
        marginBottom: '15px',
        fontSize: '9px'
      }}>
        <div style={{ 
          backgroundColor: '#e8e8e8',
          padding: '4px 8px',
          fontWeight: 'bold',
          borderBottom: borderStyle
        }}>
          Credit Summary<br />
          Curriculum Track: College Prep, Honors
        </div>
        <div style={{ padding: '8px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '4px' }}>
            <div><strong>History/Social Science</strong> Earned: {transcriptData.creditSummary[0]?.earned || 25} Required: {transcriptData.creditSummary[0]?.required || 30}</div>
            <div><strong>English</strong> Earned: {transcriptData.creditSummary[1]?.earned || 25} Required: {transcriptData.creditSummary[1]?.required || 40}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '4px' }}>
            <div><strong>Mathematics</strong> Earned: {transcriptData.creditSummary[2]?.earned || 45} Required: {transcriptData.creditSummary[2]?.required || 40}</div>
            <div><strong>Laboratory Science</strong> Earned: {transcriptData.creditSummary[3]?.earned || 35} Required: {transcriptData.creditSummary[3]?.required || 30}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '4px' }}>
            <div><strong>Foreign Language</strong> Earned: {transcriptData.creditSummary[4]?.earned || 10} Required: {transcriptData.creditSummary[4]?.required || 20}</div>
            <div><strong>Arts</strong> Earned: {transcriptData.creditSummary[5]?.earned || 10} Required: {transcriptData.creditSummary[5]?.required || 20}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><strong>Elective</strong> Earned: {transcriptData.creditSummary[6]?.earned || 60} Required: {transcriptData.creditSummary[6]?.required || 70}</div>
            <div><strong>Physical Education</strong> Earned: {transcriptData.creditSummary[7]?.earned || 20} Required: {transcriptData.creditSummary[7]?.required || 10}</div>
          </div>
        </div>
      </div>

      {/* Course Records - SIMPLIFIED SCHOOL-BASED LAYOUT */}
      {Object.keys(schoolGroups).length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          {Object.entries(schoolGroups)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([school, semesterGroups]) => {
              const semesters = Object.values(semesterGroups).sort((a, b) => a.semester.localeCompare(b.semester))
              
              return (
                <div key={school} style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
                  {/* School Header */}
                  <div style={{ 
                    backgroundColor: '#f0f0f0', 
                    border: thickBorderStyle, 
                    padding: '4px 8px', 
                    fontWeight: 'bold', 
                    fontSize: '10px',
                    marginBottom: '2px'
                  }}>
                    #{school}
                  </div>

                  {/* Semesters Side by Side - SIMPLIFIED */}
                  <div style={{ 
                    border: thickBorderStyle,
                    fontSize: '9px'
                  }}>
                    {/* Create pairs of semesters for side-by-side display */}
                    {Array.from({ length: Math.ceil(semesters.length / 2) }, (_, rowIndex) => {
                      const leftSemester = semesters[rowIndex * 2]
                      const rightSemester = semesters[rowIndex * 2 + 1]
                      
                      return (
                        <div key={rowIndex}>
                          {/* Semester Headers */}
                          <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: rightSemester ? '1fr 1fr' : '1fr',
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            borderBottom: borderStyle
                          }}>
                            <div style={{ 
                              padding: '4px 8px',
                              borderRight: rightSemester ? borderStyle : 'none'
                            }}>
                              {leftSemester.semester} Semester:
                            </div>
                            {rightSemester && (
                              <div style={{ padding: '4px 8px' }}>
                                {rightSemester.semester} Semester:
                              </div>
                            )}
                          </div>

                          {/* Column Headers */}
                          <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: rightSemester ? '1fr 1fr' : '1fr',
                            backgroundColor: '#f5f5f5',
                            fontWeight: 'bold',
                            fontSize: '8px',
                            borderBottom: borderStyle
                          }}>
                            <div style={{ 
                              padding: '2px 4px',
                              borderRight: rightSemester ? borderStyle : 'none'
                            }}>
                              Grade Level | School Year | Course Title | H/AP | Grade | Credits
                            </div>
                            {rightSemester && (
                              <div style={{ padding: '2px 4px' }}>
                                Grade Level | School Year | Course Title | H/AP | Grade | Credits
                              </div>
                            )}
                          </div>

                          {/* Course Rows */}
                          {renderSemesterCourseRows(leftSemester, rightSemester, semesterGPAs, borderStyle)}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      )}

      {/* Comments and Signature Section - SIMPLIFIED */}
      <div style={{ 
        border: thickBorderStyle,
        marginTop: '30px',
        display: 'grid',
        gridTemplateColumns: '60% 40%'
      }}>
        <div style={{ 
          padding: '8px',
          borderRight: borderStyle,
          verticalAlign: 'top'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '10px' }}>Comments</div>
          <div style={{ fontSize: '9px', minHeight: '80px' }}>
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
        </div>
        
        <div style={{ 
          padding: '8px',
          textAlign: 'center',
          verticalAlign: 'top'
        }}>
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
            <div style={{ 
              borderTop: borderStyle, 
              paddingTop: '5px', 
              fontSize: '9px',
              marginTop: '20px'
            }}>
              <div>Principal Signature: {transcriptData.principalName || 'Principal Name'}</div>
              <div>Date: {formatDate(transcriptData.dateSigned) || 'January 31, 2019'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to render course rows for side-by-side semesters
const renderSemesterCourseRows = (leftSemester, rightSemester, semesterGPAs, borderStyle) => {
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
          <div key={`${i}-${j}`} style={{ 
            display: 'grid', 
            gridTemplateColumns: rightSemester ? '1fr 1fr' : '1fr',
            borderBottom: borderStyle,
            fontSize: '8px'
          }}>
            <div style={{ 
              padding: '2px 4px',
              borderRight: rightSemester ? borderStyle : 'none'
            }}>
              {leftCourse ? (
                `${leftCourse.gradeLevel} | '${leftCourse.schoolYear} | ${leftCourse.courseTitle} | ${leftCourse.hap || ''} | ${leftCourse.grade} | ${isGradeCountedForGPA(leftCourse.grade) ? leftCourse.credits : ''}`
              ) : ''}
            </div>
            {rightSemester && (
              <div style={{ padding: '2px 4px' }}>
                {rightCourse ? (
                  `${rightCourse.gradeLevel} | '${rightCourse.schoolYear} | ${rightCourse.courseTitle} | ${rightCourse.hap || ''} | ${rightCourse.grade} | ${isGradeCountedForGPA(rightCourse.grade) ? rightCourse.credits : ''}`
                ) : ''}
              </div>
            )}
          </div>
        )
      }

      // Add GPA rows for each grade level
      const leftGpaKey = leftGroup ? `${leftGroup.gradeLevel}-${leftGroup.schoolYear}-${leftSemester.semester}` : null
      const rightGpaKey = rightGroup ? `${rightGroup.gradeLevel}-${rightGroup.schoolYear}-${rightSemester?.semester}` : null
      const leftGPA = leftGpaKey ? semesterGPAs[leftGpaKey] : null
      const rightGPA = rightGpaKey ? semesterGPAs[rightGpaKey] : null

      if (leftGPA || rightGPA) {
        rows.push(
          <div key={`gpa-${i}`} style={{ 
            display: 'grid', 
            gridTemplateColumns: rightSemester ? '1fr 1fr' : '1fr',
            backgroundColor: '#f9f9f9',
            fontWeight: 'bold',
            fontSize: '8px',
            borderBottom: borderStyle
          }}>
            <div style={{ 
              padding: '3px 4px',
              borderRight: rightSemester ? borderStyle : 'none'
            }}>
              {leftGPA ? `Sem. GPA (Weighted): ${leftGPA.gpa.toFixed(2)}` : ''}
            </div>
            {rightSemester && (
              <div style={{ padding: '3px 4px' }}>
                {rightGPA ? `Sem. GPA (Weighted): ${rightGPA.gpa.toFixed(2)}` : ''}
              </div>
            )}
          </div>
        )
      }
    }
  }

  return rows
}

export default TranscriptPreview