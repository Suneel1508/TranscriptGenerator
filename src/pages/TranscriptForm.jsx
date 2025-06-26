import React, { useState } from 'react'
import StudentInfoForm from '../components/StudentInfoForm'
import CoursesForm from '../components/CoursesForm'
import FilesUpload from '../components/FilesUpload'
import TranscriptPreview from '../components/TranscriptPreview'
import { useTranscript } from '../context/TranscriptContext'
import { Save, Download, Eye, EyeOff } from 'lucide-react'
import { generatePDF } from '../utils/pdfGenerator'
import { useNavigate } from 'react-router-dom'

const TranscriptForm = () => {
  const { transcriptData, saveTranscript } = useTranscript()
  const [activeTab, setActiveTab] = useState('student')
  const [showPreview, setShowPreview] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const navigate = useNavigate()

  const tabs = [
    { id: 'student', label: 'Student Info', component: StudentInfoForm },
    { id: 'courses', label: 'Courses & Grades', component: CoursesForm },
    { id: 'files', label: 'Files & Assets', component: FilesUpload }
  ]

  const handleSave = () => {
    const name = prompt('Enter a name for this transcript:')
    if (name) {
      saveTranscript(name)
      alert('Transcript saved successfully!')
    }
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      await generatePDF(transcriptData)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Transcript</h1>
        <p className="text-gray-600">
          Fill out the form below to generate a professional academic transcript.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="btn-secondary flex items-center space-x-2"
        >
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
        </button>
        <button
          onClick={handleSave}
          className="btn-secondary flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Progress</span>
        </button>
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>{isGenerating ? 'Generating...' : 'Generate PDF'}</span>
        </button>
        <button
          onClick={() => navigate('/past-transcripts')}
          className="btn-secondary flex items-center space-x-2"
        >
          <span>View Past Transcripts</span>
        </button>
      </div>

      <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
        {/* Form Section */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Active Form Component */}
          <div className="card p-6">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Preview</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <TranscriptPreview />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TranscriptForm