import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

export function Toaster() {
  return null // Placeholder for toast system
}

export function useToast() {
  return {
    toast: (props: { title?: string; description?: string; variant?: "default" | "destructive" }) => {
      console.log("Toast:", props)
    }
  }
}
