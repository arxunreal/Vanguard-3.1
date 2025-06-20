import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, MessageSquare, Users, TrendingUp } from 'lucide-react'
import { candidates } from '../data/candidates'
import { VanguardScene } from './3D/VanguardScene'

export const EnhancedCandidateSelection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
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
              <Link to="/" className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-all duration-300 group">
                <motion.div
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
                <span className="font-semibold">Back to Home</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30">
                  <MessageSquare className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <span className="font-bold text-white text-lg">Candidate Feedback</span>
                  <div className="text-sm text-red-300 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {candidates.length} Candidates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Select a Candidate</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose a candidate to provide feedback and help shape their leadership journey
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/candidate/${candidate.id}/class-type`}
                  className="block bg-black/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-500 group"
                >
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-300 border border-red-500/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <User className="w-7 h-7 text-red-400" />
                  </motion.div>
                  
                  <h3 className="font-bold text-white mb-3 text-sm leading-tight group-hover:text-red-300 transition-colors">
                    {candidate.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{candidate.title}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-red-400 font-semibold bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                      View Profile
                    </span>
                    <motion.div
                      className="w-6 h-6 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
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
        </div>
      </div>
    </VanguardScene>
  )
}