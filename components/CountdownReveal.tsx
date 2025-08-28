"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CountdownRevealProps {
  onReveal: () => void
  targetDate?: Date
}

export default function CountdownReveal({ onReveal, targetDate }: CountdownRevealProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 10, // Start with 10 seconds for demo
  })
  const [isComplete, setIsComplete] = useState(false)
  const [showRevealButton, setShowRevealButton] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          setIsComplete(true)
          setShowRevealButton(true)
          clearInterval(timer)
          return prev
        }

        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }

        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => time.toString().padStart(2, "0")

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 rounded-2xl max-w-md mx-auto"
      >
        <div className="flex items-center justify-center mb-6">
          <Clock className="h-8 w-8 text-primary mr-3" />
          <h2 className="font-playfair font-bold text-2xl text-foreground">Special Surprise</h2>
        </div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <p className="text-muted-foreground mb-6">Something special is waiting for you...</p>

              <div className="flex justify-center gap-4 mb-6">
                {[
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map(({ label, value }, index) => (
                  <motion.div
                    key={label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ scale: value === 0 && label === "Seconds" ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-primary/10 rounded-lg p-4 min-w-16"
                    >
                      <div className="font-playfair font-bold text-3xl text-primary">{formatTime(value)}</div>
                    </motion.div>
                    <div className="text-sm text-muted-foreground mt-2">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-6"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4"
              >
                <Gift className="h-16 w-16 text-primary mx-auto" />
              </motion.div>
              <h3 className="font-playfair font-bold text-xl text-foreground mb-4">Time's Up!</h3>
              <p className="text-muted-foreground mb-6">Your special surprise is ready to be revealed!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRevealButton && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Button
                onClick={onReveal}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Reveal My Surprise
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
