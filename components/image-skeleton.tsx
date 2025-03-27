"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface ImageSkeletonProps {
  width: number
  height: number
  className?: string
}

export default function ImageSkeleton({ width, height, className = "" }: ImageSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time between 500ms and 1500ms
    const timer = setTimeout(
      () => {
        setIsLoading(false)
      },
      Math.random() * 1000 + 500,
    )

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading ? (
        <Skeleton className="w-full h-full rounded-md" />
      ) : (
        <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
      )}
    </div>
  )
}

