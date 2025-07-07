import React from 'react'
import { useTranscript } from '../context/TranscriptContext'

const StudentInfoForm = () => {
  const { transcriptData, updateTranscriptData, formatSSNInput } = useTranscript()

  const handleChange = (field, value) => {
    updateTranscriptData({ [field]: value })
  }

  const handleSSNChange = (e) => {
    const formattedSSN = formatSSNInput(e.target.value)
    updateTranscriptData({ ssn: formattedSSN })
  }


  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Student Information</h3>
      
      {/* Institution Header */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">Institution Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Name
            </label>
            <input
              type="text"
              value={transcriptData.institutionName}
              onChange={(e) => handleChange('institutionName', e.target.value)}
              className="input-field"
              placeholder="e.g., ABC High School"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Address
            </label>
            <input
              type="text"
              value={transcriptData.institutionAddress}
              onChange={(e) => handleChange('institutionAddress', e.target.value)}
              className="input-field"
              placeholder="e.g., 123 Main Street, City, State 12345"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={transcriptData.institutionPhone}
              onChange={(e) => handleChange('institutionPhone', e.target.value)}
              className="input-field"
              placeholder="e.g., Tel: (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={transcriptData.institutionEmail}
              onChange={(e) => handleChange('institutionEmail', e.target.value)}
              className="input-field"
              placeholder="e.g., registrar@school.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CEEB Code
            </label>
            <input
              type="text"
              value={transcriptData.ceebCode}
              onChange={(e) => handleChange('ceebCode', e.target.value)}
              className="input-field"
              placeholder="e.g., 123456"
            />
          </div>
        </div>
      </div>

      {/* Student Information */}
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
            placeholder="e.g., Last, First Middle"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student Number *
          </label>
          <input
            type="text"
            value={transcriptData.studentNumber}
            onChange={(e) => handleChange('studentNumber', e.target.value)}
            className="input-field"
            placeholder="e.g., 2024001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            value={transcriptData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="input-field"
            placeholder="e.g., 456 Oak Avenue, City, State 12345"
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
            Gender
          </label>
          <select
            value={transcriptData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="input-field"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guardian
          </label>
          <input
            type="text"
            value={transcriptData.guardian}
            onChange={(e) => handleChange('guardian', e.target.value)}
            className="input-field"
            placeholder="e.g., Parent/Guardian Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Social Security Number (SSN)
          </label>
          <input
            type="text"
            value={transcriptData.ssn}
            onChange={handleSSNChange}
            className="input-field"
            placeholder="e.g., 123-45-6789"
            maxLength="11"
          />
          <p className="text-xs text-gray-500 mt-1">
            Only the last 4 digits will be displayed on the transcript for security.
          </p>
        </div>
      </div>

      {/* Principal Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">Principal Information</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Principal Name
            </label>
            <input
              type="text"
              value={transcriptData.principalName}
              onChange={(e) => handleChange('principalName', e.target.value)}
              className="input-field"
              placeholder="e.g., Dr. Jane Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Signed
            </label>
            <input
              type="date"
              value={transcriptData.dateSigned}
              onChange={(e) => handleChange('dateSigned', e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Comments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comments
        </label>
        <textarea
          value={transcriptData.comments}
          onChange={(e) => handleChange('comments', e.target.value)}
          className="input-field"
          rows="4"
          placeholder="Enter any additional comments or notes about the transcript..."
        />
      </div>
    </div>
  )
}

export default StudentInfoForm