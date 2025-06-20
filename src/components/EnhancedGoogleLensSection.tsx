import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, CheckCircle, AlertCircle, X, Eye, Loader, Cloud, Globe, Shield, Key } from 'lucide-react'
import { validateImageFile } from '../utils/textExtraction'
import { googleVisionOCR, OCRResult } from '../utils/googleVisionOCR'
import { parseFeedbackText, ParsedFeedback } from '../utils/textParsing'

interface EnhancedGoogleLensSectionProps {
  onTextExtracted: (text: string) => void
}

export const EnhancedGoogleLensSection: React.FC<EnhancedGoogleLensSectionProps> = ({ onTextExtracted }) => {
  const [extractedText, setExtractedText] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null)
  const [parsedFeedbacks, setParsedFeedbacks] = useState<ParsedFeedback[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const serviceInfo = googleVisionOCR.getServiceInfo()

  const handleTextSubmit = () => {
    if (extractedText.trim()) {
      onTextExtracted(extractedText)
      setExtractedText('')
      setUploadedImage(null)
      setError(null)
      setOcrResult(null)
      setParsedFeedbacks([])
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      // Validate the image file
      validateImageFile(file)
      setError(null)
      
      // Show image preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Start text extraction
      setIsProcessing(true)
      setProcessingProgress(0)
      
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 200)

      // Extract text using Google Vision API
      const result = await googleVisionOCR.extractText(file)
      
      clearInterval(progressInterval)
      setProcessingProgress(100)
      
      // Set the extracted text and result info
      setExtractedText(result.text)
      setOcrResult(result)
      setIsProcessing(false)
      
      // Try to parse feedback automatically
      const feedbacks = parseFeedbackText(result.text)
      setParsedFeedbacks(feedbacks)
      
      if (!result.text.trim()) {
        setError('No text could be extracted from the image. Please ensure the image contains clear, readable text.')
      }
      
    } catch (error) {
      console.error('Error processing image:', error)
      setError(error instanceof Error ? error.message : 'Failed to process image')
      setIsProcessing(false)
      setProcessingProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleImageUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleImageUpload(files[0])
    }
  }

  const clearAll = () => {
    setUploadedImage(null)
    setExtractedText('')
    setError(null)
    setIsProcessing(false)
    setProcessingProgress(0)
    setOcrResult(null)
    setParsedFeedbacks([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-100'
    if (confidence >= 0.7) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
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

  const getAuthIcon = (authMethod: string) => {
    if (authMethod === 'Service Account') return <Shield className="w-4 h-4" />
    if (authMethod === 'API Key') return <Key className="w-4 h-4" />
    return <AlertCircle className="w-4 h-4" />
  }

  const getAuthColor = (authMethod: string) => {
    if (authMethod === 'Service Account') return 'bg-green-100 text-green-800 border-green-300'
    if (authMethod === 'API Key') return 'bg-blue-100 text-blue-800 border-blue-300'
    return 'bg-red-100 text-red-800 border-red-300'
  }

  return (
    <motion.div
      className="border-2 border-dashed border-blue-300 rounded-2xl p-8 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="text-center">
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-300"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.3)",
              "0 0 40px rgba(59, 130, 246, 0.5)",
              "0 0 20px rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Eye className="w-10 h-10 text-blue-600" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">🚀 Google Vision AI Text Extraction</h3>
        <p className="text-gray-600 mb-4 max-w-lg mx-auto text-lg">
          Upload an image and we'll extract text using <span className="font-bold text-blue-600">Google Cloud Vision API</span>
        </p>

        {/* Google Vision Status */}
        <div className="mb-6">
          {serviceInfo.isAvailable ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Cloud className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-800">Google Vision API Active!</span>
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-green-700 text-sm mb-3">
                🎉 Your Google Cloud Vision API is configured and ready! This provides industry-leading text recognition accuracy.
              </p>
              <div className="flex justify-center">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getAuthColor(serviceInfo.authMethod)}`}>
                  {getAuthIcon(serviceInfo.authMethod)}
                  {serviceInfo.authMethod} Authentication
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="font-bold text-red-800">Google Vision API Not Configured</span>
              </div>
              <p className="text-red-700 text-sm">
                ⚠️ Google Vision API not configured. Please add VITE_GOOGLE_VISION_API_KEY or VITE_GOOGLE_SERVICE_ACCOUNT to your .env file.
              </p>
            </div>
          )}

          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300">
              <Cloud className="w-4 h-4" />
              Google Cloud Vision API
              <Globe className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-semibold text-sm">Error</span>
              </div>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Upload Area */}
        {!uploadedImage ? (
          <motion.div
            className={`border-2 border-dashed rounded-2xl p-8 mb-6 transition-all duration-300 cursor-pointer ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2 font-semibold">
              {dragActive ? 'Drop your image here' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, WebP (max 10MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isProcessing}
            />
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-bold text-green-800">Image Uploaded</span>
                {ocrResult && (
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{ocrResult.service}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(ocrResult.confidence)}`}>
                      {Math.round(ocrResult.confidence * 100)}% confidence
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthColor(ocrResult.authMethod)}`}>
                      {getAuthIcon(ocrResult.authMethod)}
                      {ocrResult.authMethod}
                    </span>
                  </div>
                )}
              </div>
              <motion.button
                onClick={clearAll}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isProcessing}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="max-w-md mx-auto mb-4">
              <img 
                src={uploadedImage} 
                alt="Uploaded feedback document" 
                className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
              />
            </div>

            {/* Processing Status */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader className="w-5 h-5 text-blue-600" />
                    </motion.div>
                    <span className="font-bold text-blue-800 text-sm">
                      🚀 Processing with Google Vision API...
                    </span>
                  </div>
                  
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                    <motion.div 
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${processingProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-blue-700 text-xs">{processingProgress}% complete</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Processing Results */}
            {ocrResult && !isProcessing && (
              <motion.div
                className="p-4 rounded-xl border-2 mb-4 bg-blue-50 border-blue-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">
                      Processed by {ocrResult.service}
                    </span>
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(ocrResult.confidence)}`}>
                      {Math.round(ocrResult.confidence * 100)}% confidence
                    </span>
                    <span className="text-xs text-blue-600">
                      {ocrResult.processingTime}ms
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAuthColor(ocrResult.authMethod)}`}>
                      {getAuthIcon(ocrResult.authMethod)}
                      {ocrResult.authMethod}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Auto-parsed Feedback Preview */}
        <AnimatePresence>
          {parsedFeedbacks.length > 0 && (
            <motion.div
              className="bg-green-50 rounded-2xl p-6 border border-green-200 shadow-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h4 className="font-bold text-green-900 text-lg">Auto-Parsed Feedback Found!</h4>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                  {parsedFeedbacks.length} entries
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                {parsedFeedbacks.map((feedback, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold border-2 ${getFeedbackTypeColor(feedback.type)}`}>
                        {getFeedbackTypeName(feedback.type)}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed">{feedback.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-green-700 text-sm mb-4">
                ✨ We automatically detected structured feedback! You can process this directly or edit the text below.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input Area */}
        <AnimatePresence>
          {extractedText && (
            <motion.div
              className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h4 className="font-bold text-green-900 text-lg">Extracted Text</h4>
                {ocrResult && (
                  <span className="text-sm text-gray-500">
                    ({extractedText.length} characters)
                  </span>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Review and Edit Extracted Text
                  </label>
                  <textarea
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 resize-none transition-all duration-300"
                    placeholder="Extracted text will appear here..."
                  />
                </div>
                
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-800 text-sm">Supported Formats</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="space-y-1">
                      <div><code className="bg-white px-2 py-1 rounded text-xs">##Positive##</code> Your feedback</div>
                      <div><code className="bg-white px-2 py-1 rounded text-xs">##Needs Improvement##</code> Your feedback</div>
                      <div><code className="bg-white px-2 py-1 rounded text-xs">##Observational##</code> Your feedback</div>
                    </div>
                    <div className="space-y-1">
                      <div><code className="bg-white px-2 py-1 rounded text-xs">#Type#</code> <code className="bg-white px-2 py-1 rounded text-xs">[Type]</code></div>
                      <div><code className="bg-white px-2 py-1 rounded text-xs">Type:</code> <code className="bg-white px-2 py-1 rounded text-xs">**Type**</code></div>
                      <div className="text-xs text-green-600">+ More variations supported</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    onClick={clearAll}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear All
                  </motion.button>
                  <motion.button
                    onClick={handleTextSubmit}
                    disabled={!extractedText.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Upload className="w-5 h-5" />
                    Process Text
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}