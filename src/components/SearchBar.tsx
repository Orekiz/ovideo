import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchBar ({ value='' }: { value?:string }) {
  const [searchWord, setSearchWord] = useState(value)
  const n = useNavigate()
  useEffect(() => {
    setSearchWord(value)
  }, [value])
  const handleSubmit = () => {
    const location = `/search?w=${searchWord.trim()}`
    n(location)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <section className="flex gap-2 m-auto max-w-90 p-y-4">
      <input type="search" name="w"
        value={searchWord}
        placeholder="请输入关键字"
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyDown={handleKeyDown}
        className="max-md:w-full flex-1 text-base p-y-2 rounded-lg p-x-4 border border-solid bg-transparent outline-none focus:(border-[rgb(var(--theme-color-content))]) transition-all"
      />
      <button className="my-button max-md:bg-transparent" onClick={handleSubmit}>
        <div className="i-mdi-magnify text-xl"></div>
      </button>
    </section>
  )
}