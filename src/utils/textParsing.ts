export interface ParsedFeedback {
  type: 'good' | 'bad' | 'observational'
  text: string
}

// Enhanced feedback parsing with multiple format support
export const parseFeedbackText = (text: string): ParsedFeedback[] => {
  console.log('🔍 Parsing feedback text...')
  console.log('📝 Input text length:', text.length)
  
  const feedbacks: ParsedFeedback[] = []
  
  // Clean up the text more aggressively
  let cleanText = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n+/g, '\n')
    .replace(/\s+/g, ' ')
    .trim()
  
  console.log('🧹 Cleaned text:', cleanText.substring(0, 200) + '...')
  
  // Multiple regex patterns for different formats
  const patterns = [
    // Pattern 1: ##Type## format
    /##\s*(Positive|Good|Needs?\s*Improvement|Bad|Observational|Observation)\s*##\s*([^#]+?)(?=##|$)/gi,
    
    // Pattern 2: #Type# format
    /#\s*(Positive|Good|Needs?\s*Improvement|Bad|Observational|Observation)\s*#\s*([^#]+?)(?=#|$)/gi,
    
    // Pattern 3: [Type] format
    /\[\s*(Positive|Good|Needs?\s*Improvement|Bad|Observational|Observation)\s*\]\s*([^\[\]]+?)(?=\[|$)/gi,
    
    // Pattern 4: Type: format
    /(Positive|Good|Needs?\s*Improvement|Bad|Observational|Observation)\s*:\s*([^:]+?)(?=(?:Positive|Good|Needs?\s*Improvement|Bad|Observational|Observation)\s*:|$)/gi,
    
    // Pattern 5: **Type** format
    /\*\*\s*(Positive|Good|Needs?\s*Improvement|Bad|Observational|Observation)\s*\*\*\s*([^*]+?)(?=\*\*|$)/gi
  ]
  
  let totalMatches = 0
  
  patterns.forEach((pattern, patternIndex) => {
    console.log(`🔍 Trying pattern ${patternIndex + 1}...`)
    
    let match
    pattern.lastIndex = 0 // Reset regex
    
    while ((match = pattern.exec(cleanText)) !== null) {
      const typeText = match[1].toLowerCase().trim()
      const feedbackText = match[2].trim()
      
      console.log(`📋 Found match: "${typeText}" -> "${feedbackText.substring(0, 50)}..."`)
      
      if (feedbackText && feedbackText.length > 5) {
        let feedbackType: 'good' | 'bad' | 'observational'
        
        // Map different type variations
        if (typeText.includes('positive') || typeText.includes('good')) {
          feedbackType = 'good'
        } else if (typeText.includes('improvement') || typeText.includes('bad')) {
          feedbackType = 'bad'
        } else if (typeText.includes('observational') || typeText.includes('observation')) {
          feedbackType = 'observational'
        } else {
          console.log(`⚠️ Unknown feedback type: ${typeText}`)
          continue
        }
        
        // Check for duplicates
        const isDuplicate = feedbacks.some(existing => 
          existing.type === feedbackType && 
          existing.text.toLowerCase().includes(feedbackText.toLowerCase().substring(0, 20))
        )
        
        if (!isDuplicate) {
          feedbacks.push({
            type: feedbackType,
            text: feedbackText
          })
          totalMatches++
          console.log(`✅ Added ${feedbackType} feedback`)
        } else {
          console.log(`⚠️ Skipped duplicate feedback`)
        }
      }
    }
  })
  
  console.log(`🎯 Total feedback entries found: ${totalMatches}`)
  
  return feedbacks
}