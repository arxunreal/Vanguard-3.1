import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, Globe, BookOpen, Heart, Target } from 'lucide-react'
import { VanguardScene } from './3D/VanguardScene'

export const AboutPage: React.FC = () => {
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

  const theoryOfChangeItems = [
    {
      icon: BookOpen,
      title: "Education rooted in purpose",
      description: "Dexterity believes that the purpose of education is leadership — leadership at home, leadership in community, leadership in a particular field or discipline, leadership for the country and the world.",
      color: "blue"
    },
    {
      icon: Heart,
      title: "Leadership rooted in service",
      description: "Dexterity enables young people to identify \"servant leadership\" as the goal of their education. Dexterity alumni — as true servant leaders — dedicate their lives to serve people and solve pressing problems.",
      color: "red"
    },
    {
      icon: Target,
      title: "The Opportunity Superhighway",
      description: "If you do not know that an opportunity exists, you do not get that opportunity. Dexterity Global believes in and has pioneered the concept of an \"Opportunity Superhighway\" to reach opportunities to children and youth directly in their classrooms, homes and phones.",
      color: "green"
    },
    {
      icon: Globe,
      title: "The gap between education and leadership",
      description: "Through an ecosystem of educational programs, Dexterity Global is inspiring and enabling India's young generation to bridge the gap between their education and leadership — by putting their education to use to solve problems and serve people in real world.",
      color: "yellow"
    },
    {
      icon: Users,
      title: "Local Role Models",
      description: "Dexterity believes in building local role models whose example can increase the levels of aspiration and achievement among young people from similar backgrounds, living in similar or nearby towns or villages.",
      color: "purple"
    },
    {
      icon: Shield,
      title: "For every child, not just a few",
      description: "Dexterity Global is recognized for pioneering a financial aid policy \"Pay only if you can.\" The policy ensures that all students irrespective of their socioeconomic background, family income or pin code get access to all Dexterity Global programs. More than 85% of Dexterity alumni come from low-income families and receive financial aid.",
      color: "indigo"
    }
  ]

  const dexterity10 = [
    "Independent Thinking", "Research", "Communication", "Leadership", "Empathy",
    "Fearlessness", "Public Service", "Nation-building", "Scientific Temperament", "Spiritual Grounding"
  ]

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
                  { name: 'ABOUT', href: '/about', active: true },
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
          {/* Hero Quote */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-black/60 to-red-900/30 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-500/20">
              <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-6">
                "If India has to grow, a generation of young Indians will have to bridge the gap between classroom education and global leadership."
              </blockquote>
              <cite className="text-red-300 text-lg font-semibold">
                Sharad Sagar, Founder and CEO, The Dexterity Global Group
              </cite>
            </div>
          </motion.div>

          {/* The Dexterity Theory of Change */}
          <motion.div 
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-4xl font-bold text-white text-center mb-16"
              variants={itemVariants}
            >
              The Dexterity Theory of Change
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {theoryOfChangeItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-gradient-to-br from-black/40 to-gray-900/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-500/20 hover:border-red-500/30 transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-${item.color}-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-${item.color}-500/30 relative`}
                    animate={{
                      boxShadow: [
                        `0 0 20px rgba(${item.color === 'blue' ? '59, 130, 246' : item.color === 'red' ? '220, 38, 38' : item.color === 'green' ? '34, 197, 94' : item.color === 'yellow' ? '234, 179, 8' : item.color === 'purple' ? '147, 51, 234' : '99, 102, 241'}, 0.3)`,
                        `0 0 40px rgba(${item.color === 'blue' ? '59, 130, 246' : item.color === 'red' ? '220, 38, 38' : item.color === 'green' ? '34, 197, 94' : item.color === 'yellow' ? '234, 179, 8' : item.color === 'purple' ? '147, 51, 234' : '99, 102, 241'}, 0.5)`,
                        `0 0 20px rgba(${item.color === 'blue' ? '59, 130, 246' : item.color === 'red' ? '220, 38, 38' : item.color === 'green' ? '34, 197, 94' : item.color === 'yellow' ? '234, 179, 8' : item.color === 'purple' ? '147, 51, 234' : '99, 102, 241'}, 0.3)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 rounded-2xl"
                    />
                    <item.icon className={`w-8 h-8 text-${item.color}-400 relative z-10`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dexterity 10 */}
          <motion.div 
            className="bg-gradient-to-br from-black/40 to-red-900/20 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-500/20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-4xl font-bold text-white text-center mb-8"
              variants={itemVariants}
            >
              Dexterity 10 — The Core of a Dexterity Education
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-center mb-12 max-w-4xl mx-auto leading-relaxed text-lg"
              variants={itemVariants}
            >
              Dexterity grooms leaders with semi-monastic, semi-military values — enabling them to identify servant leadership as the purpose of their education. Dexterity imparts an education rooted in purpose and builds leadership rooted in service, so that the education, life and work of our young people become the answer to the problems that the world faces. Dexterity 10 comprises of four key skills, two core values, two core commitments and two guiding forces.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {dexterity10.map((item, index) => (
                <motion.div
                  key={item}
                  className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 relative"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-red-400 mb-2">{index + 1}</div>
                    <div className="text-white font-semibold text-sm">{item}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              variants={itemVariants}
            >
              <blockquote className="text-xl font-bold text-white mb-4">
                "The Big Investments of tomorrow need not be on the Stock Exchange. They need to be in our schools."
              </blockquote>
              <cite className="text-red-300 font-semibold">
                Sharad Sagar, Founder and CEO, The Dexterity Global Group
              </cite>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </VanguardScene>
  )
}