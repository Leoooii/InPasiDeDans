"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (element?: HTMLElement) => void
      }
    }
  }
}

export default function FacebookPagePreview() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Facebook SDK
    const script = document.createElement("script")
    script.src = "https://connect.facebook.net/ro_RO/sdk.js#xfbml=1&version=v18.0"
    script.async = true
    script.defer = true
    script.crossOrigin = "anonymous"
    document.body.appendChild(script)

    // Parse Facebook elements when SDK is loaded
    script.onload = () => {
      if (window.FB && containerRef.current) {
        window.FB.XFBML.parse(containerRef.current)
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-[520px] overflow-hidden rounded-lg">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/scoaladedansinpasidedans"
        data-tabs="timeline"
        data-width="500"
        data-height="600"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote cite="https://www.facebook.com/scoaladedansinpasidedans" className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/scoaladedansinpasidedans">In pasi de Dans</a>
        </blockquote>
      </div>
    </div>
  )
}

