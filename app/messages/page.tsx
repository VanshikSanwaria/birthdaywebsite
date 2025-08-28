"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Plus, Send, ArrowLeft, Filter, Heart } from "lucide-react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import AnimatedMessageCard from "@/components/AnimatedMessageCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: string
  name: string
  message: string
  avatar?: string
  date: string
  isSpecial?: boolean
}

const initialMessages: Message[] = [
  {
    id: "1",
    name: "Bandar101",
    message:
      "Happy birthday to the most adorable person I know! Your kindness, laughter, and beautiful spirit light up my whole face. I'm very glad to have you in my life.",
    date: "Today",
    isSpecial: true,
  },
  {
    id: "2",
    name: "boy101",
    message:
      "Wishing you the happiest 21st birthday! You deserve everything and anything your heart desires. You are amazing and special, and I wish this year brings you endless joy and unforgettable memories.",
    date: "Today",
  },
  {
    id: "3",
    name: "Aaloo ka Parontha",
    message:
      "I hope you find kachha mango bite, chaand sitare, aam papad, khatti meethi imli or pink vali imli to eat chatorey kahin ke",
    date: "Today",
  },
  {
    id: "4",
    name: "Vanshik",
    message:
      "Happyyy Birthdaayyyyyyyy bachhhaaaaa!!! May your day be filled with laughter, love, and all the things you do to make me smile. You deserve the best on your special day and always! God I'm crying while doing this & have a very wide smile. Happiest birthday patakhaa!!",
    date: "Today",
  },
  {
    id: "5",
    name: "Shanvik",
    message:
      "Damnnnn hot cheeks ka birthday hai. Happy Birthday supercalifragilisticexpialidocious lady. Umm you know how gorgeous and hott piece of art you are. And damnnn that killer smile ladyyyy which is so contagious; god bless rajni aunty ji.",
    date: "Today",
  },
  {
    id: "6",
    name: "Anonymous",
    message:
      "You're the amaziest person maybe I'm a bore but damnn you're the spark of this just friendship. Lastly, I mean kabhi khatam ni hone vali list hai yeh but May God bless you with whatever you wished for sweetpea and have amazing years ahead.",
    date: "Today",
  },
]

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMessage, setNewMessage] = useState({ name: "", message: "" })
  const [animationType, setAnimationType] = useState<"typewriter" | "flip" | "fade">("typewriter")
  const [filter, setFilter] = useState<"all" | "special">("all")

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.name.trim() && newMessage.message.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        name: newMessage.name.trim(),
        message: newMessage.message.trim(),
        date: "Just now",
      }
      setMessages([message, ...messages])
      setNewMessage({ name: "", message: "" })
      setShowAddForm(false)
    }
  }

  const filteredMessages = messages.filter((msg) => (filter === "special" ? msg.isSpecial : true))

  return (
    <div className="min-h-screen">
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
              <MessageCircle className="h-8 w-8 text-primary mr-3" />
              <h1 className="font-playfair font-bold text-4xl md:text-6xl text-foreground text-balance">
                Birthday Wish From Your Panda
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Heartfelt messages from you know who. Each word is alphabet is filled with extensive brainlag.
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
          >
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>

            <div className="flex items-center gap-2">
              {/* Animation type selector */}
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1">
                {[
                  { key: "typewriter", label: "Type" },
                  { key: "flip", label: "Flip" },
                  { key: "fade", label: "Fade" },
                ].map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={animationType === key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setAnimationType(key as any)}
                    className="text-xs"
                  >
                    {label}
                  </Button>
                ))}
              </div>

              {/* Filter */}
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1">
                {/* <Button
                  variant={filter === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="text-xs"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  All
                </Button>
                <Button
                  variant={filter === "special" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("special")}
                  className="text-xs"
                >
                  <Heart className="h-3 w-3 mr-1" />
                  Special
                </Button> */}
              </div>

              {/* Add message button
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Message
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add Message Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="glass-panel border-0">
                <CardHeader>
                  <CardTitle className="font-playfair text-center">Add Your Birthday Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddMessage} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your name"
                        value={newMessage.name}
                        onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                        className="bg-white/80"
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Write your birthday message..."
                        value={newMessage.message}
                        onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                        className="bg-white/80 min-h-24"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredMessages.map((message, index) => (
              <AnimatedMessageCard key={message.id} message={message} index={index} animationType={animationType} />
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredMessages.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="glass-panel p-8 rounded-2xl max-w-md mx-auto">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-playfair font-semibold text-xl text-foreground mb-2">No Messages Yet</h3>
                <p className="text-muted-foreground mb-6">Be the first to leave a birthday message!</p>
                <Button onClick={() => setShowAddForm(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Message
                </Button>
              </div>
            </motion.div>
          )}

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <div className="glass-panel p-8 rounded-2xl max-w-md mx-auto">
              {/* <h3 className="font-playfair font-semibold text-xl text-foreground mb-4">Share the Love</h3> */}
              {/* <p className="text-muted-foreground mb-6">
                Invite friends and family to add their birthday wishes and make this day even more special
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Share This Page
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
