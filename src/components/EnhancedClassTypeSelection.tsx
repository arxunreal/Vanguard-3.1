import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, User, GraduationCap, MessageSquare, ChevronUp, ChevronDown, BookOpen, Users } from 'lucide-react'
import { candidates } from '../data/candidates'
import { modules } from '../data/modules'
import { VanguardScene } from './3D/VanguardScene'

export const EnhancedClassTypeSelection: React.FC = () => {
  const { candidateId } = useParams<{ candidateId: string }>()
  const candidate = candidates.find(c => c.id === candidateId)
  const [expandedModules, setExpandedModules] = React.useState<string[]>(['ethics', 'empathy', 'communication'])

  if (!candidate) {
    return <div>Candidate not found</div>
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
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
              <Link to="/candidates" className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-all duration-300 group">
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
                <span className="font-semibold">Back to Candidates</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center border border-red-500/30">
                  <User className="w-6 h-6 text-red-400" />
                </div>
                <div className="text-right">
                  <div className="font-bold text-white text-lg">{candidate.name}</div>
                  <div className="text-sm text-red-300">{candidate.title}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Select Class Type</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose between Inside Class modules or Outside Class feedback for <span className="font-bold text-red-400">{candidate.name}</span>
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Inside Class */}
            <motion.div 
              className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-red-500/20"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-8">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl flex items-center justify-center mb-6 mx-auto border border-blue-400/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="w-10 h-10 text-blue-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-3">Inside Class</h3>
                <p className="text-gray-300 text-lg">Structured module-based learning sessions</p>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {modules.map((module, index) => (
                  <motion.div 
                    key={module.id} 
                    className="border border-gray-600/30 rounded-2xl overflow-hidden shadow-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-5 text-left bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-gray-700/50 hover:to-gray-600/50 transition-all duration-300 flex items-center justify-between backdrop-blur-sm"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div>
                        <h4 className="font-bold text-white text-lg">{module.name}</h4>
                        <p className="text-sm text-gray-400">{module.type}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedModules.includes(module.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {expandedModules.includes(module.id) && (
                        <motion.div 
                          className="p-5 space-y-3 bg-black/20 backdrop-blur-sm"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {module.sessions.map((session, sessionIndex) => (
                            <motion.div 
                              key={session.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: sessionIndex * 0.1 }}
                            >
                              <Link
                                to={`/candidate/${candidateId}/feedback/${module.id}/${session.type}`}
                                className={`block px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                  session.type === 'lecture'
                                    ? 'bg-gradient-to-r from-red-600/80 to-red-700/80 text-white hover:from-red-700/80 hover:to-red-800/80 shadow-red-500/25 border border-red-500/30'
                                    : 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 hover:from-red-500/30 hover:to-red-600/30 shadow-red-500/10 border border-red-500/30'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{session.name}</span>
                                  <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    →
                                  </motion.div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Outside Class */}
            <motion.div 
              className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-500/20"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-10">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-3xl flex items-center justify-center mb-6 mx-auto border border-green-400/30"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <MessageSquare className="w-10 h-10 text-green-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-3">Outside Class</h3>
                <p className="text-gray-300 mb-8 text-lg">General feedback and observations</p>
                
                <motion.div 
                  className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 mb-8 border border-green-500/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Provide feedback on the candidate's behavior, interactions, and performance outside of structured class sessions.
                  </p>
                </motion.div>
                
                <Link to={`/candidate/${candidateId}/feedback/outside-class/social`}>
                  <motion.button
                    className="inline-flex items-center gap-4 bg-gradient-to-r from-green-600/80 to-green-700/80 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-green-500/25 border border-green-500/30 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare className="w-6 h-6" />
                    <span className="text-lg">Access Outside Class Feedback</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </VanguardScene>
  )
}