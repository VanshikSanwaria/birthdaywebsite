"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel mt-20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-primary fill-current" />
            <span className="font-playfair font-semibold text-lg text-foreground">Made with Love</span>
            <Heart className="h-6 w-6 text-primary fill-current" />
          </motion.div>
          <p className="text-muted-foreground text-sm">A special birthday celebration from my side created just for you bachha</p>
          <p className="text-muted-foreground text-xs mt-2">© 2025 Birthday Wishes. All rights reserved by Ritika Ji.</p>
        </div>
      </div>
    </motion.footer>
  )
}
