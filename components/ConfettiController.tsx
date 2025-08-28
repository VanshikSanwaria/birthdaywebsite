"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Heart, Star } from "lucide-react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  icon: "sparkles" | "heart" | "star"
}

export default function ConfettiController() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isActive, setIsActive] = useState(true)

  const colors = ["text-primary", "text-accent", "text-secondary", "text-pink-400", "text-purple-400"]
  const icons = ["sparkles", "heart", "star"] as const

  useEffect(() => {
    if (!isActive) return

    const createConfettiPiece = (): ConfettiPiece => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
    })

    const interval = setInterval(() => {
      setConfetti((prev) => {
        const newPieces = Array.from({ length: 3 }, createConfettiPiece)
        const activePieces = prev.filter((piece) => piece.y < 120)
        return [...activePieces, ...newPieces].slice(-30) // Limit total pieces
      })
    }, 800)

    return () => clearInterval(interval)
  }, [isActive])

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "heart":
        return Heart
      case "star":
        return Star
      default:
        return Sparkles
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {confetti.map((piece) => {
          const Icon = getIcon(piece.icon)
          return (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.x}vw`,
                y: `${piece.y}vh`,
                rotate: piece.rotation,
                scale: piece.scale,
                opacity: 0,
              }}
              animate={{
                y: "120vh",
                rotate: piece.rotation + 360,
                opacity: [0, 1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 4 + Math.random() * 2,
                ease: "linear",
                opacity: { times: [0, 0.1, 0.9, 1] },
              }}
              className="absolute"
            >
              <Icon className={`h-4 w-4 ${piece.color} ${piece.icon === "heart" ? "fill-current" : ""}`} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
