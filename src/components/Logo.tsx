import config from "@/config"
import '@/assets/logo.css'

export default function LogoComp({ className }: { className?: string }) {
  return (
    <h1 className={`o-logo ${className} drop-shadow-md text-transparent bg-(clip-text gradient-to-r) from-violet-400 via-pink-300 to-violet-400 @light:(from-violet-600 via-pink-400 to-violet-600) cursor-default`}>
      {config.TITLE}
    </h1>
  )
}