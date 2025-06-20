import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, User, MessageSquare, Plus, Edit3, Trash2, TrendingUp, Award, Target } from 'lucide-react'
import { candidates } from '../data/candidates'
import { modules } from '../data/modules'
import { supabase } from '../lib/supabase'
import { EnhancedFeedbackModal } from './EnhancedFeedbackModal'
import { VanguardScene } from './3D/VanguardScene'

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

export const EnhancedFeedbackOverview: React.FC = () => {
  const { candidateId, moduleId, sessionType } = useParams<{ 
    candidateId: string
    moduleId: string
    sessionType: string
  }>()
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null)
  
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

  const handleDeleteFeedback = (id: string) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id))
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
      case 'good': return 'bg-green-100 text-green-800 border-green-200'
      case 'bad': return 'bg-red-100 text-red-800 border-red-200'
      case 'observational': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (!candidate) {
    return <div>Candidate not found</div>
  }

  return (
    <VanguardScene>
      <div className="min-h-screen bg-gradient-to-br from-black/20 via-red-900/10 to-black/30 backdrop-blur-sm">
        {/* Header */}
        <motion.div 
          className="bg-black/40 backdrop-blur-md shadow-2xl border-b border-red-500/20 sticky top-0 z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Link 
                to={`/candidate/${candidateId}/class-type`} 
                className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
                <span className="font-medium">Back to Class Types</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30">
                  <User className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-right">
                  <div className="font-bold text-white text-lg">{candidate.name}</div>
                  <div className="text-sm text-red-300">
                    {isOutsideClass ? 'Outside Class Feedback' : `${module?.name} - ${sessionType}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Main Feedback Card */}
          <motion.div 
            className="bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-500/20 p-8 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isOutsideClass ? 'bg-green-600/20 border border-green-500/30' : 'bg-red-600/20 border border-red-500/30'
                }`}>
                  <MessageSquare className={`w-6 h-6 ${isOutsideClass ? 'text-green-400' : 'text-red-400'}`} />
                </div>
                <h2 className="text-3xl font-bold text-white">Feedback Overview</h2>
              </div>
              <motion.button
                onClick={() => setShowModal(true)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg ${
                  isOutsideClass 
                    ? 'bg-green-600/80 text-white hover:bg-green-500/80 shadow-green-500/25 border border-green-500/30' 
                    : 'bg-red-600/80 text-white hover:bg-red-500/80 shadow-red-500/25 border border-red-500/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Add New Feedback
              </motion.button>
            </div>

            {/* Enhanced Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: TrendingUp, label: 'Total Feedback', value: stats.total, color: 'blue', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-400/30', textColor: 'text-blue-400' },
                { icon: Award, label: 'Positive', value: stats.positive, color: 'green', bgColor: 'bg-green-500/20', borderColor: 'border-green-400/30', textColor: 'text-green-400' },
                { icon: Target, label: 'Needs Improvement', value: stats.needsImprovement, color: 'red', bgColor: 'bg-red-500/20', borderColor: 'border-red-400/30', textColor: 'text-red-400' },
                { icon: MessageSquare, label: 'Observational', value: stats.observational, color: 'yellow', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-400/30', textColor: 'text-yellow-400' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 text-center border ${stat.borderColor}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
                  </div>
                  <div className={`text-4xl font-bold ${stat.textColor} mb-2`}>{stat.value}</div>
                  <div className={`text-sm font-medium ${stat.textColor.replace('400', '300')}`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Progress Bar */}
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between text-sm text-gray-300 mb-4">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-green-400">Positive: {stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0}%</span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-red-400">Needs Improvement: {stats.total > 0 ? Math.round((stats.needsImprovement / stats.total) * 100) : 0}%</span>
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-yellow-400">Observational: {stats.total > 0 ? Math.round((stats.observational / stats.total) * 100) : 0}%</span>
                </span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-gray-600/30">
                <motion.div 
                  className="h-full flex"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                    style={{ width: `${stats.total > 0 ? (stats.positive / stats.total) * 100 : 0}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.total > 0 ? (stats.positive / stats.total) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-red-400 transition-all duration-1000"
                    style={{ width: `${stats.total > 0 ? (stats.needsImprovement / stats.total) * 100 : 0}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.total > 0 ? (stats.needsImprovement / stats.total) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  <motion.div 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-1000"
                    style={{ width: `${stats.total > 0 ? (stats.observational / stats.total) * 100 : 0}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.total > 0 ? (stats.observational / stats.total) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Feedback List */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-red-400" />
                All Feedback ({feedbacks.length})
              </h3>
              
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <motion.div 
                    className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              ) : feedbacks.length === 0 ? (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <MessageSquare className={`w-16 h-16 mx-auto mb-6 ${isOutsideClass ? 'text-green-400/50' : 'text-red-400/50'}`} />
                  <p className="text-gray-400 mb-8 text-lg">No feedback available yet</p>
                  <motion.button
                    onClick={() => setShowModal(true)}
                    className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                      isOutsideClass 
                        ? 'bg-green-600/80 text-white hover:bg-green-500/80 border border-green-500/30' 
                        : 'bg-red-600/80 text-white hover:bg-red-500/80 border border-red-500/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add First Feedback
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence>
                    {feedbacks.map((feedback, index) => (
                      <motion.div 
                        key={feedback.id}
                        className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-600/30 hover:border-red-500/30 transition-all duration-300"
                        variants={itemVariants}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getFeedbackTypeColor(feedback.feedback_type)}`}>
                              {getFeedbackTypeName(feedback.feedback_type)}
                            </span>
                            <span className="text-sm text-gray-300">by <span className="font-semibold text-white">{feedback.author}</span></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400">{formatDate(feedback.created_at)}</span>
                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => {
                                  setEditingFeedback(feedback)
                                  setShowModal(true)
                                }}
                                className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Edit3 className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => {
                                  setEditingFeedback(feedback)
                                  setShowModal(true)
                                }}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-200 leading-relaxed text-lg">{feedback.feedback_text}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Feedback Modal */}
        <AnimatePresence>
          {showModal && (
            <EnhancedFeedbackModal
              candidateId={candidateId!}
              candidateName={candidate.name}
              moduleId={moduleId || 'outside-class'}
              sessionType={sessionType || 'social'}
              isOutsideClass={isOutsideClass}
              editingFeedback={editingFeedback}
              onClose={() => {
                setShowModal(false)
                setEditingFeedback(null)
              }}
              onSuccess={() => {
                setShowModal(false)
                setEditingFeedback(null)
                fetchFeedbacks()
              }}
              onDelete={handleDeleteFeedback}
            />
          )}
        </AnimatePresence>
      </div>
    </VanguardScene>
  )
}