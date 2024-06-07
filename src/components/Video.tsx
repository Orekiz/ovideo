import config from '../config/video'
import { EPType } from '@/typings'

function getVideoSrc(url: string) {
  return `${config.VIDEO_PARSER_URL}?url=${url}`
}

interface VideoCompDto {
  url?: string,
  type?: number,
}

export default function VideoComp({ type, url = '' }: VideoCompDto) {
  switch(type) {
    case EPType.parse: {
      return <iframe className="border-none bg-black rounded-lg"
        src={getVideoSrc(url)}
        allowFullScreen={true}
        width="100%"
        height="100%"
        />
    }
    case EPType.m3u8: {
      return <video controls className='w-full h-full rounded-lg bg-black'></video>
    }
    default: {
      return <></>
    }
  }
}
