"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, Music, SkipForward, SkipBack } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface Track {
  title: string
  src: string
  duration?: string
}

interface AudioPlayerProps {
  tracks?: Track[]
  className?: string
  autoPlay?: boolean
}

const defaultTracks: Track[] = [
  // { title: "Happy Birthday Song", src: "/audio/happy-birthday.mp3", duration: "2:30" },
  // { title: "Celebration", src: "/audio/celebration.mp3", duration: "3:45" },
  // { title: "Birthday Wishes", src: "/audio/birthday-wishes.mp3", duration: "2:15" },
]

export default function AudioPlayer({ tracks = defaultTracks, className = "", autoPlay = false }: AudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState([0.5])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume[0]
    audio.muted = isMuted

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      setIsPlaying(false)
      // Auto-play next track
      if (currentTrackIndex < tracks.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1)
        setTimeout(() => {
          audio.play().catch(console.error)
          setIsPlaying(true)
        }, 500)
      }
    }

    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [volume, isMuted, currentTrackIndex, tracks.length])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isPlaying) {
      const timer = setTimeout(() => {
        togglePlay()
      }, 2000) // Start playing after 2 seconds
      return () => clearTimeout(timer)
    }
  }, [autoPlay])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(console.error)
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
  }

  const handleSeek = (newTime: number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = newTime[0]
      setCurrentTime(newTime[0])
    }
  }

  const nextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    } else {
      setCurrentTrackIndex(0) // Loop back to first track
    }
  }

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1)
    } else {
      setCurrentTrackIndex(tracks.length - 1) // Loop to last track
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-panel rounded-lg transition-all duration-300 ${
        isExpanded ? "p-6 min-w-80" : "p-4"
      } ${className}`}
    >
      {/* <audio ref={audioRef} src={currentTrack.src} preload="metadata" /> */}

      {/* Compact View */}
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="compact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-3"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              disabled={isLoading}
              className="text-primary hover:text-primary/80 p-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="text-muted-foreground hover:text-foreground p-2"
            >
              <Music className="h-4 w-4" />
            </Button>

            <div className="flex-1 min-w-0">
              {/* <p className="text-xs font-medium text-foreground truncate">{currentTrack.title}</p> */}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-muted-foreground hover:text-foreground p-2"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </motion.div>
        ) : (
          /* Expanded View */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Music className="h-5 w-5 text-primary" />
                <span className="font-playfair font-semibold text-foreground">Now Playing</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </Button>
            </div>

            {/* Track Info */}
            <div className="text-center">
              <h3 className="font-playfair font-semibold text-lg text-foreground mb-1">{currentTrack.title}</h3>
              <p className="text-sm text-muted-foreground">
                Track {currentTrackIndex + 1} of {tracks.length}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration || 100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={previousTrack}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={togglePlay}
                disabled={isLoading}
                className="text-primary hover:text-primary/80 p-3"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextTrack}
                className="text-muted-foreground hover:text-foreground"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <div className="flex-1">
                <Slider value={volume} onValueChange={handleVolumeChange} max={1} step={0.1} className="w-full" />
              </div>

              <span className="text-xs text-muted-foreground min-w-8">{Math.round(volume[0] * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
