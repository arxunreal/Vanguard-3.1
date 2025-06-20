import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, User, MessageSquare, Plus } from 'lucide-react'
import { candidates } from '../data/candidates'
import { modules } from '../data/modules'
import { supabase } from '../lib/supabase'
import { FeedbackModal } from './FeedbackModal'

interface Feedback {
  id: string
  candidate_id: string
  module_id: string
  session_type: string
  feedback_text: string
  feedback_type: string
  author: string
  created_at: string
}

export const FeedbackOverview: React.FC = () => {
  const { candidateId, moduleId, sessionType } = useParams<{ 
    candidateId: string
    moduleId: string
    sessionType: string
  }>()
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  
  const candidate = candidates.find(c => c.id === candidateId)
  const module = modules.find(m => m.id === moduleId)
  const isOutsideClass = moduleId === 'outside-class'

  useEffect(() => {
    fetchFeedbacks()
  }, [candidateId, moduleId, sessionType])

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('candidate_id', candidateId)
        .eq('module_id', moduleId || 'outside-class')
        .eq('session_type', sessionType || 'social')
        .order('created_at', { ascending: false })

      if (error) throw error
      setFeedbacks(data || [])
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFeedbackStats = () => {
    const total = feedbacks.length
    const positive = feedbacks.filter(f => f.feedback_type === 'good').length
    const needsImprovement = feedbacks.filter(f => f.feedback_type === 'bad').length
    const observational = feedbacks.filter(f => f.feedback_type === 'observational').length

    return { total, positive, needsImprovement, observational }
  }

  const stats = getFeedbackStats()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFeedbackTypeColor = (type: string) => {
    switch (type) {
      case 'good': return 'bg-green-100 text-green-800'
      case 'bad': return 'bg-red-100 text-red-800'
      case 'observational': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getFeedbackTypeName = (type: string) => {
    switch (type) {
      case 'good': return 'Positive'
      case 'bad': return 'Needs Improvement'
      case 'observational': return 'Observational'
      default: return type
    }
  }

  if (!candidate) {
    return <div>Candidate not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={`/candidate/${candidateId}/class-type`} 
              className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Class Types</span>
            </Link>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-red-600" />
              <div className="text-right">
                <div className="font-semibold text-red-600">{candidate.name}</div>
                <div className="text-sm text-gray-600">
                  {isOutsideClass ? 'Outside Class Feedback' : `${module?.name} - ${sessionType}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Feedback Overview Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <MessageSquare className={`w-6 h-6 ${isOutsideClass ? 'text-green-600' : 'text-red-600'}`} />
              <h2 className="text-2xl font-bold text-gray-900">Feedback Overview</h2>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg ${
                isOutsideClass 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <Plus className="w-5 h-5" />
              Add New Feedback
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
              <div className="text-sm text-blue-700 font-medium">Total Feedback</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{stats.positive}</div>
              <div className="text-sm text-green-700 font-medium">Positive</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">{stats.needsImprovement}</div>
              <div className="text-sm text-red-700 font-medium">Needs Improvement</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.observational}</div>
              <div className="text-sm text-yellow-700 font-medium">Observational</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Positive: {stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}%</span>
              <span>Needs Improvement: {stats.total > 0 ? Math.round((stats.needsImprovement / stats.total) * 100) : 0}%</span>
              <span>Observational: {stats.total > 0 ? Math.round((stats.observational / stats.total) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full flex">
                <div 
                  className="bg-green-500 transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.positive / stats.total) * 100 : 0}%` }}
                />
                <div 
                  className="bg-red-500 transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.needsImprovement / stats.total) * 100 : 0}%` }}
                />
                <div 
                  className="bg-yellow-500 transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.observational / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">All Feedback ({feedbacks.length})</h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className={`w-12 h-12 mx-auto mb-4 ${isOutsideClass ? 'text-green-400' : 'text-red-400'}`} />
                <p className="text-gray-600 mb-6">No feedback available yet</p>
                <button
                  onClick={() => setShowModal(true)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isOutsideClass 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Add First Feedback
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFeedbackTypeColor(feedback.feedback_type)}`}>
                          {getFeedbackTypeName(feedback.feedback_type)}
                        </span>
                        <span className="text-sm text-gray-600">by {feedback.author}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(feedback.created_at)}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{feedback.feedback_text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <FeedbackModal
          candidateId={candidateId!}
          candidateName={candidate.name}
          moduleId={moduleId || 'outside-class'}
          sessionType={sessionType || 'social'}
          isOutsideClass={isOutsideClass}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false)
            fetchFeedbacks()
          }}
        />
      )}
    </div>
  )
}