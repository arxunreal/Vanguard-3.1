import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { VanguardScene } from './3D/VanguardScene'

export const ProgramsPage: React.FC = () => {
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
                  { name: 'VISION', href: '/vision' },
                  { name: 'PROGRAMS', href: '/programs', active: true }
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
          {/* Hero Quote */}
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
              <BookOpen className="w-10 h-10 text-red-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">Programs</h1>
            
            <div className="bg-gradient-to-br from-black/60 to-red-900/30 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-500/20">
              <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-6">
                "A nation moves forward when all citizens have an equal opportunity to contribute to nation-building."
              </blockquote>
            </div>
          </motion.div>

          {/* Coming Soon */}
          <motion.div 
            className="bg-gradient-to-br from-black/40 to-red-900/20 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-red-500/20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="w-24 h-24 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 mx-auto border border-red-500/30"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(220, 38, 38, 0.3)",
                  "0 0 40px rgba(220, 38, 38, 0.5)",
                  "0 0 20px rgba(220, 38, 38, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BookOpen className="w-12 h-12 text-red-400" />
            </motion.div>
            
            <h3 className="text-4xl font-bold text-white mb-6">Programs Coming Soon</h3>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed text-xl">
              We are currently developing comprehensive programs that will embody our vision of creating nation-builders and servant leaders. Stay tuned for exciting announcements.
            </p>
          </motion.div>
        </div>
      </div>
    </VanguardScene>
  )
}