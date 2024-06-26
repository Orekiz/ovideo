import { SyntheticEvent, useEffect, useRef } from 'react'
import { EPType } from '@/typings'
import Hls from 'hls.js'
import { useOutletContext } from 'react-router-dom'
import { message } from 'antd'

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
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    videoRef.current!.volume = 0.5
  }, [])
  // TODO: 实现hls播放
  useEffect(() => {
    // message展示视频加载状态
    messageApi.loading({ content: '加载中...', key: 'video-loading', duration: 0 })
    if (!Hls.isSupported())
      return
    const hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(videoRef.current!)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      messageApi.success({ content: '资源信息加载成功, 等待视频装载中', key: 'video-loading' })
    })
    hls.on(Hls.Events.ERROR, (_, data) => {
      switch(data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR: {
          messageApi.error({ content: '网络错误, 视频加载失败', key: 'video-loading', duration: 5 })
          return
        }
        case Hls.ErrorTypes.MEDIA_ERROR: {
          console.log(data)
          switch(data.details) {
            case Hls.ErrorDetails.BUFFER_STALLED_ERROR: {
              messageApi.warning({ content: '视频加载缓慢', duration: 5 })
              return
            }
            default: {
              // messageApi.error({ content: '播放错误' })
              return
            }
          }
        }
        default: {
          messageApi.error({ content: '未知错误', key: 'video-loading' })
        }
      }
    })
    return () => {
      // 组建更新需要销毁hls实例
      hls.destroy()
    }
  }, [url, messageApi])
  const handleCanPlay = (e: SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.play()
  }
  return (
    <>
      { contextHolder }
      <div className='w-full h-full relative'>
        <video ref={videoRef} onCanPlay={handleCanPlay} controls className='z-10 w-full h-full absolute inset-0 rounded-lg bg-black outline-none overflow-hidden'></video>
      </div>
    </>
  )
}
