import React from 'react'
import { useTranscript } from '../context/TranscriptContext'

const StudentInfoForm = () => {
  const { transcriptData, updateTranscriptData } = useTranscript()

  const handleChange = (field, value) => {
    updateTranscriptData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Student Information</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Name *
          </label>
          <input
            type="text"
            value={transcriptData.studentName}
            onChange={(e) => handleChange('studentName', e.target.value)}
            className="input-field"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student ID *
          </label>
          <input
            type="text"
            value={transcriptData.studentId}
            onChange={(e) => handleChange('studentId', e.target.value)}
            className="input-field"
            placeholder="Enter student ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={transcriptData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program *
          </label>
          <input
            type="text"
            value={transcriptData.program}
            onChange={(e) => handleChange('program', e.target.value)}
            className="input-field"
            placeholder="e.g., Bachelor of Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Major *
          </label>
          <input
            type="text"
            value={transcriptData.major}
            onChange={(e) => handleChange('major', e.target.value)}
            className="input-field"
            placeholder="e.g., Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minor
          </label>
          <input
            type="text"
            value={transcriptData.minor}
            onChange={(e) => handleChange('minor', e.target.value)}
            className="input-field"
            placeholder="e.g., Mathematics"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Date
          </label>
          <input
            type="date"
            value={transcriptData.graduationDate}
            onChange={(e) => handleChange('graduationDate', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cumulative GPA
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={transcriptData.cumulativeGPA}
            onChange={(e) => handleChange('cumulativeGPA', e.target.value)}
            className="input-field"
            placeholder="e.g., 3.75"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Institution Information</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Name
          </label>
          <input
            type="text"
            value={transcriptData.institutionName}
            onChange={(e) => handleChange('institutionName', e.target.value)}
            className="input-field"
            placeholder="University name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Address
          </label>
          <textarea
            value={transcriptData.institutionAddress}
            onChange={(e) => handleChange('institutionAddress', e.target.value)}
            className="input-field"
            rows="3"
            placeholder="Full address of the institution"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Honors & Awards
        </label>
        <textarea
          value={transcriptData.honors}
          onChange={(e) => handleChange('honors', e.target.value)}
          className="input-field"
          rows="3"
          placeholder="List any honors, awards, or special recognitions"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={transcriptData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="input-field"
          rows="3"
          placeholder="Any additional information or notes"
        />
      </div>
    </div>
  )
}

export default StudentInfoForm