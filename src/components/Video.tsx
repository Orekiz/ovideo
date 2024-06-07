import config from '../config/video'

function getVideoSrc(url: string) {
  return `${config.VIDEO_PARSER_URL}?url=${url}`
}

interface VideoCompDto {
  url?: string
}

export default function VideoComp({ url = '' }: VideoCompDto) {
  return(
    <>
      <iframe className="border-none bg-black rounded-lg" src={getVideoSrc(url)} allowFullScreen={true} width="100%" height="100%" />
    </>
  )
}
