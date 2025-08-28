"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, ArrowLeft, Play, Sparkles, Heart } from "lucide-react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import FloatingElements from "@/components/FloatingElements"
import CountdownReveal from "@/components/CountdownReveal"
import BirthdayGame from "@/components/BirthdayGame"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type SurpriseStage = "welcome" | "countdown" | "game" | "letter" | "final"

export default function SurprisePage() {
  const [currentStage, setCurrentStage] = useState<SurpriseStage>("welcome")
  const [showModal, setShowModal] = useState(false)

  const handleStageChange = (stage: SurpriseStage) => {
    setCurrentStage(stage)
  }

  const handleRevealLetter = () => {
    setShowModal(true)
  }

  const specialLetter = `Hiyee Kachua ❤️,

Happy Birthday, mere boondi ke laddoo 🎉  
Another year older, wiser… and still managing to look like you’re just born.  

I honestly don’t know what I did in life to deserve you, but I’m grateful every single day. You make everything lighter, brighter, and way funnier just by being around. Seriously, if laughter could burn calories, I’d be super fit just from hanging out with you.  

Your kindness melts hearts, your smile could literally power an entire city, and your just friendship means more to me than I can ever put into words.  

As you step into another year of your amazing life, I hope you’re surrounded with the same love, chaos, and happiness that you bring to me. You deserve all the adventures, surprises, and maybe even unlimited cake or pizza this year.

So here’s to you—the beautiful, hilarious, one-of-a-kind soul whose eyes squint make me feel precious.  

With all my love (and bad jokes),  
Yours always Panda 🐼`

  return (
    <div className="min-h-screen relative">
      <FloatingElements isActive={currentStage !== "welcome"} />
      <NavBar />

      {/* Hero Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Gift className="h-8 w-8 text-primary mr-3" />
              <h1 className="font-playfair font-bold text-4xl md:text-6xl text-foreground text-balance">
                Special Surprise
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Something magical is waiting just for you. Ready for a little forgettable birthday surprise?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStage === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="glass-panel p-12 rounded-2xl max-w-2xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-8"
                  >
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-primary" />
                    </div>
                  </motion.div>

                  <h2 className="font-playfair font-bold text-3xl text-foreground mb-6">
                    Welcome to Your Birthday Adventure!
                  </h2>

                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    This isn't just any ordinary surprise. I've prepared a series of magical moments, interactive
                    challenges, and heartfelt revelations that maybe will make this birthday a little unforgettable.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      { icon: "⏰", title: "Countdown", desc: "A special timer with a surprise" },
                      { icon: "🎮", title: "Mini Game", desc: "Test your memory skills" },
                      { icon: "💌", title: "Secret Letter", desc: "A heartfelt message awaits" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        className="text-center p-4 bg-white/50 rounded-lg"
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <h3 className="font-playfair font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleStageChange("countdown")}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Begin the Adventure
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStage === "countdown" && (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
              >
                <CountdownReveal onReveal={() => handleStageChange("game")} />
              </motion.div>
            )}

            {currentStage === "game" && (
              <motion.div
                key="game"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
              >
                <BirthdayGame onComplete={() => handleStageChange("letter")} />
              </motion.div>
            )}

            {currentStage === "letter" && (
              <motion.div
                key="letter"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="glass-panel p-12 rounded-2xl max-w-2xl mx-auto">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                    className="mb-8"
                  >
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <Heart className="h-12 w-12 text-primary fill-current" />
                    </div>
                  </motion.div>

                  <h2 className="font-playfair font-bold text-3xl text-foreground mb-6">
                    You've Unlocked Something Special!
                  </h2>

                  <p className="text-lg text-muted-foreground mb-8">
                    Congratulations on completing the challenges!A chhotu sa letter has been written,
                    filled with love, memories, and birthday wishes.
                  </p>

                  <Button
                    onClick={handleRevealLetter}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
                  >
                    Read Your Letter
                  </Button>

                  <div className="mt-6">
                    {/* <Button
                      onClick={() => handleStageChange("final")}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Continue to Final Surprise
                    </Button> */}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStage === "final" && (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="glass-panel p-12 rounded-2xl max-w-2xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.3, duration: 1, times: [0, 0.6, 1] }}
                    className="mb-8"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                  </motion.div>

                  <h2 className="font-playfair font-bold text-4xl text-foreground mb-6">
                    Happy Birthday, Beautiful Soul!
                  </h2>

                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    You've completed your birthday adventure! This entire website was created with love, just for you.
                    Every animation, every word, every moment was designed to celebrate the incredible person you are.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-white/50 border-0">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-3">📸</div>
                        <h3 className="font-playfair font-semibold text-foreground mb-2">Memories</h3>
                        <p className="text-sm text-muted-foreground">Beautiful photos of our journey together</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/50 border-0">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl mb-3">💌</div>
                        <h3 className="font-playfair font-semibold text-foreground mb-2">Messages</h3>
                        <p className="text-sm text-muted-foreground">Heartfelt wishes from everyone who loves you</p>
                      </CardContent>
                    </Card>
                  </div>

                  <p className="text-lg text-foreground font-medium mb-8">
                    May this new year of life bring you endless joy, beautiful adventures, and all the love your heart
                    can hold. You deserve the world and more! ✨
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => (window.location.href = "/")}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2"
                    >
                      Back to Home
                    </Button>
                    <Button
                      onClick={() => handleStageChange("welcome")}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Restart Adventure
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Letter Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <Heart className="h-8 w-8 text-primary mx-auto mb-4 fill-current" />
                <h3 className="font-playfair font-bold text-2xl text-foreground">A Letter Just For You</h3>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-foreground leading-relaxed font-medium">{specialLetter}</div>
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2"
                >
                  Close Letter
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
