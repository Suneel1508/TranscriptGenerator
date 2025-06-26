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

  const handleEnrollmentChange = (index, field, value) => {
    const newEnrollment = [...transcriptData.enrollmentSummary]
    newEnrollment[index] = { ...newEnrollment[index], [field]: value }
    updateTranscriptData({ enrollmentSummary: newEnrollment })
  }

  const handleCreditSummaryChange = (index, field, value) => {
    const newCreditSummary = [...transcriptData.creditSummary]
    newCreditSummary[index] = { ...newCreditSummary[index], [field]: value }
    updateTranscriptData({ creditSummary: newCreditSummary })
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
            placeholder="e.g., Smith, John"
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
            placeholder="e.g., 12345"
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
            placeholder="e.g., 1234 Main Street, San Jose, CA 95124"
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
            placeholder="e.g., Robert Smith, Jennifer Smith"
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
              placeholder="e.g., 4.25"
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
              placeholder="e.g., 20"
            />
          </div>
        </div>
      </div>

      {/* Enrollment Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">Enrollment Summary</h4>
        {transcriptData.enrollmentSummary.map((enrollment, index) => (
          <div key={index} className="grid md:grid-cols-3 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start/End Date
              </label>
              <input
                type="text"
                value={enrollment.startEndDate}
                onChange={(e) => handleEnrollmentChange(index, 'startEndDate', e.target.value)}
                className="input-field"
                placeholder="e.g., 2016-2017"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade
              </label>
              <input
                type="text"
                value={enrollment.grade}
                onChange={(e) => handleEnrollmentChange(index, 'grade', e.target.value)}
                className="input-field"
                placeholder="e.g., 9"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School
              </label>
              <input
                type="text"
                value={enrollment.school}
                onChange={(e) => handleEnrollmentChange(index, 'school', e.target.value)}
                className="input-field"
                placeholder="e.g., Leigh High School"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Credit Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-md font-medium text-gray-900 mb-4">Credit Summary</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {transcriptData.creditSummary.map((credit, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={credit.subject}
                  onChange={(e) => handleCreditSummaryChange(index, 'subject', e.target.value)}
                  className="input-field text-xs"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Earned
                </label>
                <input
                  type="number"
                  value={credit.earned}
                  onChange={(e) => handleCreditSummaryChange(index, 'earned', parseInt(e.target.value))}
                  className="input-field text-xs"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Required
                </label>
                <input
                  type="number"
                  value={credit.required}
                  onChange={(e) => handleCreditSummaryChange(index, 'required', parseInt(e.target.value))}
                  className="input-field text-xs"
                  placeholder="0"
                />
              </div>
            </div>
          ))}
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