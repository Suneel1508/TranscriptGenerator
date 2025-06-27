import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranscript } from '../context/TranscriptContext'
import { Upload, X, Image, FileText, PenTool } from 'lucide-react'

const FilesUpload = () => {
  const { transcriptData, updateTranscriptData } = useTranscript()

  // Prevent default drag behaviors on the entire document
  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDrop = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    // Add event listeners to prevent default drag/drop behavior
    document.addEventListener('dragenter', preventDefaults, false)
    document.addEventListener('dragleave', preventDefaults, false)
    document.addEventListener('dragover', preventDefaults, false)
    document.addEventListener('drop', handleDrop, false)

    return () => {
      document.removeEventListener('dragenter', preventDefaults, false)
      document.removeEventListener('dragleave', preventDefaults, false)
      document.removeEventListener('dragover', preventDefaults, false)
      document.removeEventListener('drop', handleDrop, false)
    }
  }, [])

  const createFileUploader = (fileType, maxSize = 5 * 1024 * 1024) => {
    return useCallback((acceptedFiles, rejectedFiles) => {
      console.log('Files dropped:', acceptedFiles, rejectedFiles)
      
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0]
        if (rejection.errors.some(error => error.code === 'file-too-large')) {
          alert(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
        } else if (rejection.errors.some(error => error.code === 'file-invalid-type')) {
          alert('Please upload only image files (JPEG, PNG, GIF)')
        }
        return
      }

      const file = acceptedFiles[0]
      if (file) {
        console.log('Processing file:', file.name, file.type, file.size)
        
        const reader = new FileReader()
        reader.onload = () => {
          console.log('File read successfully for:', fileType)
          updateTranscriptData({
            [fileType]: {
              file,
              preview: reader.result,
              name: file.name,
              size: file.size
            }
          })
        }
        reader.onerror = () => {
          console.error('Error reading file')
          alert('Error reading file. Please try again.')
        }
        reader.readAsDataURL(file)
      }
    }, [fileType, maxSize])
  }

  const photoDropzone = useDropzone({
    onDrop: createFileUploader('photo', 2 * 1024 * 1024),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false,
    noClick: false,
    noKeyboard: false,
    preventDropOnDocument: true,
    maxSize: 2 * 1024 * 1024
  })

  const stampDropzone = useDropzone({
    onDrop: createFileUploader('digitalStamp'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false,
    noClick: false,
    noKeyboard: false,
    preventDropOnDocument: true,
    maxSize: 5 * 1024 * 1024
  })

  const signatureDropzone = useDropzone({
    onDrop: createFileUploader('signature'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false,
    noClick: false,
    noKeyboard: false,
    preventDropOnDocument: true,
    maxSize: 5 * 1024 * 1024
  })

  const removeFile = (fileType) => {
    updateTranscriptData({ [fileType]: null })
  }

  const FileUploadArea = ({ dropzone, title, description, icon: Icon, fileData, fileType }) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-gray-600" />
        <h4 className="text-md font-medium text-gray-900">{title}</h4>
      </div>
      
      {fileData ? (
        <div className="relative">
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {fileData.preview && (
                  <img
                    src={fileData.preview}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded border"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{fileData.name}</p>
                  <p className="text-xs text-gray-500">
                    {(fileData.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(fileType)}
                className="text-red-600 hover:text-red-800"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          {...dropzone.getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dropzone.isDragActive
              ? 'border-primary-400 bg-primary-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          style={{ minHeight: '120px' }}
          onDragEnter={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrop={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <input {...dropzone.getInputProps()} />
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-1">
            {dropzone.isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
          </p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-gray-900">Files & Assets</h3>
      
      <div className="grid md:grid-cols-1 gap-8">
        <FileUploadArea
          dropzone={photoDropzone}
          title="Student Photo"
          description="Upload a passport-style photo (JPEG, PNG, max 2MB)"
          icon={Image}
          fileData={transcriptData.photo}
          fileType="photo"
        />
        
        <FileUploadArea
          dropzone={stampDropzone}
          title="Digital Stamp"
          description="Upload institutional stamp or seal (JPEG, PNG, max 5MB)"
          icon={FileText}
          fileData={transcriptData.digitalStamp}
          fileType="digitalStamp"
        />
        
        <FileUploadArea
          dropzone={signatureDropzone}
          title="Digital Signature"
          description="Upload authorized signature (JPEG, PNG, max 5MB)"
          icon={PenTool}
          fileData={transcriptData.signature}
          fileType="signature"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">File Requirements</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Student photo should be passport-style (2x2 cm recommended)</li>
          <li>• Digital stamp should be the official institutional seal</li>
          <li>• Signature should be from an authorized academic official</li>
          <li>• All images should have transparent backgrounds when possible</li>
          <li>• Supported formats: JPEG, PNG, GIF</li>
        </ul>
      </div>
    </div>
  )
}

export default FilesUpload