"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Camera, ArrowLeft, Filter, Grid3X3, List } from "lucide-react"
import { useState } from "react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import ImageGrid from "@/components/ImageGrid"
import { Button } from "@/components/ui/button"

// Sample photos - replace with actual photos
const samplePhotos = [
  {
    src: "/deviji.JPG",
    alt: "Birthday celebration with friends",
    title: "That's the way I realised that you ARE devi jiiii",
    date: "date kyaaa thiii ummm idk :/",
  },
  {
    src: "/suit.png",
    alt: "Romantic dinner date",
    title: "Perfect Evening",
    date: "23 March 2025",
  },
  {
    src: "/30nov.jpg",
    alt: "Adventure hiking together",
    title: "Mountain Adventures",
    date: "30 Nov 2024",
  },
  {
    src: "/officialhangout.jpg",
    alt: "Coffee shop moment",
    title: "official hangout ig bachha",
    date: "Date ni yaad aayings :(",
  },
  {
    src: "/aestheticpic.png",
    alt: "Holiday celebration",
    title: "The most aesthetic pic of gulaab ka phool",
    date: "insta says 45wks ago",
  },
  {
    src: "/lehengapic.png",
    alt: "Uncle Aunty Anniversary",
    title: "You on 25th Wedding Anniversary",
    date: "16th April 2025",
  },
  {
    src: "/kajal.png",
    alt: "Park picnic day",
    title: "Your first ever snap I got:- applied kajal after ages was it?",
    date: "january 2025 m thha kbhi ig 7th",
  },
  {
    src: "/baddie.png",
    alt: "Art gallery visit",
    title: "tab bhi out of league thhe and abb thode se kam but still out of league ho",
    date: "date ni pataya hai mainu :/",
  },

]

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState<"all" | "recent" | "favorites">("all")

  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 300], [0, -50])
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8])

  const filteredPhotos = samplePhotos // In a real app, you'd filter based on the filter state

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero Header with Parallax */}
      <motion.section
        style={{ y: headerY, opacity: headerOpacity }}
        className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-primary mr-3" />
              <h1 className="font-playfair font-bold text-4xl md:text-6xl text-foreground text-balance">
                Memory Gallery
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              A beautiful collection of our precious moments together. Each photo tells a story of joy, laughter, and
              love.
            </p>
          </motion.div>

          {/* Navigation and Controls */}
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
              {/* Filter buttons */}
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1">
                {[
                
                ].map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant={filter === key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilter(key as any)}
                    className="text-xs"
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {label}
                  </Button>
                ))}
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
            <ImageGrid photos={filteredPhotos} />
          </motion.div>

          {/* Load more section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
