import React from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Target, Award, Heart } from 'lucide-react'

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Vanguard</h1>
              <p className="text-xs text-gray-600 uppercase tracking-wide">DISCIPLINE. MERIT. SACRIFICE.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-red-600">Vanguard</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            A prestigious, values-driven leadership and excellence program rooted in the Chinmaya Vision Program.
            Emphasizing <span className="font-semibold text-red-600">Discipline</span>, <span className="font-semibold text-red-600">Merit</span>, and <span className="font-semibold text-red-600">Sacrifice</span> to nurture future-ready global citizens and ethical leaders.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Target className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Discipline</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Building character through structured growth and self-control
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Award className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Merit</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Recognizing and developing excellence in all endeavors
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Sacrifice</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Dedication to service and the greater good
            </p>
          </div>
        </div>

        {/* Feedback System Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <MessageSquare className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Candidate Feedback System</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Access the comprehensive feedback system to evaluate and guide our Vanguard candidates.
            Your input helps shape tomorrow's leaders.
          </p>
          <Link
            to="/candidates"
            className="inline-flex items-center gap-3 bg-red-600 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            Access Feedback System
          </Link>
        </div>
      </div>
    </div>
  )
}