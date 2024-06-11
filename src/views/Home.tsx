import config from "../config"
import VList from "../components/VList"
import { useEffect, useReducer, useState } from "react"
import { Video, VideoData, VideoType } from "@/typings"
import { useLocation } from "react-router-dom"
import { setTitle } from "@/utils"

async function getVideoData(): Promise<VideoData> {
  const res = await fetch('/data/video.json')
  return res.json()
}

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
      const { version, updateDatetime, data } = await getVideoData()
      dispatchVideoDataState({ type: VideoDataStateActionType.VERSIONSE_TED, payload: version })
      dispatchVideoDataState({ type: VideoDataStateActionType.UPDATEDATETIME_SETED, payload: updateDatetime })
      setVideoDataList(data)
    })()
  }, [])
  useEffect(() => {
    setTitle(`${location.state?.title?`${location.state.title} | `:''}${config.TITLE}`)
  }, [location])
  return (
    <>
      <h1 className="text-3xl py-5">{config.TITLE}</h1>
      <span className="text-sub">视频数据版本: v{videoDataState.version}，更新时间: {videoDataState.updateDatetime}</span>
      <section>
        <h2 className="py-4">电视剧</h2>
        <VList videos={videoDataList.filter(video => video.type === VideoType.TV)} />
      </section>
      {/* <section>
        <h2 className="py-4">电影</h2>
      </section> */}
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
