import React, { useState } from 'react'
import { useTranscript } from '../context/TranscriptContext'
import { Plus, Trash2, Edit2 } from 'lucide-react'

const CoursesForm = () => {
  const { transcriptData, addCourse, updateCourse, deleteCourse } = useTranscript()
  const [isAdding, setIsAdding] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [courseForm, setCourseForm] = useState({
    courseCode: '',
    courseName: '',
    credits: '',
    grade: '',
    semester: '',
    year: ''
  })

  const resetForm = () => {
    setCourseForm({
      courseCode: '',
      courseName: '',
      credits: '',
      grade: '',
      semester: '',
      year: ''
    })
    setIsAdding(false)
    setEditingCourse(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingCourse) {
      updateCourse(editingCourse.id, courseForm)
    } else {
      addCourse(courseForm)
    }
    resetForm()
  }

  const handleEdit = (course) => {
    setCourseForm(course)
    setEditingCourse(course)
    setIsAdding(true)
  }

  const calculateTotalCredits = () => {
    return transcriptData.courses.reduce((total, course) => {
      return total + (parseFloat(course.credits) || 0)
    }, 0)
  }

  const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'P', 'NP', 'W', 'I']
  const semesterOptions = ['Fall', 'Spring', 'Summer', 'Winter']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Courses & Grades</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* Add/Edit Course Form */}
      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code *
                </label>
                <input
                  type="text"
                  value={courseForm.courseCode}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, courseCode: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., CS101"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={courseForm.courseName}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, courseName: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., Introduction to Computer Science"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credits *
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={courseForm.credits}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, credits: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., 3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade *
                </label>
                <select
                  value={courseForm.grade}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, grade: e.target.value }))}
                  className="input-field"
                  required
                >
                  <option value="">Select Grade</option>
                  {gradeOptions.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semester *
                </label>
                <select
                  value={courseForm.semester}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, semester: e.target.value }))}
                  className="input-field"
                  required
                >
                  <option value="">Select Semester</option>
                  {semesterOptions.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={courseForm.year}
                  onChange={(e) => setCourseForm(prev => ({ ...prev, year: e.target.value }))}
                  className="input-field"
                  placeholder="e.g., 2023"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                {editingCourse ? 'Update Course' : 'Add Course'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      {transcriptData.courses.length > 0 ? (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Term
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transcriptData.courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {course.courseCode}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {course.courseName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.credits}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        ['A+', 'A', 'A-'].includes(course.grade) ? 'bg-green-100 text-green-800' :
                        ['B+', 'B', 'B-'].includes(course.grade) ? 'bg-blue-100 text-blue-800' :
                        ['C+', 'C', 'C-'].includes(course.grade) ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.grade}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.semester} {course.year}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Credits:</span>
              <span className="text-lg font-bold text-gray-900">{calculateTotalCredits()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-400 mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses added yet</h3>
          <p className="text-gray-600 mb-4">Add courses to build the academic record.</p>
          <button
            onClick={() => setIsAdding(true)}
            className="btn-primary"
          >
            Add First Course
          </button>
        </div>
      )}
    </div>
  )
}

export default CoursesForm