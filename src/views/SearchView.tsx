import Footer from "@/components/Footer"
import Logo from "@/components/Logo"
import SearchBar from "@/components/SearchBar"
import VList from "@/components/VList"
import { Video } from "@/typings"
import videodataStore from "@/utils/videodata.store"
import { useCallback, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import '@/assets/home.css'

// function uniqueRes(arr: Video[]) {
//   return arr.filter(function(item, index, arr) {
//     //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
//     return arr.indexOf(item, 0) === index;
//   });
// }
export default function SearchView() {
  const [sp] = useSearchParams()
  const [searchWord, setSearchWord] = useState('')
  const [searchWords, setSearchWords] = useState<string[]>([])
  const [videodata, setVideodata] = useState<Video[]>([])
  const [searchRes, setSearchRes] = useState<Video[]>([])
  useEffect(() => {
    setSearchWord(sp.get('w') ?? '')
    setSearchWords(sp.get('w')?.split(/\s+/) ?? [''])
    ;(async () => {
      const { data } = await videodataStore.getVideoData()
      setVideodata(data)
    })()
  }, [sp])
  const getSearchRes = useCallback(async () => {
    console.log('searchWords:', searchWords)
    // 获取videodata中视频名包含searchWords的视频, 拿这些video的id去请求videoinfo
    const res = await Promise.all(videodata.filter((v) => searchWords.every((w) => v.name.includes(w))).map((video) => videodataStore.getVideoInfo(video.id)))
    return res
  }, [searchWords, videodata])
  useEffect(() => {
    if(videodata.length === 0) return
    ;(async () => {
      const res = await getSearchRes()
      console.log('searchRes:', res)
      setSearchRes(res)
    })()
    // 去重
  }, [getSearchRes, videodata])
  return (
    <section>
      <header className="home-header flex justify-between items-center">
        <div>
          <Link to='/'>
            <Logo className="py-4 cursor-pointer" />
          </Link>
        </div>
        <div>
          <a href="http://github.com/orekiz/ovideo" target="_blank" rel="noopener noreferrer" className='text-2xl text-sub hover:text-gray-2 transition align-middle'>
            <p className="i-mdi-github"></p>
          </a>
        </div>
      </header>
      <section>
        <SearchBar value={searchWord} />
      </section>
      <section>
        <h2 className="text-xl p-y-4">搜索结果</h2>
        <VList videos={searchRes} />
        {
          !searchRes.length && <p>空</p>
        }
      </section>
      <Footer />
    </section>
  )
}