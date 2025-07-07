import React from 'react'

const TranscriptPreview = ({ transcript }) => {
  if (!transcript) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No transcript selected</p>
      </div>
    )
  }

  const getDisplayedCreditSummary = (data) => {
    if (!data || !data.courses) return { total: 0, gpa: 0 }
    
    let totalCredits = 0
    let totalGradePoints = 0
    
    data.courses.forEach(course => {
      if (course.credits && course.gradePoints) {
        totalCredits += parseFloat(course.credits) || 0
        totalGradePoints += parseFloat(course.gradePoints) || 0
      }
    })
    
    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00'
    
    return {
      total: totalCredits,
      gpa: parseFloat(gpa)
    }
  }

  const creditSummary = getDisplayedCreditSummary(transcript.data)

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          {transcript.name || 'Official Transcript'}
        </h1>
        <div className="text-center text-gray-600">
          <p className="font-semibold">Student Information</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Student Name:</label>
            <p className="text-lg">{transcript.student_name || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID:</label>
            <p className="text-lg">{transcript.student_ssn || 'N/A'}</p>
          </div>
        </div>
      </div>

      {transcript.data?.courses && transcript.data.courses.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Course History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Credits</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Grade</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Grade Points</th>
                </tr>
              </thead>
              <tbody>
                {transcript.data.courses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{course.code || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{course.title || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{course.credits || '0'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{course.grade || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{course.gradePoints || '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="border-t-2 border-gray-300 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Credits:</label>
            <p className="text-lg font-semibold">{creditSummary.total}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cumulative GPA:</label>
            <p className="text-lg font-semibold">{creditSummary.gpa}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Created: {new Date(transcript.created_at).toLocaleDateString()}</p>
        {transcript.updated_at && (
          <p>Last Updated: {new Date(transcript.updated_at).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  )
}

export default TranscriptPreview