import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ErrorView({ err }: { err?: string }) {
  const n = useNavigate()
  useEffect(() => {
    switch (err) {
      case '404': {
        n('/404', { replace: true })
        return
      }
      default: {
        n('/404', { replace: true })
      }
    }
  })
  return null
}