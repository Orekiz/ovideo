import { useEffect, useRef } from 'react'
import { EPType } from '@/typings'
import Hls from 'hls.js'
import { useOutletContext } from 'react-router-dom'

export interface VideoCompDto {
  url?: string,
  type?: number,
}
// { type, url = '' }: VideoCompDto
export default function VideoComp() {
  const {type, url = ''} = useOutletContext<VideoCompDto>()
  switch(type) {
    case EPType.parse: {
      return <iframe className="border-none bg-black rounded-lg"
        src={url}
        allowFullScreen={true}
        width="100%"
        height="100%"
        />
    }
    case EPType.m3u8: {
      return <VideoCompHls url={url}/>
    }
    default: {
      return <></>
    }
  }
}

interface VideoCompHlsDto {
  url: string
}

function VideoCompHls({ url }: VideoCompHlsDto) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    videoRef.current!.volume = 0.5
  }, [])
  // TODO: 实现hls播放
  useEffect(() => {
    if (!Hls.isSupported)
      return
    const hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(videoRef.current!)
  }, [url])
  return (
    <video ref={videoRef} onCanPlay={() => videoRef.current?.play()} controls className='w-full h-full rounded-lg bg-black outline-none'></video>
  )
}
