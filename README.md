# Vanguard Feedback System

A modern, AI-powered feedback collection system for Vanguard candidates with Google Cloud Vision API text extraction.

## Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Google Vision AI**: Industry-leading text extraction from images using Google Cloud Vision API
- **Flexible Authentication**: Support for both API Key and Service Account authentication
- **Smart Text Parsing**: Automatically parse structured feedback from extracted text
- **Real-time Analytics**: Visual feedback statistics and progress tracking
- **Secure Database**: Supabase integration with row-level security

## AI Text Extraction

The system uses Google Cloud Vision API for optimal text recognition with industry-leading accuracy.

### Google Cloud Vision API Features:
- **High Accuracy**: Best-in-class text detection and recognition
- **Multiple Languages**: Support for 50+ languages
- **Handwriting Recognition**: Advanced OCR for handwritten text
- **Document Understanding**: Intelligent text structure detection
- **Fast Processing**: Quick response times for real-time applications
- **Flexible Authentication**: API Key or Service Account authentication

### Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd vanguard-feedback
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables in `.env`:
   ```env
   # Supabase (Required)
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google Cloud Vision API (Choose one method)
   
   # Method 1: API Key (Simple)
   VITE_GOOGLE_VISION_API_KEY=your_google_vision_api_key
   
   # Method 2: Service Account (Recommended for production)
   VITE_GOOGLE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project",...}
   ```

3. **Database Setup**
   - Click "Connect to Supabase" in the app
   - The database schema will be automatically created

4. **Start Development**
   ```bash
   npm run dev
   ```

## Google Cloud Vision API Setup

### Method 1: API Key Authentication (Simple)

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable the Vision API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Cloud Vision API"
   - Click "Enable"

3. **Create API Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

4. **Configure Environment**
   - Add to `.env`: `VITE_GOOGLE_VISION_API_KEY=your_api_key_here`

### Method 2: Service Account Authentication (Recommended)

1. **Create a Service Account**
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Give it a name and description

2. **Grant Permissions**
   - Add the "Cloud Vision API User" role
   - Click "Done"

3. **Create and Download Key**
   - Click on your service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create New Key"
   - Choose JSON format and download

4. **Configure Environment**
   - Copy the entire JSON content
   - Add to `.env`: `VITE_GOOGLE_SERVICE_ACCOUNT={"type":"service_account",...}`
   - Or upload the JSON file to your project (for development only)

### Important Security Notes

- **API Keys**: Suitable for development and client-side applications
- **Service Accounts**: More secure, recommended for production environments
- **Never commit credentials**: Always use environment variables
- **Restrict API Keys**: Set up API key restrictions in Google Cloud Console

### API Usage and Pricing

- **Free Tier**: 1,000 units per month
- **Pricing**: $1.50 per 1,000 units after free tier
- **Rate Limits**: 600 requests per minute per project

## Supported Text Formats

The system automatically parses various feedback formats:

```
##Positive## Great leadership skills shown during the session
##Needs Improvement## Could work on time management
##Observational## Actively participated in group discussions

#Good# Excellent communication
[Bad] Needs to focus more
Positive: Shows great empathy
**Observational** Takes initiative well
```

## Usage

1. **Select Candidate**: Choose from the candidate list
2. **Choose Class Type**: Inside Class (modules) or Outside Class
3. **Add Feedback**: 
   - Manual entry, or
   - Upload image with Google Vision AI text extraction
4. **Review Analytics**: View feedback statistics and trends

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Database**: Supabase (PostgreSQL)
- **AI/OCR**: Google Cloud Vision API
- **Authentication**: API Key or Service Account
- **Build Tool**: Vite

## Troubleshooting

### Common Issues

1. **"Google Vision API Not Configured"**
   - Ensure either `VITE_GOOGLE_VISION_API_KEY` or `VITE_GOOGLE_SERVICE_ACCOUNT` is set in your `.env` file
   - Verify the credentials are correct and have Vision API access

2. **"API Error: 403 Forbidden"**
   - Check that billing is enabled for your Google Cloud project
   - Verify the Vision API is enabled
   - For Service Accounts, ensure proper IAM roles are assigned

3. **"No text detected"**
   - Ensure the image contains clear, readable text
   - Try images with higher contrast and resolution

4. **Service Account Authentication Issues**
   - Verify the JSON format is correct
   - Check that the service account has the "Cloud Vision API User" role
   - Ensure the private key is properly formatted

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## License

This project is licensed under the MIT License.