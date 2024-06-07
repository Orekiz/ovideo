import { useEffect, useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom'

export interface Video {
  id: string,
  name: string,
  subtitle: string,
  tags: string[],
  epCount: number,
  img: string,
  eps: EP[],
}

export interface EP {
  title: string,
  url: string,
}

async function getVideoData() {
 const res = await fetch('/data/video.json')
 return res.json()
}

const initVideolistState = {
  version: '',
}

export default function VList() {
  const [videos, setVideos] = useState<Video[]>([])
  const [state, dispatchState] = useReducer(videolistStateReducer, initVideolistState)
  useEffect(() => {
    (async () => {
      const { version, data } = await getVideoData()
      setVideos(data)
      dispatchState({ type: VideolistActionType.VERSIONSETED, payload: version })
    })()
  }, [])
  return (
    <>
      <span className='hidden'>{ state.version }</span>
      <section className='w-full grid grid-cols-6 gap-4 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4'>
        {
          videos.map((video) => {
            return (
              <NavLink to={`video/${video.id}`} key={video.id} state={video}>
                <img src={video.img} alt={video.name} className='w-full rounded-lg' />
                <p className='text-center font-bold'>{video.name}</p>
                <span className='block font-light text-center text-sub'>{video.subtitle}</span>
              </NavLink>
            )
          })
        }
      </section>
    </>
  )
}

enum VideolistActionType {
  VERSIONSETED = 'VERSIONSETED'
}

interface VideolistAction {
  type: VideolistActionType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}

interface VideolistState {
  version: string,
}


function videolistStateReducer(state: VideolistState, action: VideolistAction) {
  switch (action.type) {
    case 'VERSIONSETED': {
      return {
        ...state,
        version: action.payload
      }
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
