import Tesseract from 'tesseract.js'

export interface ParsedFeedback {
  type: 'good' | 'bad' | 'observational'
  text: string
}

export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  try {
    console.log('🔍 Starting text extraction from image...')
    
    const { data: { text } } = await Tesseract.recognize(imageFile, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          console.log(`📝 OCR Progress: ${Math.round(m.progress * 100)}%`)
        }
      }
    })
    
    console.log('✅ Text extraction completed')
    console.log('📄 Extracted text length:', text.length)
    
    return text.trim()
  } catch (error) {
    console.error('❌ Error extracting text from image:', error)
    throw new Error('Failed to extract text from image. Please ensure the image contains clear, readable text.')
  }
}

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please upload a valid image file (JPEG, PNG, or WebP)')
  }
  
  if (file.size > maxSize) {
    throw new Error('Image file size must be less than 10MB')
  }
  
  return true
}