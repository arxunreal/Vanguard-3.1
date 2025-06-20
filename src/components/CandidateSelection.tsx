import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, User, MessageSquare } from 'lucide-react'
import { candidates } from '../data/candidates'

export const CandidateSelection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-600">Candidate Feedback</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Select a Candidate</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose a candidate to provide feedback and help shape their leadership journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {candidates.map((candidate) => (
            <Link
              key={candidate.id}
              to={`/candidate/${candidate.id}/class-type`}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm leading-tight">{candidate.name}</h3>
              <p className="text-gray-600 text-sm">{candidate.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}