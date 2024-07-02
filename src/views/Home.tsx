import config from "../config"
import VList from "../components/VList"
import { useEffect, useReducer, useState } from "react"
import { Video, VideoType } from "@/typings"
import { useLocation } from "react-router-dom"
import { setTitle } from "@/utils"
import videodatastate from "@/utils/videodata.store"
import Footer from "@/components/Footer"
import Logo from "@/components/Logo"
import '@/assets/home.css'
import SearchBar from "@/components/SearchBar"

const initVideoDataState = {
  version: '',
  updateDatetime: '',
}

export default function Home() {
  const [videoDataState, dispatchVideoDataState] = useReducer(videoDataStateReducer,initVideoDataState)
  const [videoDataList, setVideoDataList] = useState<Video[]>([])
  const location = useLocation()
  useEffect(() => {
    (async () => {
      // const { version, updateDatetime, data } = await getVideoData()
      const { version, updateDatetime, data } = await videodatastate.getVideoData()
      dispatchVideoDataState({ type: VideoDataStateActionType.VERSIONSE_TED, payload: version })
      dispatchVideoDataState({ type: VideoDataStateActionType.UPDATEDATETIME_SETED, payload: updateDatetime })
      setVideoDataList(data)
    })()
  }, [])
  useEffect(() => {
    setTitle(`${config.TITLE}`)
  }, [location])
  return (
    <>
      <header className="home-header flex justify-between items-center gap-4">
        <Logo className="py-4" />
        <SearchBar />
        <div>
          <a href="http://github.com/orekiz/ovideo" target="_blank" rel="noopener noreferrer" className='inline-block i-mdi-github text-2xl text-sub hover:text-gray-2 transition align-middle'></a>
        </div>
      </header>
      <span className="text-sm text-sub">视频数据版本: v{videoDataState.version}，更新时间: {new Date(videoDataState.updateDatetime*1000).toLocaleString()}</span>
      <section>
        <div className="py-4 home-vlist-title home-title-ep  flex justify-between">
          <h2 className="drop-shadow">剧集</h2>
          {/* <button className="my-button">更多</button> */}
        </div>
        <VList videos={videoDataList.filter(video => video.type === VideoType.TV)} />
      </section>
      <section>
        <h2 className="home-vlist-title home-title-movie py-4 drop-shadow">电影</h2>
        <VList videos={videoDataList.filter(video => video.type === VideoType.MOVIE)} />
      </section>
      <Footer />
    </>
  )
}

enum VideoDataStateActionType {
  VERSIONSE_TED = 'VERSIONSE_TED',
  UPDATEDATETIME_SETED = 'UPDATEDATETIME_SETED'
}

interface VideoDataStateAction {
  type: VideoDataStateActionType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}

interface VideoDataState {
  version: string,
  updateDatetime: string,
}

function videoDataStateReducer(state: VideoDataState, action: VideoDataStateAction) {
  switch (action.type) {
    case VideoDataStateActionType.VERSIONSE_TED: {
      return {
        ...state,
        version: action.payload
      }
    }
    case VideoDataStateActionType.UPDATEDATETIME_SETED: {
      return {
        ...state,
        updateDatetime: action.payload
      }
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
