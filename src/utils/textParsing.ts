export interface ParsedFeedback {
  type: 'good' | 'bad' | 'observational'
  text: string
}

// Enhanced feedback parsing with much better format detection and separation
export const parseFeedbackText = (text: string): ParsedFeedback[] => {
  console.log('🔍 Parsing feedback text...')
  console.log('📝 Input text length:', text.length)
  
  const feedbacks: ParsedFeedback[] = []
  
  // Clean up the text but preserve line breaks for better parsing
  let cleanText = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
  
  console.log('🧹 Cleaned text:', cleanText.substring(0, 300) + '...')
  
  // Step 1: Split by clear delimiters first
  const segments = splitByDelimiters(cleanText)
  
  console.log(`📋 Found ${segments.length} text segments`)
  
  // Step 2: Process each segment
  segments.forEach((segment, index) => {
    console.log(`🔍 Processing segment ${index + 1}: "${segment.substring(0, 100)}..."`)
    
    const segmentFeedbacks = parseSegment(segment)
    feedbacks.push(...segmentFeedbacks)
  })
  
  // Step 3: Remove duplicates and clean up
  const uniqueFeedbacks = removeDuplicates(feedbacks)
  
  console.log(`🎯 Total unique feedback entries found: ${uniqueFeedbacks.length}`)
  
  return uniqueFeedbacks
}

function splitByDelimiters(text: string): string[] {
  const segments: string[] = []
  
  // Define all possible delimiters that indicate new feedback
  const delimiters = [
    // ## format
    /##\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*##/gi,
    // # format  
    /#\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*#/gi,
    // [] format
    /\[\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*\]/gi,
    // : format (with word boundary)
    /\b(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*:/gi,
    // ** format
    /\*\*\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*\*\*/gi
  ]
  
  // Find all delimiter positions
  const delimiterPositions: Array<{pos: number, match: string, type: string}> = []
  
  delimiters.forEach(delimiter => {
    let match
    delimiter.lastIndex = 0
    while ((match = delimiter.exec(text)) !== null) {
      const typeText = match[1].toLowerCase().trim()
      delimiterPositions.push({
        pos: match.index,
        match: match[0],
        type: normalizeType(typeText)
      })
    }
  })
  
  // Sort by position
  delimiterPositions.sort((a, b) => a.pos - b.pos)
  
  console.log(`🎯 Found ${delimiterPositions.length} delimiters:`, delimiterPositions.map(d => `${d.type} at ${d.pos}`))
  
  if (delimiterPositions.length === 0) {
    // No delimiters found, return the whole text
    return [text]
  }
  
  // Split text based on delimiter positions
  for (let i = 0; i < delimiterPositions.length; i++) {
    const currentDelimiter = delimiterPositions[i]
    const nextDelimiter = delimiterPositions[i + 1]
    
    const startPos = currentDelimiter.pos
    const endPos = nextDelimiter ? nextDelimiter.pos : text.length
    
    const segment = text.substring(startPos, endPos).trim()
    if (segment) {
      segments.push(segment)
    }
  }
  
  return segments
}

function parseSegment(segment: string): ParsedFeedback[] {
  const feedbacks: ParsedFeedback[] = []
  
  // Try different patterns to extract type and content
  const patterns = [
    // ##Type## content
    /^##\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*##\s*(.+)$/si,
    // #Type# content
    /^#\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*#\s*(.+)$/si,
    // [Type] content
    /^\[\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*\]\s*(.+)$/si,
    // Type: content
    /^(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*:\s*(.+)$/si,
    // **Type** content
    /^\*\*\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*\*\*\s*(.+)$/si
  ]
  
  for (const pattern of patterns) {
    const match = segment.match(pattern)
    if (match) {
      const typeText = match[1].toLowerCase().trim()
      let feedbackText = match[2].trim()
      
      // Clean up the feedback text - remove any remaining delimiters
      feedbackText = cleanFeedbackText(feedbackText)
      
      if (feedbackText && feedbackText.length > 3) {
        const feedbackType = normalizeType(typeText)
        if (feedbackType) {
          feedbacks.push({
            type: feedbackType,
            text: feedbackText
          })
          console.log(`✅ Extracted ${feedbackType}: "${feedbackText.substring(0, 50)}..."`)
        }
      }
      break // Found a match, no need to try other patterns
    }
  }
  
  return feedbacks
}

function cleanFeedbackText(text: string): string {
  return text
    // Remove any remaining delimiter patterns
    .replace(/##\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*##/gi, '')
    .replace(/#\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*#/gi, '')
    .replace(/\[\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*\]/gi, '')
    .replace(/\*\*\s*(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*\*\*/gi, '')
    .replace(/(POSITIVE|GOOD|NEEDS?\s*IMPROVEMENT|BAD|OBSERVATIONAL|OBSERVATION)\s*:/gi, '')
    // Clean up extra whitespace and newlines
    .replace(/\s+/g, ' ')
    .replace(/^\s*[-•]\s*/, '') // Remove bullet points
    .trim()
}

function normalizeType(typeText: string): 'good' | 'bad' | 'observational' | null {
  const normalized = typeText.toLowerCase().trim()
  
  if (normalized.includes('positive') || normalized.includes('good')) {
    return 'good'
  } else if (normalized.includes('improvement') || normalized.includes('bad')) {
    return 'bad'
  } else if (normalized.includes('observational') || normalized.includes('observation')) {
    return 'observational'
  }
  
  return null
}

function removeDuplicates(feedbacks: ParsedFeedback[]): ParsedFeedback[] {
  const unique: ParsedFeedback[] = []
  const seen = new Set<string>()
  
  for (const feedback of feedbacks) {
    // Create a key based on type and first 30 characters of text
    const key = `${feedback.type}:${feedback.text.toLowerCase().substring(0, 30)}`
    
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(feedback)
    } else {
      console.log(`⚠️ Skipped duplicate: ${feedback.type} - "${feedback.text.substring(0, 30)}..."`)
    }
  }
  
  return unique
}