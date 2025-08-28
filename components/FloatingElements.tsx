"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Star, Sparkles, Gift } from "lucide-react"

interface FloatingElement {
  id: number
  x: number
  y: number
  type: "heart" | "star" | "sparkle" | "gift"
  size: number
  duration: number
  delay: number
}

interface FloatingElementsProps {
  count?: number
  isActive?: boolean
}

export default function FloatingElements({ count = 15, isActive = true }: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([])

  const elementTypes = ["heart", "star", "sparkle", "gift"] as const
  const icons = {
    heart: Heart,
    star: Star,
    sparkle: Sparkles,
    gift: Gift,
  }

  useEffect(() => {
    if (!isActive) return

    const generateElements = () => {
      const newElements: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        size: 16 + Math.random() * 16,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      }))
      setElements(newElements)
    }

    generateElements()
    const interval = setInterval(generateElements, 8000)

    return () => clearInterval(interval)
  }, [count, isActive])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {elements.map((element) => {
          const Icon = icons[element.type]
          return (
            <motion.div
              key={element.id}
              initial={{
                x: `${element.x}vw`,
                y: "100vh",
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                y: "-10vh",
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                rotate: 360,
                x: [`${element.x}vw`, `${element.x + (Math.random() - 0.5) * 20}vw`],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: element.duration,
                delay: element.delay,
                ease: "easeOut",
                opacity: { times: [0, 0.2, 0.8, 1] },
                scale: { times: [0, 0.2, 0.8, 1] },
              }}
              className="absolute"
              style={{
                width: element.size,
                height: element.size,
              }}
            >
              <Icon
                className={`w-full h-full ${
                  element.type === "heart"
                    ? "text-red-400 fill-current"
                    : element.type === "star"
                      ? "text-yellow-400 fill-current"
                      : element.type === "gift"
                        ? "text-primary"
                        : "text-accent"
                }`}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
