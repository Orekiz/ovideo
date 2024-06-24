import config from "@/config"
import { setTitle } from "@/utils"
import { useEffect } from "react"

export default function Error404() {
  useEffect(() => {
    setTitle(`404 | ${config.TITLE}`)
  }, [])
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <h2>页面走丢了</h2>
      </div>
    </div>
  )
}