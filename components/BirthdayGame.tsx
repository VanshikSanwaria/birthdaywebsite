"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Star, Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GameItem {
  id: number
  icon: "heart" | "star" | "gift" | "sparkle"
  matched: boolean
  flipped: boolean
}

interface BirthdayGameProps {
  onComplete: () => void
}

export default function BirthdayGame({ onComplete }: BirthdayGameProps) {
  const [gameItems, setGameItems] = useState<GameItem[]>([])
  const [flippedItems, setFlippedItems] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [moves, setMoves] = useState(0)

  const icons = {
    heart: Heart,
    star: Star,
    gift: Gift,
    sparkle: Sparkles,
  }

  const iconTypes: Array<"heart" | "star" | "gift" | "sparkle"> = ["heart", "star", "gift", "sparkle"]

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const pairs = iconTypes.flatMap((icon) => [
      { id: Math.random(), icon, matched: false, flipped: false },
      { id: Math.random(), icon, matched: false, flipped: false },
    ])

    // Shuffle the pairs
    const shuffled = pairs.sort(() => Math.random() - 0.5)
    setGameItems(shuffled)
    setFlippedItems([])
    setMatchedPairs(0)
    setGameComplete(false)
    setMoves(0)
  }

  const handleItemClick = (clickedId: number) => {
    if (flippedItems.length === 2) return
    if (flippedItems.includes(clickedId)) return
    if (gameItems.find((item) => item.id === clickedId)?.matched) return

    const newFlippedItems = [...flippedItems, clickedId]
    setFlippedItems(newFlippedItems)

    if (newFlippedItems.length === 2) {
      setMoves((prev) => prev + 1)
      const [firstId, secondId] = newFlippedItems
      const firstItem = gameItems.find((item) => item.id === firstId)
      const secondItem = gameItems.find((item) => item.id === secondId)

      if (firstItem && secondItem && firstItem.icon === secondItem.icon) {
        // Match found
        setTimeout(() => {
          setGameItems((prev) =>
            prev.map((item) => (item.id === firstId || item.id === secondId ? { ...item, matched: true } : item)),
          )
          setMatchedPairs((prev) => prev + 1)
          setFlippedItems([])

          if (matchedPairs + 1 === iconTypes.length) {
            setGameComplete(true)
            setTimeout(onComplete, 1000)
          }
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setFlippedItems([])
        }, 1000)
      }
    }
  }

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 rounded-2xl max-w-lg mx-auto"
      >
        <h2 className="font-playfair font-bold text-2xl text-foreground mb-4">Memory Game</h2>
        <p className="text-muted-foreground mb-6">Match the pairs to unlock your surprise!</p>

        <div className="flex justify-between items-center mb-6 text-sm text-muted-foreground">
          <span>Moves: {moves}</span>
          <span>
            Pairs: {matchedPairs}/{iconTypes.length}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {gameItems.map((item) => {
            const Icon = icons[item.icon]
            const isFlipped = flippedItems.includes(item.id) || item.matched

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleItemClick(item.id)}
                className="aspect-square relative"
                disabled={gameComplete}
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full preserve-3d cursor-pointer"
                >
                  {/* Back of card */}
                  <div className="absolute inset-0 backface-hidden bg-primary/20 rounded-lg flex items-center justify-center border-2 border-primary/30">
                    <div className="w-6 h-6 bg-primary/40 rounded-full" />
                  </div>

                  {/* Front of card */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-lg flex items-center justify-center border-2 border-primary/30 shadow-lg">
                    <Icon
                      className={`w-8 h-8 ${
                        item.icon === "heart"
                          ? "text-red-400 fill-current"
                          : item.icon === "star"
                            ? "text-yellow-400 fill-current"
                            : item.icon === "gift"
                              ? "text-primary"
                              : "text-accent"
                      }`}
                    />
                  </div>
                </motion.div>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <div className="text-4xl">🎉</div>
              </motion.div>
              <h3 className="font-playfair font-bold text-xl text-foreground mb-2">Congratulations!</h3>
              <p className="text-muted-foreground">You completed the game in {moves} moves!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={initializeGame}
          variant="outline"
          className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
        >
          Play Again
        </Button>
      </motion.div>
    </div>
  )
}
