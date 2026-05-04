
import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  strength?: number
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

export function MagneticButton({ 
  children, 
  strength = 0.3, 
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
  type = 'button',
  ...htmlProps
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Filter out props that conflict with Framer Motion
  const {
    onDrag,
    onDragEnd,
    onDragStart,
    onDragEnter,
    onDragExit,
    onDragLeave,
    onDragOver,
    onDrop,
    draggable,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
    ...safeHtmlProps
  } = htmlProps

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return
      
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      setPosition({ x: deltaX, y: deltaY })
    }

    const handleMouseEnterInternal = (e: MouseEvent) => {
      setIsHovered(true)
      onMouseEnter?.(e as any)
    }

    const handleMouseLeaveInternal = (e: MouseEvent) => {
      setIsHovered(false)
      setPosition({ x: 0, y: 0 })
      onMouseLeave?.(e as any)
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseenter', handleMouseEnterInternal)
    button.addEventListener('mouseleave', handleMouseLeaveInternal)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseenter', handleMouseEnterInternal)
      button.removeEventListener('mouseleave', handleMouseLeaveInternal)
    }
  }, [strength, isHovered, onMouseEnter, onMouseLeave])

  const variants = {
    primary: 'premium-cta-btn',
    secondary: 'premium-cta-btn',
    accent: 'premium-cta-btn',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      ref={buttonRef}
      className={cn('group', variants[variant], sizes[size], className)}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...safeHtmlProps}
    >
      <div
        className="pulse-ring pointer-events-none absolute inset-0 z-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}
