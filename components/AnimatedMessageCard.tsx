"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Quote, User } from "lucide-react"

interface Message {
  id: string
  name: string
  message: string
  avatar?: string
  date: string
  isSpecial?: boolean
}

interface AnimatedMessageCardProps {
  message: Message
  index: number
  animationType?: "typewriter" | "flip" | "fade"
}

export default function AnimatedMessageCard({
  message,
  index,
  animationType = "typewriter",
}: AnimatedMessageCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCard, setShowCard] = useState(false)

  // Typewriter effect
  useEffect(() => {
    if (animationType === "typewriter" && showCard) {
      setIsTyping(true)
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= message.message.length) {
          setDisplayedText(message.message.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(interval)
        }
      }, 30)

      return () => clearInterval(interval)
    }
  }, [message.message, animationType, showCard])

  // Trigger card appearance
  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), index * 200)
    return () => clearTimeout(timer)
  }, [index])

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      },
    },
  }

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  }

  const renderTypewriterCard = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`glass-panel p-6 rounded-xl relative overflow-hidden group cursor-pointer ${
        message.isSpecial ? "border-2 border-primary/30" : ""
      }`}
    >
      {/* Special message indicator */}
      {message.isSpecial && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
          className="absolute top-4 right-4"
        >
          <Heart className="h-5 w-5 text-primary fill-current" />
        </motion.div>
      )}

      {/* Quote icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
        className="mb-4"
      >
        <Quote className="h-6 w-6 text-primary/60" />
      </motion.div>

      {/* Message content */}
      <div className="mb-6">
        <p className="text-foreground text-lg leading-relaxed font-medium">
          {animationType === "typewriter" ? displayedText : message.message}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </div>

      {/* Author info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          {message.avatar ? (
            <img
              src={message.avatar || "/placeholder.svg"}
              alt={message.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-primary" />
          )}
        </div>
        <div>
          <p className="font-playfair font-semibold text-foreground">{message.name}</p>
          <p className="text-sm text-muted-foreground">{message.date}</p>
        </div>
      </motion.div>

      {/* Hover effect background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl pointer-events-none"
      />
    </motion.div>
  )

  const renderFlipCard = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="perspective-1000 h-64"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        variants={flipVariants}
        animate={isFlipped ? "back" : "front"}
        className="relative w-full h-full preserve-3d cursor-pointer"
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden glass-panel rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
            className="mb-4"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              {message.avatar ? (
                <img
                  src={message.avatar || "/placeholder.svg"}
                  alt={message.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
            </div>
          </motion.div>
          <h3 className="font-playfair font-bold text-xl text-foreground mb-2">{message.name}</h3>
          <p className="text-muted-foreground text-sm mb-4">Click to read message</p>
          <p className="text-xs text-muted-foreground">{message.date}</p>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel rounded-xl p-6 flex flex-col justify-center">
          <Quote className="h-6 w-6 text-primary/60 mb-4" />
          <p className="text-foreground text-lg leading-relaxed font-medium mb-4">{message.message}</p>
          <p className="text-sm text-muted-foreground text-right">— {message.name}</p>
        </div>
      </motion.div>
    </motion.div>
  )

  if (animationType === "flip") {
    return renderFlipCard()
  }

  return renderTypewriterCard()
}
