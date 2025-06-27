import React from 'react'
import { useTranscript } from '../context/TranscriptContext'
import { 
  groupCoursesBySchoolAndSemester, 
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

  const schoolGroups = groupCoursesBySchoolAndSemester(transcriptData.courses)
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

      {/* Student Information - Clean format without internal borders */}
      <div style={{ marginBottom: '15px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', border: '2px solid black' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 8px', fontWeight: 'bold', width: '15%' }}>Student Name:</td>
              <td style={{ padding: '4px 8px', width: '35%' }}>{transcriptData.studentName || 'Kondor, Anirud'}</td>
              <td style={{ padding: '4px 8px', fontWeight: 'bold', width: '15%', borderLeft: '1px solid black' }}>Student Number:</td>
              <td style={{ padding: '4px 8px', width: '35%' }}>{transcriptData.studentNumber || '11807'}</td>
            </tr>
            <tr style={{ borderTop: '1px solid black' }}>
              <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>Address:</td>
              <td style={{ padding: '4px 8px' }} colSpan="3">{transcriptData.address || '4848 Tilden Dr., San Jose, CA 95124'}</td>
            </tr>
            <tr style={{ borderTop: '1px solid black' }}>
              <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>Date of Birth:</td>
              <td style={{ padding: '4px 8px' }}>{formatDate(transcriptData.dateOfBirth) || 'April 25, 2002'}</td>
              <td style={{ padding: '4px 8px', fontWeight: 'bold', borderLeft: '1px solid black' }}>Gender:</td>
              <td style={{ padding: '4px 8px' }}>{transcriptData.gender || 'Male'}</td>
            </tr>
            <tr style={{ borderTop: '1px solid black' }}>
              <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>Guardian:</td>
              <td style={{ padding: '4px 8px' }}>{transcriptData.guardian || 'Padman Kondor, Sangeetha Kondor'}</td>
              <td style={{ padding: '4px 8px', fontWeight: 'bold', borderLeft: '1px solid black' }}>SSN:</td>
              <td style={{ padding: '4px 8px' }}>{formatSSNForDisplay(transcriptData.ssn)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* GPA and Credit Summary - Clean format */}
      <div style={{ marginBottom: '15px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', border: '2px solid black' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', width: '50%', borderBottom: '1px solid black' }}>GPA Summary</td>
              <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', width: '50%', borderLeft: '1px solid black', borderBottom: '1px solid black' }}>Total Credit Completed</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 8px' }}>Cumulative GPA (Weighted): {transcriptData.cumulativeGPA || '4.33'}</td>
              <td style={{ padding: '4px 8px', borderLeft: '1px solid black' }}>{transcriptData.totalCredits || '20'} {transcriptData.institutionName || 'Legend College Preparatory'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Enrollment Summary - Clean format */}
      <div style={{ marginBottom: '15px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', border: '2px solid black' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', borderBottom: '1px solid black' }} colSpan="3">Enrollment Summary</td>
              <td style={{ padding: '4px 8px', backgroundColor: '#e8e8e8', fontWeight: 'bold', borderLeft: '1px solid black', borderBottom: '1px solid black' }}>Total Credit Transferred</td>
            </tr>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid black' }}>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', borderRight: '1px solid black' }}>Start/End Date</td>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', borderRight: '1px solid black' }}>Grade</td>
              <td style={{ padding: '3px 8px', fontWeight: 'bold', borderRight: '1px solid black' }}>School</td>
              <td style={{ padding: '3px 8px' }}></td>
            </tr>
            {transcriptData.enrollmentSummary.slice(0, 7).map((enrollment, index) => (
              <tr key={index} style={{ borderBottom: index < 6 ? '1px solid black' : 'none' }}>
                <td style={{ padding: '3px 8px', borderRight: '1px solid black' }}>{enrollment.startEndDate || (index === 0 ? '2016-2017' : index === 1 ? '2016-2017' : index === 2 ? '2017-2018' : index === 3 ? '2017-2018' : index === 4 ? '2017-2018' : index === 5 ? '2016-2017' : '2016-2017')}</td>
                <td style={{ padding: '3px 8px', borderRight: '1px solid black' }}>{enrollment.grade || (index === 0 ? '9' : index === 1 ? '9' : index === 2 ? '10' : index === 3 ? '10' : index === 4 ? '10' : index === 5 ? '11' : '11')}</td>
                <td style={{ padding: '3px 8px', borderRight: '1px solid black' }}>{enrollment.school || (index === 0 ? 'Leigh High School' : index === 1 ? 'Foothill College' : index === 2 ? 'Leigh High School' : index === 3 ? 'Foothill College' : index === 4 ? 'De Anza College' : index === 5 ? 'Legend College Preparatory' : 'Leigh High School')}</td>
                <td style={{ padding: '3px 8px' }}>{index === 0 ? '150 Leigh High School' : index === 1 ? '30 Foothill College' : index === 2 ? '10 De Anza College' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Credit Summary - Clean format */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ backgroundColor: '#e8e8e8', border: '2px solid black', borderBottom: '1px solid black', padding: '4px 8px', fontWeight: 'bold', fontSize: '10px' }}>
          Credit Summary<br />
          Curriculum Track: College Prep, Honors
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', border: '2px solid black', borderTop: 'none' }}>
          <tbody>
            <tr>
              <td style={{ padding: '6px 8px', width: '25%', borderRight: '1px solid black', borderBottom: '1px solid black' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>History/Social Science</div>
                <div>Earned: {transcriptData.creditSummary[0]?.earned || 25}</div>
                <div>Required: {transcriptData.creditSummary[0]?.required || 30}</div>
              </td>
              <td style={{ padding: '6px 8px', width: '25%', borderRight: '1px solid black', borderBottom: '1px solid black' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>English</div>
                <div>Earned: {transcriptData.creditSummary[1]?.earned || 25}</div>
                <div>Required: {transcriptData.creditSummary[1]?.required || 40}</div>
              </td>
              <td style={{ padding: '6px 8px', width: '25%', borderRight: '1px solid black', borderBottom: '1px solid black' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Mathematics</div>
                <div>Earned: {transcriptData.creditSummary[2]?.earned || 45}</div>
                <div>Required: {transcriptData.creditSummary[2]?.required || 40}</div>
              </td>
              <td style={{ padding: '6px 8px', width: '25%', borderBottom: '1px solid black' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Laboratory Science</div>
                <div>Earned: {transcriptData.creditSummary[3]?.earned || 35}</div>
                <div>Required: {transcriptData.creditSummary[3]?.required || 30}</div>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '6px 8px', borderRight: '1px solid black' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Foreign Language</div>
                <div>Earned: {transcriptData.creditSummary[4]?.earned || 10}</div>
                <div>Required: {transcriptData.creditSummary[4]?.required || 20}</div>
              </td>
              <td style={{ padding: '6px 8px', borderRight: '1px solid black' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Arts</div>
                <div>Earned: {transcriptData.creditSummary[5]?.earned || 10}</div>
                <div>Required: {transcriptData.creditSummary[5]?.required || 20}</div>
              </td>
              <td style={{ padding: '6px 8px', borderRight: '1px solid black' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Elective</div>
                <div>Earned: {transcriptData.creditSummary[6]?.earned || 60}</div>
                <div>Required: {transcriptData.creditSummary[6]?.required || 70}</div>
              </td>
              <td style={{ padding: '6px 8px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>Physical Education</div>
                <div>Earned: {transcriptData.creditSummary[7]?.earned || 20}</div>
                <div>Required: {transcriptData.creditSummary[7]?.required || 10}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Course Records by School - New Format */}
      {Object.keys(schoolGroups).length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          {Object.entries(schoolGroups).map(([school, semesters], schoolIndex) => {
            // Group semesters by academic year for side-by-side display
            const yearGroups = {}
            Object.entries(semesters).forEach(([semesterKey, semesterData]) => {
              const yearKey = `${semesterData.gradeLevel}-${semesterData.schoolYear}`
              if (!yearGroups[yearKey]) {
                yearGroups[yearKey] = {
                  gradeLevel: semesterData.gradeLevel,
                  schoolYear: semesterData.schoolYear,
                  firstSemester: null,
                  secondSemester: null
                }
              }
              
              if (semesterData.semester === '1st') {
                yearGroups[yearKey].firstSemester = semesterData
              } else {
                yearGroups[yearKey].secondSemester = semesterData
              }
            })

            return (
              <div key={schoolIndex} style={{ marginBottom: '20px' }}>
                {/* School Header */}
                <div style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: '10px', textAlign: 'center', backgroundColor: '#f0f0f0', padding: '4px', border: '1px solid black' }}>
                  #{school}
                </div>

                {/* Academic Years */}
                {Object.values(yearGroups).map((yearData, yearIndex) => {
                  const firstSemGPA = yearData.firstSemester ? semesterGPAs[`${yearData.gradeLevel}-${yearData.schoolYear}-1st`] : null
                  const secondSemGPA = yearData.secondSemester ? semesterGPAs[`${yearData.gradeLevel}-${yearData.schoolYear}-2nd`] : null

                  return (
                    <div key={yearIndex} style={{ marginBottom: '15px' }}>
                      {/* Side-by-side semester layout */}
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', border: '2px solid black' }}>
                        <tbody>
                          {/* Semester Headers */}
                          <tr>
                            <td style={{ padding: '4px 8px', fontWeight: 'bold', backgroundColor: '#f0f0f0', borderRight: '2px solid black', borderBottom: '1px solid black', width: '50%' }}>
                              1st Semester - Grade {yearData.gradeLevel} ('{yearData.schoolYear}):
                            </td>
                            <td style={{ padding: '4px 8px', fontWeight: 'bold', backgroundColor: '#f0f0f0', borderBottom: '1px solid black', width: '50%' }}>
                              2nd Semester:
                            </td>
                          </tr>
                          
                          {/* Column Headers */}
                          <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <td style={{ borderRight: '2px solid black', borderBottom: '1px solid black' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tr>
                                  <td style={{ padding: '2px 4px', fontWeight: 'bold', borderRight: '1px solid black', width: '40%' }}>Course Title</td>
                                  <td style={{ padding: '2px 4px', fontWeight: 'bold', borderRight: '1px solid black', width: '15%' }}>H/AP</td>
                                  <td style={{ padding: '2px 4px', fontWeight: 'bold', borderRight: '1px solid black', width: '15%' }}>Grade</td>
                                  <td style={{ padding: '2px 4px', fontWeight: 'bold', width: '30%' }}>Credits</td>
                                </tr>
                              </table>
                            </td>
                            <td style={{ borderBottom: '1px solid black' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <tr>
                                  <td style={{ padding: '2px 4px', fontWeight: 'bold', borderRight: '1px solid black', width: '40%' }}>Course Title</td>
                                  <td style={{ padding: '2px 4px', fontWeight: 'bold', borderRight: '1px solid black', width: '15%' }}>H/AP</td>
                                  <td style={{ padding: '2px 4px', fontWeight: 'bold', borderRight: '1px solid black', width: '15%' }}>Grade</td>
                                  <td style={{ padding: '2px 4px', fontWeight: 'bold', width: '30%' }}>Credits</td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          {/* Course Rows */}
                          <tr>
                            <td style={{ borderRight: '2px solid black', verticalAlign: 'top', padding: '0' }}>
                              {/* First Semester Courses */}
                              {yearData.firstSemester ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                  <tbody>
                                    {yearData.firstSemester.courses.map((course, courseIndex) => (
                                      <tr key={courseIndex} style={{ borderBottom: courseIndex < yearData.firstSemester.courses.length - 1 ? '1px solid #ddd' : 'none' }}>
                                        <td style={{ padding: '2px 4px', borderRight: '1px solid black', width: '40%' }}>{course.courseTitle}</td>
                                        <td style={{ padding: '2px 4px', borderRight: '1px solid black', width: '15%' }}>{course.hap || ''}</td>
                                        <td style={{ padding: '2px 4px', borderRight: '1px solid black', width: '15%' }}>{course.grade}</td>
                                        <td style={{ padding: '2px 4px', width: '30%' }}>{isGradeCountedForGPA(course.grade) ? course.credits : ''}</td>
                                      </tr>
                                    ))}
                                    {/* Semester GPA */}
                                    <tr style={{ borderTop: '1px solid black', backgroundColor: '#f9f9f9' }}>
                                      <td colSpan="4" style={{ padding: '3px 4px', fontWeight: 'bold', fontSize: '8px' }}>
                                        Sem. GPA (Weighted): {firstSemGPA ? firstSemGPA.gpa.toFixed(2) : '0.00'}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              ) : (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No courses</div>
                              )}
                            </td>
                            <td style={{ verticalAlign: 'top', padding: '0' }}>
                              {/* Second Semester Courses */}
                              {yearData.secondSemester ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                  <tbody>
                                    {yearData.secondSemester.courses.map((course, courseIndex) => (
                                      <tr key={courseIndex} style={{ borderBottom: courseIndex < yearData.secondSemester.courses.length - 1 ? '1px solid #ddd' : 'none' }}>
                                        <td style={{ padding: '2px 4px', borderRight: '1px solid black', width: '40%' }}>{course.courseTitle}</td>
                                        <td style={{ padding: '2px 4px', borderRight: '1px solid black', width: '15%' }}>{course.hap || ''}</td>
                                        <td style={{ padding: '2px 4px', borderRight: '1px solid black', width: '15%' }}>{course.grade}</td>
                                        <td style={{ padding: '2px 4px', width: '30%' }}>{isGradeCountedForGPA(course.grade) ? course.credits : ''}</td>
                                      </tr>
                                    ))}
                                    {/* Semester GPA */}
                                    <tr style={{ borderTop: '1px solid black', backgroundColor: '#f9f9f9' }}>
                                      <td colSpan="4" style={{ padding: '3px 4px', fontWeight: 'bold', fontSize: '8px' }}>
                                        Sem. GPA (Weighted): {secondSemGPA ? secondSemGPA.gpa.toFixed(2) : ''}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              ) : (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No courses</div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )
                })}
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