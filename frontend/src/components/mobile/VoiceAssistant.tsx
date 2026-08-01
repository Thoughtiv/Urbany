'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useMapStore } from '@/store/mapStore'
import { useSearchStore } from '@/store/searchStore'
import { isMobileDevice, triggerHapticFeedback } from '@/lib/mobileUtils'

interface VoiceCommandParameters {
  maxPrice?: number
  propertyType?: string
  bedrooms?: number
  location?: string
}

interface VoiceCommand {
  command: string
  action: string
  parameters?: VoiceCommandParameters
  confidence: number
}

interface VoiceAssistantProps {
  onCommand?: (command: VoiceCommand) => void
  onClose?: () => void
  onCommandExecuted?: (command: VoiceCommand) => void
  onSpeechResult?: (transcript: string, isFinal: boolean) => void
  onError?: (error: string) => void
}

interface SpeechRecognitionResultItemLike {
  transcript: string
}

interface SpeechRecognitionEventLike {
  resultIndex: number
  results: Array<{
    isFinal: boolean
    [index: number]: SpeechRecognitionResultItemLike
  }>
}

interface SpeechRecognitionErrorEventLike {
  error: string
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  onstart?: () => void
  onresult?: (event: SpeechRecognitionEventLike) => void
  onerror?: (event: SpeechRecognitionErrorEventLike) => void
  onend?: () => void
  start: () => void
  stop: () => void
  abort: () => void
}

type SpeechRecognitionBrowserCtor = new () => SpeechRecognitionLike

const VoiceAssistant = ({
  onCommand,
  onClose,
  onCommandExecuted,
  onSpeechResult,
  onError
}: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const wakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { setViewport } = useMapStore()
  const { search, setFilters } = useSearchStore()

  // Check if speech recognition is supported
  useEffect(() => {
    const checkSupport = () => {
      const supportedConstructor = getSpeechRecognition()
      const speechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window

      setIsSupported(!!supportedConstructor && speechSynthesis)
    }

    checkSupport()
  }, [])

  // Initialize speech recognition
  const getSpeechRecognition = (): SpeechRecognitionBrowserCtor | null => {
    if (typeof window === 'undefined') {
      return null
    }

    const browserWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionBrowserCtor
      webkitSpeechRecognition?: SpeechRecognitionBrowserCtor
    }

    return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null
  }

  // Initialize speech synthesis
  const initializeSynthesis = useCallback(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Speak text
  const speak = useCallback((text: string, options: Partial<SpeechSynthesisUtterance> = {}) => {
    if (!synthRef.current) return

    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    utterance.rate = options.rate || 0.9
    utterance.pitch = options.pitch || 1
    utterance.volume = options.volume || 0.8
    utterance.lang = options.lang || 'en-US'

    const voices = synthRef.current.getVoices()
    const preferredVoice = voices.find((voice: SpeechSynthesisVoice) =>
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('alex')
    )

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    synthRef.current.speak(utterance)
  }, [])

  // Parse voice command
  const parseVoiceCommand = useCallback((command: string): VoiceCommand | null => {
    const priceMatch = command.match(/(?:find|show|search).*?(?:under|below|less than)?\s*\$?(\d+)(?:k|000)?/)
    if (priceMatch) {
      const price = parseInt(priceMatch[1], 10) * (command.includes('k') ? 1000 : 1)
      return {
        command,
        action: 'search_price',
        parameters: { maxPrice: price },
        confidence: 0.9
      }
    }

    const typeMatches = {
      'houses?': 'house',
      'apartments?': 'apartment',
      'condos?': 'condo',
      'townhouses?': 'townhouse',
      'studios?': 'studio'
    }

    for (const [pattern, type] of Object.entries(typeMatches)) {
      if (command.match(new RegExp(`(?:find|show|search).*?${pattern}`))) {
        return {
          command,
          action: 'search_type',
          parameters: { propertyType: type },
          confidence: 0.85
        }
      }
    }

    const bedroomMatch = command.match(/(\d+)\s*bed(?:room)?/)
    if (bedroomMatch) {
      const bedrooms = parseInt(bedroomMatch[1], 10)
      return {
        command,
        action: 'search_bedrooms',
        parameters: { bedrooms },
        confidence: 0.9
      }
    }

    const locationMatch = command.match(/(?:in|near|around)\s+(.+)/)
    if (locationMatch) {
      return {
        command,
        action: 'search_location',
        parameters: { location: locationMatch[1].trim() },
        confidence: 0.8
      }
    }

    if (command.includes('next') || command.includes('show next')) {
      return {
        command,
        action: 'navigate_next',
        confidence: 0.9
      }
    }

    if (command.includes('previous') || command.includes('show previous') || command.includes('go back')) {
      return {
        command,
        action: 'navigate_previous',
        confidence: 0.9
      }
    }

    if (command.includes('favorite') || command.includes('save')) {
      return {
        command,
        action: 'add_favorite',
        confidence: 0.9
      }
    }

    if (command.includes('help') || command.includes('what can you do')) {
      return {
        command,
        action: 'help',
        confidence: 1.0
      }
    }

    return null
  }, [])

  // Execute voice command
  const executeVoiceCommand = useCallback(async (voiceCommand: VoiceCommand) => {
    switch (voiceCommand.action) {
      case 'search_price':
        if (typeof voiceCommand.parameters?.maxPrice === 'number') {
          setFilters({ maxPrice: voiceCommand.parameters.maxPrice })
        }
        await search()
        break

      case 'search_type':
        if (voiceCommand.parameters?.propertyType) {
          setFilters({ propertyTypes: [voiceCommand.parameters.propertyType] })
        }
        await search()
        break

      case 'search_bedrooms':
        if (typeof voiceCommand.parameters?.bedrooms === 'number') {
          setFilters({ minBedrooms: voiceCommand.parameters.bedrooms })
        }
        await search()
        break

      case 'search_location':
        if (voiceCommand.parameters?.location) {
          console.log('Location search:', voiceCommand.parameters.location)
        }
        break

      case 'navigate_next':
        console.log('Navigate to next property')
        break

      case 'navigate_previous':
        console.log('Navigate to previous property')
        break

      case 'add_favorite':
        console.log('Add to favorites')
        break

      case 'help':
        break
    }
  }, [search, setFilters])

  // Get response for command
  const getCommandResponse = useCallback((command: VoiceCommand): string => {
    switch (command.action) {
      case 'search_price':
        return `Searching for properties under $${(command.parameters?.maxPrice ?? 0).toLocaleString()}`

      case 'search_type':
        return `Finding ${command.parameters?.propertyType ?? 'property'}s for you`

      case 'search_bedrooms':
        return `Looking for ${command.parameters?.bedrooms ?? 0} bedroom properties`

      case 'search_location':
        return `Searching in ${command.parameters?.location ?? 'the area'}`

      case 'navigate_next':
        return 'Showing next property'

      case 'navigate_previous':
        return 'Showing previous property'

      case 'add_favorite':
        return 'Added to your favorites'

      case 'help':
        return 'I can help you search for properties by price, type, bedrooms, or location. Try saying "find houses under $500k" or "show me 3 bedroom apartments"'

      default:
        return 'Command executed successfully'
    }
  }, [])

  const processVoiceCommand = useCallback(async (command: string) => {
    setIsProcessing(true)

    try {
      const voiceCommand = parseVoiceCommand(command.toLowerCase().trim())

      if (voiceCommand) {
        onCommand?.(voiceCommand)
        await executeVoiceCommand(voiceCommand)
        onCommandExecuted?.(voiceCommand)

        const response = getCommandResponse(voiceCommand)
        speak(response)
      } else {
        speak("I'm sorry, I didn't understand that command. Try saying 'find houses under $500k' or 'show me apartments'.")
      }
    } catch (error) {
      console.error('Voice command execution error:', error)
      speak("Sorry, I encountered an error processing your request.")
      onError?.('Command execution failed')
    } finally {
      setIsProcessing(false)
    }
  }, [executeVoiceCommand, getCommandResponse, onCommand, onCommandExecuted, onError, parseVoiceCommand, speak])

  const initializeRecognition = useCallback(() => {
    if (!isSupported) return

    const SpeechRecognition = getSpeechRecognition()

    if (!SpeechRecognition) {
      return
    }

    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }

    const recognition = new SpeechRecognition() as SpeechRecognitionLike
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
      triggerHapticFeedback('light')
    }

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i]
        const currentItem = result[0]
        if (!currentItem) continue

        if (result.isFinal) {
          finalTranscript += currentItem.transcript
        } else {
          interimTranscript += currentItem.transcript
        }
      }

      const currentTranscript = finalTranscript || interimTranscript
      setTranscript(currentTranscript)

      onSpeechResult?.(currentTranscript, !!finalTranscript)

      if (finalTranscript) {
        void processVoiceCommand(finalTranscript)
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      onError?.(`Speech recognition error: ${event.error}`)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
  }, [isSupported, onSpeechResult, onError, processVoiceCommand])

  // Initialize speech synthesis
  const initializeSynthesis = useCallback(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Speak text
  const speak = useCallback((text: string, options: Partial<SpeechSynthesisUtterance> = {}) => {
    if (!synthRef.current) return

    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    utterance.rate = options.rate || 0.9
    utterance.pitch = options.pitch || 1
    utterance.volume = options.volume || 0.8
    utterance.lang = options.lang || 'en-US'

    const voices = synthRef.current.getVoices()
    const preferredVoice = voices.find((voice: SpeechSynthesisVoice) =>
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('alex')
    )

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    synthRef.current.speak(utterance)
  }, [])


  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      initializeRecognition()
    }

    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Failed to start speech recognition:', error)
        onError?.('Failed to start voice recognition')
      }
    }
  }, [isListening, initializeRecognition, onError])

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  // Initialize on mount
  useEffect(() => {
    if (isSupported) {
      initializeRecognition()
      initializeSynthesis()
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [isSupported, initializeRecognition, initializeSynthesis])

  // Wake word detection (simplified)
  useEffect(() => {
    if (!isSupported || !isMobileDevice()) return

    const wakeWords = ['hey real estate', 'real estate', 'property finder']

    const checkWakeWord = (recognizedText: string) => {
      const lowerTranscript = recognizedText.toLowerCase()
      if (wakeWords.some(word => lowerTranscript.includes(word))) {
        if (wakeTimeoutRef.current) {
          clearTimeout(wakeTimeoutRef.current)
        }
        speak('How can I help you find properties?')
        wakeTimeoutRef.current = setTimeout(() => {
          startListening()
        }, 1000)
      }
    }

    void checkWakeWord

    return () => {
      if (wakeTimeoutRef.current) {
        clearTimeout(wakeTimeoutRef.current)
      }
    }
  }, [isSupported, speak, startListening])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="w-full max-w-md rounded-3xl bg-white/95 border border-slate-200 shadow-2xl p-4 pointer-events-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="text-base font-semibold text-slate-900">Voice Assistant</div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
          ) : null}
        </div>

        <p className="text-sm text-slate-600 mb-3">
          {isSupported
            ? isListening
              ? 'Listening for voice commands...'
              : 'Tap listen to start voice control.'
            : 'Speech recognition is not supported in this browser.'}
        </p>

        <div className="rounded-2xl bg-slate-100 p-3 min-h-[4rem] text-slate-900">
          {transcript || 'Waiting for speech input...'}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggleListening}
            className="rounded-full bg-slate-900 px-4 py-2 text-white"
          >
            {isListening ? 'Stop' : 'Listen'}
          </button>
          <button
            type="button"
            onClick={() => speak('How can I help you?')}
            className="rounded-full border border-slate-300 px-4 py-2 text-slate-900"
          >
            Help
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoiceAssistant