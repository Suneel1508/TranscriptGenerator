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
              placeholder="e.g., LEGEND COLLEGE PREPARATORY"
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
              placeholder="e.g., 21050 McClellan Road, Cupertino CA 95014"
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
              placeholder="e.g., Tel: (408)865-0366"
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
              placeholder="e.g., transcript@legendcp.com"
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
              placeholder="e.g., 054732"
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
            placeholder="e.g., Kondor, Anirud"
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
            placeholder="e.g., 11807"
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
            placeholder="e.g., 4848 Tilden Dr., San Jose, CA 95124"
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
            placeholder="e.g., Padmam Kondor, Sangeetha Kondor"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SSN
          </label>
          <input
            type="text"
            value={transcriptData.ssn}
            onChange={(e) => handleChange('ssn', e.target.value)}
            className="input-field"
            placeholder="e.g., ********"
          />
        </div>
      </div>

      {/* GPA Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">GPA Summary</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cumulative GPA (Weighted)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="5"
              value={transcriptData.cumulativeGPA}
              onChange={(e) => handleChange('cumulativeGPA', e.target.value)}
              className="input-field"
              placeholder="e.g., 4.33"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Credit Completed
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={transcriptData.totalCredits}
              onChange={(e) => handleChange('totalCredits', e.target.value)}
              className="input-field"
              placeholder="e.g., 20 Legend College Preparatory"
            />
          </div>
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
              placeholder="Principal's Name"
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
          placeholder="UNOFFICIAL TRANSCRIPT&#10;S- College Level&#10;IP- In Progress&#10;P- Pass&#10;F- Fail"
        />
      </div>
    </div>
  )
}

export default StudentInfoForm