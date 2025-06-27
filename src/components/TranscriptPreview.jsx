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
    <div className="transcript-preview bg-white p-6 min-h-[800px]" id="transcript-preview" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', lineHeight: '1.2', color: 'black' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '15px', backgroundColor: '#e8e8e8', padding: '8px', border: '1px solid black' }}>
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

      {/* Student Information Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', fontSize: '10px' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '4px', width: '15%', fontWeight: 'bold' }}>Student Name:</td>
            <td style={{ border: '1px solid black', padding: '4px', width: '35%' }}>{transcriptData.studentName || 'Kondor, Anirud'}</td>
            <td style={{ border: '1px solid black', padding: '4px', width: '15%', fontWeight: 'bold' }}>Student Number:</td>
            <td style={{ border: '1px solid black', padding: '4px', width: '35%' }}>{transcriptData.studentNumber || '11807'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold' }}>Address:</td>
            <td style={{ border: '1px solid black', padding: '4px' }}>{transcriptData.address || '4848 Tilden Dr., San Jose, CA 95124'}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold' }}></td>
            <td style={{ border: '1px solid black', padding: '4px' }}></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold' }}>Date of Birth:</td>
            <td style={{ border: '1px solid black', padding: '4px' }}>{formatDate(transcriptData.dateOfBirth) || 'April 25, 2002'}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold' }}>Gender:</td>
            <td style={{ border: '1px solid black', padding: '4px' }}>{transcriptData.gender || 'Male'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold' }}>Guardian:</td>
            <td style={{ border: '1px solid black', padding: '4px' }}>{transcriptData.guardian || 'Padman Kondor, Sangeetha Kondor'}</td>
            <td style={{ border: '1px solid black', padding: '4px', fontWeight: 'bold' }}>SSN:</td>
            <td style={{ border: '1px solid black', padding: '4px' }}>{formatSSNForDisplay(transcriptData.ssn)}</td>
          </tr>
        </tbody>
      </table>

      {/* GPA and Credit Summary */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', fontSize: '10px' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '4px', width: '50%', backgroundColor: '#e8e8e8', fontWeight: 'bold' }}>GPA Summary</td>
            <td style={{ border: '1px solid black', padding: '4px', width: '50%', backgroundColor: '#e8e8e8', fontWeight: 'bold' }}>Total Credit Completed</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '4px' }}>Cumulative GPA (Weighted): {transcriptData.cumulativeGPA || '4.33'}</td>
            <td style={{ border: '1px solid black', padding: '4px' }}>{transcriptData.totalCredits || '20'} {transcriptData.institutionName || 'Legend College Preparatory'}</td>
          </tr>
        </tbody>
      </table>

      {/* Enrollment Summary */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', fontSize: '10px' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid black', padding: '4px', backgroundColor: '#e8e8e8', fontWeight: 'bold' }} colSpan="3">Enrollment Summary</td>
            <td style={{ border: '1px solid black', padding: '4px', backgroundColor: '#e8e8e8', fontWeight: 'bold' }}>Total Credit Transferred</td>
          </tr>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <td style={{ border: '1px solid black', padding: '3px', fontWeight: 'bold' }}>Start/End Date</td>
            <td style={{ border: '1px solid black', padding: '3px', fontWeight: 'bold' }}>Grade</td>
            <td style={{ border: '1px solid black', padding: '3px', fontWeight: 'bold' }}>School</td>
            <td style={{ border: '1px solid black', padding: '3px' }}></td>
          </tr>
          {transcriptData.enrollmentSummary.slice(0, 3).map((enrollment, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '3px' }}>{enrollment.startEndDate || (index === 0 ? '2016-2017' : index === 1 ? '2016-2017' : '2017-2018')}</td>
              <td style={{ border: '1px solid black', padding: '3px' }}>{enrollment.grade || (index === 0 ? '9' : index === 1 ? '9' : '10')}</td>
              <td style={{ border: '1px solid black', padding: '3px' }}>{enrollment.school || (index === 0 ? 'Leigh High School' : index === 1 ? 'Foothill College' : 'Leigh High School')}</td>
              <td style={{ border: '1px solid black', padding: '3px' }}>{index === 0 ? '150' : index === 1 ? '30' : '10'} {index === 0 ? 'Leigh High School' : index === 1 ? 'Foothill College' : 'De Anza College'}</td>
            </tr>
          ))}
          <tr>
            <td style={{ border: '1px solid black', padding: '3px' }}>2017-2018</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>10</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>Foothill College</td>
            <td style={{ border: '1px solid black', padding: '3px' }}></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px' }}>2017-2018</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>10</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>De Anza College</td>
            <td style={{ border: '1px solid black', padding: '3px' }}></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px' }}>2016-2017</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>11</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>Legend College Preparatory</td>
            <td style={{ border: '1px solid black', padding: '3px' }}></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid black', padding: '3px' }}>2016-2017</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>11</td>
            <td style={{ border: '1px solid black', padding: '3px' }}>Leigh High School</td>
            <td style={{ border: '1px solid black', padding: '3px' }}></td>
          </tr>
        </tbody>
      </table>

      {/* Credit Summary */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ backgroundColor: '#e8e8e8', border: '1px solid black', padding: '4px', fontWeight: 'bold', fontSize: '10px' }}>
          Credit Summary<br />
          Curriculum Track: College Prep, Honors
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '3px', width: '25%' }}>
                <div style={{ fontWeight: 'bold' }}>History/Social Science</div>
                <div>Earned: {transcriptData.creditSummary[0]?.earned || 25}</div>
                <div>Required: {transcriptData.creditSummary[0]?.required || 30}</div>
              </td>
              <td style={{ border: '1px solid black', padding: '3px', width: '25%' }}>
                <div style={{ fontWeight: 'bold' }}>English</div>
                <div>Earned: {transcriptData.creditSummary[1]?.earned || 25}</div>
                <div>Required: {transcriptData.creditSummary[1]?.required || 40}</div>
              </td>
              <td style={{ border: '1px solid black', padding: '3px', width: '25%' }}>
                <div style={{ fontWeight: 'bold' }}>Mathematics</div>
                <div>Earned: {transcriptData.creditSummary[2]?.earned || 45}</div>
                <div>Required: {transcriptData.creditSummary[2]?.required || 40}</div>
              </td>
              <td style={{ border: '1px solid black', padding: '3px', width: '25%' }}>
                <div style={{ fontWeight: 'bold' }}>Laboratory Science</div>
                <div>Earned: {transcriptData.creditSummary[3]?.earned || 35}</div>
                <div>Required: {transcriptData.creditSummary[3]?.required || 30}</div>
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '3px' }}>
                <div style={{ fontWeight: 'bold' }}>Foreign Language</div>
                <div>Earned: {transcriptData.creditSummary[4]?.earned || 10}</div>
                <div>Required: {transcriptData.creditSummary[4]?.required || 20}</div>
              </td>
              <td style={{ border: '1px solid black', padding: '3px' }}>
                <div style={{ fontWeight: 'bold' }}>Arts</div>
                <div>Earned: {transcriptData.creditSummary[5]?.earned || 10}</div>
                <div>Required: {transcriptData.creditSummary[5]?.required || 20}</div>
              </td>
              <td style={{ border: '1px solid black', padding: '3px' }}>
                <div style={{ fontWeight: 'bold' }}>Elective</div>
                <div>Earned: {transcriptData.creditSummary[6]?.earned || 60}</div>
                <div>Required: {transcriptData.creditSummary[6]?.required || 70}</div>
              </td>
              <td style={{ border: '1px solid black', padding: '3px' }}>
                <div style={{ fontWeight: 'bold' }}>Physical Education</div>
                <div>Earned: {transcriptData.creditSummary[7]?.earned || 20}</div>
                <div>Required: {transcriptData.creditSummary[7]?.required || 10}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Course Records - if any courses are added */}
      {transcriptData.courses.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          {groupedCourses.map((semesterGroup, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '10px' }}>
                {semesterGroup.semester} Semester - Grade {semesterGroup.gradeLevel} ({semesterGroup.schoolYear}):
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f0f0' }}>
                    <th style={{ border: '1px solid black', padding: '2px', width: '30%' }}>Course Title</th>
                    <th style={{ border: '1px solid black', padding: '2px', width: '8%' }}>H/AP</th>
                    <th style={{ border: '1px solid black', padding: '2px', width: '8%' }}>Grade</th>
                    <th style={{ border: '1px solid black', padding: '2px', width: '8%' }}>Credits</th>
                    <th style={{ border: '1px solid black', padding: '2px', width: '23%' }}>School</th>
                  </tr>
                </thead>
                <tbody>
                  {semesterGroup.courses.map((course, courseIndex) => (
                    <tr key={courseIndex}>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{course.courseTitle}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{course.hap}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{course.grade}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{course.credits}</td>
                      <td style={{ border: '1px solid black', padding: '2px' }}>{course.school}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Comments and Signature Section */}
      <div style={{ marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', width: '60%', verticalAlign: 'top' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '10px' }}>Comments</div>
                <div style={{ fontSize: '9px', minHeight: '80px' }}>
                  {transcriptData.comments || 'UNOFFICIAL TRANSCRIPT\nCL-College Level\nIP- In Progress\nP- Pass\nF- Fail'}
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
              
              <td style={{ border: '1px solid black', padding: '8px', width: '40%', verticalAlign: 'top', textAlign: 'center' }}>
                {/* Principal Signature - Enlarged */}
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