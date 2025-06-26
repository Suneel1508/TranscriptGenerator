import React, { useState } from 'react'
import StudentInfoForm from '../components/StudentInfoForm'
import CoursesForm from '../components/CoursesForm'
import FilesUpload from '../components/FilesUpload'
import TranscriptPreview from '../components/TranscriptPreview'
import { useTranscript } from '../context/TranscriptContext'
import { Save, Download, Eye, EyeOff, Plus } from 'lucide-react'
import { generatePDF } from '../utils/pdfGenerator'
import { useNavigate } from 'react-router-dom'

const TranscriptForm = () => {
  const { transcriptData, saveTranscript, createNewTranscript, currentTranscriptId, isLoading } = useTranscript()
  const [activeTab, setActiveTab] = useState('student')
  const [showPreview, setShowPreview] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [saveError, setSaveError] = useState('')
  const navigate = useNavigate()

  const tabs = [
    { id: 'student', label: 'Student Info', component: StudentInfoForm },
    { id: 'courses', label: 'Courses & Grades', component: CoursesForm },
    { id: 'files', label: 'Files & Assets', component: FilesUpload }
  ]

  const handleSave = async () => {
    setSaveError('')
    const name = prompt('Enter a name for this transcript:')
    if (name) {
      const result = await saveTranscript(name)
      if (result.success) {
        alert('Transcript saved successfully!')
      } else {
        setSaveError(result.error || 'Failed to save transcript')
      }
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

  const handleNewTranscript = () => {
    if (confirm('Are you sure you want to create a new transcript? Any unsaved changes will be lost.')) {
      createNewTranscript()
    }
  }

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {currentTranscriptId ? 'Edit Transcript' : 'Create Transcript'}
            </h1>
            <p className="text-gray-600">
              Fill out the form below to generate a professional academic transcript.
            </p>
          </div>
          {currentTranscriptId && (
            <button
              onClick={handleNewTranscript}
              className="btn-secondary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Transcript</span>
            </button>
          )}
        </div>
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
          disabled={isLoading}
          className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span>{isLoading ? 'Saving...' : currentTranscriptId ? 'Update' : 'Save'} Progress</span>
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

      {/* Error Message */}
      {saveError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
          <p className="text-sm text-red-600">{saveError}</p>
        </div>
      )}

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