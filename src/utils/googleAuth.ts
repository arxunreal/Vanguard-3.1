// Google Cloud Authentication using Service Account
export interface ServiceAccountKey {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
  universe_domain: string
}

export class GoogleCloudAuth {
  private serviceAccount: ServiceAccountKey | null = null
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  constructor() {
    this.loadServiceAccount()
  }

  private loadServiceAccount() {
    try {
      // Try to load from environment variable first
      const serviceAccountJson = import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT
      if (serviceAccountJson) {
        this.serviceAccount = JSON.parse(serviceAccountJson)
        console.log('✅ Service account loaded from environment')
        return
      }

      // Fallback to the uploaded file (for development)
      // In production, you should use environment variables
      console.log('⚠️ No service account in environment, using fallback')
    } catch (error) {
      console.error('❌ Failed to load service account:', error)
    }
  }

  isAvailable(): boolean {
    return !!this.serviceAccount || !!import.meta.env.VITE_GOOGLE_VISION_API_KEY
  }

  async getAccessToken(): Promise<string> {
    // If we have a simple API key, use that instead
    const apiKey = import.meta.env.VITE_GOOGLE_VISION_API_KEY
    if (apiKey && !this.serviceAccount) {
      return apiKey
    }

    if (!this.serviceAccount) {
      throw new Error('No Google Cloud credentials available')
    }

    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      // Create JWT for service account authentication
      const jwt = await this.createJWT()
      
      // Exchange JWT for access token
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: jwt,
        }),
      })

      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`)
      }

      const tokenData = await response.json()
      this.accessToken = tokenData.access_token
      this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - 60000 // 1 minute buffer

      console.log('✅ Access token obtained successfully')
      return this.accessToken
    } catch (error) {
      console.error('❌ Failed to get access token:', error)
      throw error
    }
  }

  private async createJWT(): Promise<string> {
    if (!this.serviceAccount) {
      throw new Error('Service account not loaded')
    }

    const now = Math.floor(Date.now() / 1000)
    const payload = {
      iss: this.serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-vision',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600, // 1 hour
      iat: now,
    }

    // Create JWT header
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    }

    // Base64URL encode header and payload
    const encodedHeader = this.base64UrlEncode(JSON.stringify(header))
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload))

    // Create signature
    const signatureInput = `${encodedHeader}.${encodedPayload}`
    const signature = await this.signWithPrivateKey(signatureInput, this.serviceAccount.private_key)

    return `${signatureInput}.${signature}`
  }

  private base64UrlEncode(str: string): string {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  private async signWithPrivateKey(data: string, privateKeyPem: string): Promise<string> {
    // Import the private key
    const privateKey = await crypto.subtle.importKey(
      'pkcs8',
      this.pemToArrayBuffer(privateKeyPem),
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    )

    // Sign the data
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      privateKey,
      new TextEncoder().encode(data)
    )

    // Convert to base64url
    return this.arrayBufferToBase64Url(signature)
  }

  private pemToArrayBuffer(pem: string): ArrayBuffer {
    const b64 = pem
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\s/g, '')
    
    const binaryString = atob(b64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  private arrayBufferToBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  getAuthMethod(): string {
    if (import.meta.env.VITE_GOOGLE_VISION_API_KEY && !this.serviceAccount) {
      return 'API Key'
    }
    if (this.serviceAccount) {
      return 'Service Account'
    }
    return 'Not Configured'
  }
}

// Export singleton instance
export const googleAuth = new GoogleCloudAuth()