import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageSquare, Shield, Trophy, HandHeart, ArrowRight, Sparkles } from 'lucide-react'
import { VanguardScene } from './3D/VanguardScene'

export const EnhancedHomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <VanguardScene>
      <div className="min-h-screen bg-gradient-to-br from-black/20 via-red-900/10 to-black/30 backdrop-blur-sm">
        {/* Enhanced Header with Navigation */}
        <motion.div 
          className="bg-black/40 backdrop-blur-md shadow-2xl border-b border-red-500/20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25 border border-red-500/30">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Vanguard</h1>
                  <p className="text-xs text-red-300 uppercase tracking-wider font-semibold">DISCIPLINE. MERIT. SACRIFICE.</p>
                </div>
              </motion.div>

              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center gap-8">
                {[
                  { name: 'HOME', href: '/', active: true },
                  { name: 'ABOUT', href: '/about' },
                  { name: 'VISION', href: '/vision' },
                  { name: 'PROGRAMS', href: '/programs' }
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-semibold tracking-wider transition-all duration-300 ${
                      item.active 
                        ? 'text-red-400 border-b-2 border-red-400 pb-1' 
                        : 'text-gray-300 hover:text-red-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Welcome Section */}
          <motion.div 
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30 shadow-lg shadow-red-500/25"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(220, 38, 38, 0.3)",
                    "0 0 40px rgba(220, 38, 38, 0.5)",
                    "0 0 20px rgba(220, 38, 38, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-10 h-10 text-red-400" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
              variants={itemVariants}
            >
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Vanguard</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Powering the next generation of leaders through educational opportunities and training. 
              Emphasizing <span className="font-bold text-red-400">Discipline</span>, <span className="font-bold text-red-400">Merit</span>, and <span className="font-bold text-red-400">Sacrifice</span> to redefine education and reclaim leadership.
            </motion.p>
          </motion.div>

          {/* Core Values with Enhanced Icons and Glows */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { 
                icon: Shield, 
                title: 'Discipline', 
                description: 'Building character through structured growth and self-control',
                color: 'red',
                gradient: 'from-red-500/20 to-red-600/20',
                border: 'border-red-500/30',
                glow: 'shadow-red-500/25'
              },
              { 
                icon: Trophy, 
                title: 'Merit', 
                description: 'Recognizing and developing excellence in all endeavors',
                color: 'yellow',
                gradient: 'from-yellow-500/20 to-yellow-600/20',
                border: 'border-yellow-500/30',
                glow: 'shadow-yellow-500/25'
              },
              { 
                icon: HandHeart, 
                title: 'Sacrifice', 
                description: 'Dedication to service and the greater good',
                color: 'green',
                gradient: 'from-green-500/20 to-green-600/20',
                border: 'border-green-500/30',
                glow: 'shadow-green-500/25'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className={`bg-gradient-to-br ${value.gradient} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${value.border} ${value.glow} hover:shadow-3xl transition-all duration-500`}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-${value.color}-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 mx-auto border border-${value.color}-500/30 relative`}
                  animate={{
                    boxShadow: [
                      `0 0 20px rgba(${value.color === 'red' ? '220, 38, 38' : value.color === 'yellow' ? '234, 179, 8' : '34, 197, 94'}, 0.3)`,
                      `0 0 40px rgba(${value.color === 'red' ? '220, 38, 38' : value.color === 'yellow' ? '234, 179, 8' : '34, 197, 94'}, 0.5)`,
                      `0 0 20px rgba(${value.color === 'red' ? '220, 38, 38' : value.color === 'yellow' ? '234, 179, 8' : '34, 197, 94'}, 0.3)`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-2xl"
                  />
                  <value.icon className={`w-8 h-8 text-${value.color}-400 relative z-10`} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">{value.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* About Vanguard Section */}
          <motion.div 
            className="bg-gradient-to-br from-black/40 to-red-900/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-500/20 text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="w-20 h-20 bg-red-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 mx-auto border border-red-500/30 relative"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(220, 38, 38, 0.3)",
                  "0 0 40px rgba(220, 38, 38, 0.5)",
                  "0 0 20px rgba(220, 38, 38, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-3xl"
              />
              <Shield className="w-10 h-10 text-red-400 relative z-10" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-white mb-6">About Vanguard</h3>
            <p className="text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed text-lg">
              Equipped with an education rooted in purpose, Vanguard candidates serve as local role models to young people around the world and are changing the world through their servant leadership.
            </p>
          </motion.div>

          {/* Feedback System Card */}
          <motion.div 
            className="bg-gradient-to-br from-black/40 to-red-900/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-500/20 text-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="w-20 h-20 bg-red-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 mx-auto border border-red-500/30 relative"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(220, 38, 38, 0.3)",
                  "0 0 40px rgba(220, 38, 38, 0.5)",
                  "0 0 20px rgba(220, 38, 38, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-3xl"
              />
              <MessageSquare className="w-10 h-10 text-red-400 relative z-10" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-white mb-6">Candidate Feedback System</h3>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed text-lg">
              Access the comprehensive feedback system to evaluate and guide our Vanguard candidates.
              Your input helps shape tomorrow's leaders.
            </p>
            
            <Link to="/candidates">
              <motion.button
                className="inline-flex items-center gap-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-10 py-5 rounded-2xl shadow-lg shadow-red-500/25 border border-red-500/30 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">Access Feedback System</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </VanguardScene>
  )
}