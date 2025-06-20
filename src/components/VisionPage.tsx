import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Globe, Users, Lightbulb } from 'lucide-react'
import { VanguardScene } from './3D/VanguardScene'

export const VisionPage: React.FC = () => {
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

  return (
    <VanguardScene>
      <div className="min-h-screen bg-gradient-to-br from-black/20 via-red-900/10 to-black/30 backdrop-blur-sm">
        {/* Header */}
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
                  { name: 'HOME', href: '/' },
                  { name: 'ABOUT', href: '/about' },
                  { name: 'VISION', href: '/vision', active: true },
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
          {/* Vision Statement */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(220, 38, 38, 0.3)",
                  "0 0 40px rgba(220, 38, 38, 0.5)",
                  "0 0 20px rgba(220, 38, 38, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Target className="w-10 h-10 text-red-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">Our Vision</h1>
            
            <div className="bg-gradient-to-br from-black/60 to-red-900/30 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-500/20">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                Inspired by Dexterity Global, we envision a generation of nation-builders who will bridge the gap between their education and leadership, work with each other to serve India, solve the pressing problems of the world and lift more people up.
              </p>
            </div>
          </motion.div>

          {/* Vision Pillars */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                icon: Globe,
                title: "Global Impact",
                description: "Creating leaders who think globally while acting locally, addressing challenges that transcend borders and communities.",
                color: "blue",
                gradient: "from-blue-500/20 to-blue-600/20",
                border: "border-blue-500/30"
              },
              {
                icon: Users,
                title: "Collaborative Leadership",
                description: "Fostering a generation that works together, understanding that the greatest achievements come through collective effort.",
                color: "green",
                gradient: "from-green-500/20 to-green-600/20",
                border: "border-green-500/30"
              },
              {
                icon: Lightbulb,
                title: "Innovation in Service",
                description: "Encouraging creative solutions to age-old problems, using education as a tool for transformation and progress.",
                color: "yellow",
                gradient: "from-yellow-500/20 to-yellow-600/20",
                border: "border-yellow-500/30"
              },
              {
                icon: Target,
                title: "Purpose-Driven Excellence",
                description: "Building leaders whose pursuit of excellence is anchored in a deep sense of purpose and commitment to service.",
                color: "red",
                gradient: "from-red-500/20 to-red-600/20",
                border: "border-red-500/30"
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className={`bg-gradient-to-br ${pillar.gradient} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${pillar.border} hover:shadow-3xl transition-all duration-500`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-${pillar.color}-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-${pillar.color}-500/30 relative`}
                  animate={{
                    boxShadow: [
                      `0 0 20px rgba(${pillar.color === 'red' ? '220, 38, 38' : pillar.color === 'blue' ? '59, 130, 246' : pillar.color === 'green' ? '34, 197, 94' : '234, 179, 8'}, 0.3)`,
                      `0 0 40px rgba(${pillar.color === 'red' ? '220, 38, 38' : pillar.color === 'blue' ? '59, 130, 246' : pillar.color === 'green' ? '34, 197, 94' : '234, 179, 8'}, 0.5)`,
                      `0 0 20px rgba(${pillar.color === 'red' ? '220, 38, 38' : pillar.color === 'blue' ? '59, 130, 246' : pillar.color === 'green' ? '34, 197, 94' : '234, 179, 8'}, 0.3)`
                    ]
                  }}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-2xl"
                  />
                  <pillar.icon className={`w-8 h-8 text-${pillar.color}-400 relative z-10`} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-gray-300 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="bg-gradient-to-br from-black/40 to-red-900/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-500/20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Join the Vision</h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed text-lg">
              Be part of a movement that's reshaping education and leadership. Together, we can build a generation that doesn't just dream of change, but actively creates it.
            </p>
            <Link to="/programs">
              <motion.button
                className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-red-500/25 border border-red-500/30 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About Our Programs
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </VanguardScene>
  )
}