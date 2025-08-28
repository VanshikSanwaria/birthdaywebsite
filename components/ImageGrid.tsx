"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import ImageCard from "./ImageCard"
import { Button } from "@/components/ui/button"

interface Photo {
  src: string
  alt: string
  title?: string
  date?: string
}

interface ImageGridProps {
  photos: Photo[]
  className?: string
}

export default function ImageGrid({ photos, className = "" }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ src, alt })
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      >
        {photos.map((photo, index) => (
          <ImageCard
            key={index}
            src={photo.src || "/placeholder.svg"}
            alt={photo.alt}
            title={photo.title}
            date={photo.date}
            index={index}
            onImageClick={handleImageClick}
          />
        ))}
      </motion.div>

      {/* Modal for full-size image viewing */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-lg"
              />

              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                onClick={closeModal}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
