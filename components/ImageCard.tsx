"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Download, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageCardProps {
  src: string
  alt: string
  title?: string
  date?: string
  index: number
  onImageClick: (src: string, alt: string) => void
}

export default function ImageCard({ src, alt, title, date, index, onImageClick }: ImageCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

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
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image container with zoom effect */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          variants={imageVariants}
          initial="hidden"
          animate={imageLoaded ? "visible" : "hidden"}
          src={src}
          alt={alt}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500 ease-out"
          onLoad={() => setImageLoaded(true)}
          onClick={() => onImageClick(src, alt)}
        />

        {/* Overlay with actions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              onImageClick(src, alt)
            }}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              // Download functionality would go here
            }}
          >
            <Download className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Card content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
        className="p-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {title && (
              <h3 className="font-playfair font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
            )}
            {date && <p className="text-sm text-muted-foreground">{date}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="ml-2 p-1"
          >
            <Heart
              className={`h-5 w-5 transition-colors duration-300 ${
                isLiked ? "text-red-500 fill-current" : "text-muted-foreground hover:text-red-500"
              }`}
            />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
