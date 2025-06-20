// Google Cloud Vision API integration with Service Account Authentication
import { googleAuth } from './googleAuth'

export interface OCRResult {
  text: string
  confidence: number
  service: string
  processingTime: number
  authMethod: string
}

export class GoogleVisionOCR {
  constructor() {}

  isAvailable(): boolean {
    return googleAuth.isAvailable()
  }

  async extractText(imageFile: File): Promise<OCRResult> {
    if (!this.isAvailable()) {
      throw new Error('Google Vision API not configured. Please add VITE_GOOGLE_VISION_API_KEY or VITE_GOOGLE_SERVICE_ACCOUNT to your .env file.')
    }

    const startTime = Date.now()

    try {
      console.log('🚀 Starting Google Vision API text extraction...')
      
      // Get authentication token/key
      const authToken = await googleAuth.getAccessToken()
      const authMethod = googleAuth.getAuthMethod()
      
      console.log(`🔐 Using ${authMethod} authentication`)
      
      // Convert file to base64
      const base64Image = await this.fileToBase64(imageFile)
      
      // Prepare request URL and headers based on auth method
      let url: string
      let headers: Record<string, string>
      
      if (authMethod === 'API Key') {
        url = `https://vision.googleapis.com/v1/images:annotate?key=${authToken}`
        headers = {
          'Content-Type': 'application/json',
        }
      } else {
        url = 'https://vision.googleapis.com/v1/images:annotate'
        headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          requests: [{
            image: {
              content: base64Image
            },
            features: [{
              type: 'TEXT_DETECTION',
              maxResults: 1
            }]
          }]
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Google Vision API error: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`)
      }

      const result = await response.json()
      const processingTime = Date.now() - startTime
      
      if (result.responses?.[0]?.error) {
        throw new Error(`Google Vision API error: ${result.responses[0].error.message}`)
      }
      
      if (result.responses?.[0]?.textAnnotations?.[0]?.description) {
        const extractedText = result.responses[0].textAnnotations[0].description.trim()
        
        console.log(`✅ Google Vision API succeeded in ${processingTime}ms`)
        console.log(`📝 Extracted ${extractedText.length} characters`)
        
        return {
          text: extractedText,
          confidence: 0.95, // Google Vision typically has high confidence
          service: 'Google Cloud Vision API',
          processingTime,
          authMethod
        }
      }
      
      throw new Error('No text detected in the image. Please ensure the image contains clear, readable text.')
    } catch (error) {
      console.error('❌ Google Vision API error:', error)
      throw error instanceof Error ? error : new Error('Failed to extract text from image')
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = () => reject(new Error('Failed to read image file'))
      reader.readAsDataURL(file)
    })
  }

  getServiceInfo() {
    const authMethod = googleAuth.getAuthMethod()
    return {
      name: 'Google Cloud Vision API',
      isAvailable: this.isAvailable(),
      authMethod,
      description: authMethod === 'Service Account' 
        ? 'Google\'s powerful OCR service with service account authentication (recommended for production)'
        : authMethod === 'API Key'
        ? 'Google\'s powerful OCR service with API key authentication'
        : 'Google Cloud Vision API not configured'
    }
  }
}

// Export singleton instance
export const googleVisionOCR = new GoogleVisionOCR()