"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, Users, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
// import AudioPlayer from "@/components/AudioPlayer"
import ConfettiController from "@/components/ConfettiController"

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ConfettiController />
      <NavBar />
      {/* <AudioPlayer
        className="fixed top-20 right-4 z-40"
        autoPlay={true}
        tracks={[
          // { title: "Happy Birthday Song", src: "/audio/happy-birthday.mp3" },
          // { title: "Celebration", src: "/audio/celebration.mp3" },
          // { title: "Birthday Wishes", src: "/audio/birthday-wishes.mp3" },
        ]}
      /> */}

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={floatingVariants}
                animate="animate"
                className="absolute opacity-20"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 2) * 30}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-sm" />
              </motion.div>
            ))}
          </div>

          {/* Main Heading with enhanced animations */}
          <motion.div variants={itemVariants} className="relative z-10">
            <motion.h1
              className="font-playfair font-bold text-5xl md:text-7xl text-foreground mb-6 text-balance"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Happy Birthday
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="block text-primary mt-2 relative"
              >
                Kaaju ki katli!!
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full origin-left"
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Enhanced subtitle with typewriter effect */}
          <motion.div variants={itemVariants} className="relative z-10">
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Happy Birthday, Ritika urf Devi ji💖 <br/>Born on the 29th of August, you’re truly one of a kind. Today’s all about celebrating you and the happiness you bring into my life. Wishing you a day as beautiful and special as you are.
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 relative z-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold group shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => (window.location.href = "/gallery")}
              >
                Explore Memories
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-semibold bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => (window.location.href = "/messages")}
              >
                Read Wishes
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced feature cards with staggered animations */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative z-10"
          >
            {[
              {
                title: "Beautiful Memories",
                desc: "A collection of precious moments of yours over the years and a little bit with me",
                icon: Calendar,
                gradient: "from-primary/20 to-accent/20",
              },
              {
                title: "Heartfelt Messages",
                desc: "A few words from my side which you probably know already",
                icon: Users,
                gradient: "from-accent/20 to-secondary/20",
              },
              {
                title: "Special Surprises",
                desc: "Something magical waiting just for you to discover",
                icon: Gift,
                gradient: "from-secondary/20 to-primary/20",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                  className={`glass-panel p-6 rounded-xl text-center relative overflow-hidden group cursor-pointer`}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="mb-4 flex justify-center"
                    >
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </motion.div>
                    <h3 className="font-playfair font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Call to action section */}
          <motion.div variants={itemVariants} className="mt-20 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="inline-block"
            >
              <div className="glass-panel p-8 rounded-2xl max-w-md mx-auto">
                <h3 className="font-playfair font-semibold text-2xl text-foreground mb-4">Ready to Begin?</h3>
                <p className="text-muted-foreground mb-6">
                  Your birthday journey awaits.<br/> Aithey aao jara nicchhhuu click kroo!!
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => (window.location.href = "/gallery")}
                  >
                    Start Celebrating
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
