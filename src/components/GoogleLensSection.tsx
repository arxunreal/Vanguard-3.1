import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, CheckCircle, AlertCircle, X, Eye, Loader } from 'lucide-react'
import { extractTextFromImage, validateImageFile } from '../utils/textExtraction'

interface GoogleLensSectionProps {
  onTextExtracted: (text: string) => void
}

export const GoogleLensSection: React.FC<GoogleLensSectionProps> = ({ onTextExtracted }) => {
  const [extractedText, setExtractedText] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextSubmit = () => {
    if (extractedText.trim()) {
      onTextExtracted(extractedText)
      setExtractedText('')
      setUploadedImage(null)
      setError(null)
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
          return prev + 10
        })
      }, 200)

      // Extract text from image
      const extractedText = await extractTextFromImage(file)
      
      clearInterval(progressInterval)
      setProcessingProgress(100)
      
      // Set the extracted text
      setExtractedText(extractedText)
      setIsProcessing(false)
      
      if (!extractedText.trim()) {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">🤖 Automatic Text Extraction</h3>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
          Upload an image and we'll automatically extract the text using <span className="font-bold text-blue-600">AI-powered OCR</span>
        </p>

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
                    <span className="font-bold text-blue-800 text-sm">Extracting Text...</span>
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
          </motion.div>
        )}

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