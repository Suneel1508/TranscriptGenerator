import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Upload, Eye, Download, Shield, Clock } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: 'Easy Form Input',
      description: 'Fill out student information, courses, and grades through an intuitive form interface.'
    },
    {
      icon: Eye,
      title: 'Live Preview',
      description: 'See your transcript update in real-time as you enter information.'
    },
    {
      icon: Download,
      title: 'PDF Generation',
      description: 'Generate professional PDF transcripts with embedded photos and signatures.'
    },
    {
      icon: Shield,
      title: 'Professional Format',
      description: 'Official-looking transcripts that maintain academic standards and formatting.'
    },
    {
      icon: Clock,
      title: 'Save & Resume',
      description: 'Save your progress and return to edit transcripts later.'
    },
    {
      icon: FileText,
      title: 'Multiple Templates',
      description: 'Choose from various transcript templates to match your institution.'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Professional Transcript
          <span className="text-primary-600"> Generator</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Create official-looking academic transcripts with ease. Fill out forms, preview in real-time, 
          and generate professional PDF documents with photos and digital signatures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/create" className="btn-primary text-lg px-8 py-3">
            Create Transcript
          </Link>
          <Link to="/admin" className="btn-secondary text-lg px-8 py-3">
            Admin Panel
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
            <feature.icon className="h-12 w-12 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="card p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fill Information</h3>
            <p className="text-gray-600 text-sm">Enter student details, courses, and academic records</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Upload Assets</h3>
            <p className="text-gray-600 text-sm">Add student photo, digital stamp, and signature</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Preview</h3>
            <p className="text-gray-600 text-sm">Review the transcript in real-time preview</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Generate PDF</h3>
            <p className="text-gray-600 text-sm">Download professional PDF transcript</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-primary-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Create Your Transcript?
        </h2>
        <p className="text-gray-600 mb-6">
          Start building professional academic transcripts in minutes.
        </p>
        <Link to="/create" className="btn-primary text-lg px-8 py-3">
          Get Started Now
        </Link>
      </div>
    </div>
  )
}

export default Home