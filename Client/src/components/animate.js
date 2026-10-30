import { AnimatePresence } from 'framer-motion'
import React from 'react'

// AnimatePresence is used to animate components when they are added or removed from the DOM.
export const Animate = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>
}
