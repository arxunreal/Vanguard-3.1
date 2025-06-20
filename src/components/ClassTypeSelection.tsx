import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, User, GraduationCap, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react'
import { candidates } from '../data/candidates'
import { modules } from '../data/modules'

export const ClassTypeSelection: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/candidates" className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Candidates</span>
            </Link>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-red-600" />
              <div className="text-right">
                <div className="font-semibold text-red-600">{candidate.name}</div>
                <div className="text-sm text-gray-600">{candidate.title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Select Class Type</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose between Inside Class modules or Outside Class feedback for <span className="font-semibold">{candidate.name}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inside Class */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Inside Class</h3>
              <p className="text-gray-600">Structured module-based learning sessions</p>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">{module.name}</h4>
                      <p className="text-sm text-gray-600">{module.type}</p>
                    </div>
                    {expandedModules.includes(module.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedModules.includes(module.id) && (
                    <div className="p-4 space-y-2">
                      {module.sessions.map((session) => (
                        <div key={session.id} className="flex gap-2">
                          <Link
                            to={`/candidate/${candidateId}/feedback/${module.id}/${session.type}`}
                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              session.type === 'lecture'
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {session.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Outside Class */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Outside Class</h3>
              <p className="text-gray-600 mb-6">General feedback and observations</p>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-8">
                Provide feedback on the candidate's behavior, interactions, and performance outside of structured class sessions.
              </p>
              
              <Link
                to={`/candidate/${candidateId}/feedback/outside-class/social`}
                className="inline-flex items-center gap-3 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 hover:shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                Access Outside Class Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}