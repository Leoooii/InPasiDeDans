"use client"

import Link from "next/link"
import Image from "next/image"

interface ShineButtonProps {
  title: string
  href: string
  imageSrc: string
}

export default function ShineButton({ title, href, imageSrc }: ShineButtonProps) {
  return (
    <Link href={href} className="relative block overflow-hidden rounded-lg group">
      <div className="relative h-64 w-full overflow-hidden">
        {/* Imagine de fundal */}
        <Image
          src={imageSrc || "/placeholder.svg?height=400&width=600"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>

        {/* Titlu */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="w-0 h-0.5 bg-white mt-2 transition-all duration-300 group-hover:w-full"></div>
        </div>
      </div>
    </Link>
  )
}

