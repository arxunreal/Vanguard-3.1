import React, { useState } from 'react'
import { X } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface FeedbackModalProps {
  candidateId: string
  candidateName: string
  moduleId: string
  sessionType: string
  isOutsideClass: boolean
  onClose: () => void
  onSuccess: () => void
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  candidateId,
  candidateName,
  moduleId,
  sessionType,
  isOutsideClass,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    feedbackType: 'good',
    author: '',
    feedbackText: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.author.trim()) newErrors.author = 'Your name is required'
    if (!formData.feedbackText.trim()) newErrors.feedbackText = 'Feedback content is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([{
          candidate_id: candidateId,
          module_id: moduleId,
          session_type: sessionType,
          feedback_text: formData.feedbackText,
          feedback_type: formData.feedbackType,
          author: formData.author
        }])
      
      if (error) throw error
      
      onSuccess()
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setErrors({ submit: 'Failed to submit feedback. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Add New Feedback</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Feedback Type
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, feedbackType: 'good' })}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    formData.feedbackType === 'good'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  Positive
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, feedbackType: 'bad' })}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    formData.feedbackType === 'bad'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Needs Improvement
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, feedbackType: 'observational' })}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    formData.feedbackType === 'observational'
                      ? 'bg-yellow-600 text-white shadow-lg'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  Observational
                </button>
              </div>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-100 ${
                  errors.author 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-red-500'
                }`}
                placeholder="Enter your name"
              />
              {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
            </div>

            {/* Feedback Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Feedback Content
              </label>
              <textarea
                value={formData.feedbackText}
                onChange={(e) => setFormData({ ...formData, feedbackText: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-100 resize-none ${
                  errors.feedbackText 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-red-500'
                }`}
                placeholder="Enter your feedback..."
              />
              {errors.feedbackText && <p className="text-red-500 text-sm mt-1">{errors.feedbackText}</p>}
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                  isOutsideClass
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Adding...' : 'Add Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}