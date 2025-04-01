"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { X, CheckCircle, XCircle, Info } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useSimpleToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useSimpleToast must be used within a SimpleToastProvider")
  }
  return context
}

export function SimpleToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-md shadow-md flex items-center justify-between min-w-[300px] animate-in slide-in-from-right-full
              ${
                toast.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : toast.type === "error"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === "success" && <CheckCircle className="text-green-600" size={20} />}
              {toast.type === "error" && <XCircle className="text-red-600" size={20} />}
              {toast.type === "info" && <Info className="text-blue-600" size={20} />}
              <p>{toast.message}</p>
            </div>
            <button onClick={() => removeToast(toast.id)} className="ml-4 text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

