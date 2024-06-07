import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Video } from "../components/VList"
import VideoComp from "../components/Video"
import ChooseEp from "../components/ChooseEp"
import config from "../config"

const videoDetailContainerClassNameBase = 'p-4 w-80 max-md:w-full rounded-lg bg-gray-200 @dark:bg-[rgba(255,255,255,.1)] transition-all'
const videoDetailContainerClassNameCloseSlide = "w-0 h-0 rounded-lg bg-gray-200 @dark:bg-[rgba(255,255,255,.1)] transition-all"

export default function VideoDetail() {
  const location = useLocation()
  const [state, setState] = useState<Video>()
  const [epChoosed, setEpChoosed] = useState<number>(0)
  const [isSlideClosed, setIsSlideClosed] = useState(false)
  const [videoDetailContainerClassName, svdcc] = useState(videoDetailContainerClassNameBase)
  const handleSetEp = (choose: number) => {
    setEpChoosed(choose)
  }
  const handleToggleSlide = () => {
    if (!isSlideClosed) {
      svdcc(videoDetailContainerClassNameCloseSlide)
    } else {
      svdcc(videoDetailContainerClassNameBase)
    }
    setIsSlideClosed(!isSlideClosed)
  }
  useEffect(() => {
    console.log(location)
    setState(location.state)
  }, [location])
  return (
    <div className="h-full py-4 grid grid-rows-[auto_1fr]">
      <div>
        <Link to="/" className="text-xl font-bold">{config.TITLE}</Link>
      </div>
      <div className="pt-4 flex gap-4 max-md:flex-col transition-all md:overflow-hidden">
        <section className="md:flex-1 flex max-md:h-50vh">
          <VideoComp url={state?.eps[epChoosed].url} />
          <div
            className={`${isSlideClosed?'':'hidden!'} w-2 h-full ml-1 font-bold flex justify-center items-center cursor-pointer rounded-full hover:bg-violet-4`}
            onClick={handleToggleSlide}
          >
            &lt;
          </div>
        </section>
        <section className={videoDetailContainerClassName}>
          <h2 className="font-bold">{state?.name}</h2>
          <p className="text-sub">
            { 
              state?.tags.map((tag, index) => {
                return <span key={index}>{index>0?' · ':''}{tag}</span>
              })
            }
            <p>全{ state?.epCount }集</p>
          </p>
          <p className="mt-4">正在播放：{state?.eps[epChoosed].title}</p>
          <div className="mt-4">
            <ChooseEp eps={state?.eps} epChoosed={epChoosed} chooseEvent={handleSetEp} />
          </div>
          <div className="my-4">
            <button className="my-button font-bold max-md:hidden" onClick={handleToggleSlide}>关闭侧栏</button>
          </div>
        </section>
      </div>
      <div className="pt-2 m-auto max-w-5xl">
        <p className="text-center text-sub font-light">声明：本站为非盈利性站点，仅供WEB在线展示学习交流，拒绝一切商业行为，否者后果自负！所涉及资源均来源于互联网，本站不提供任何视频资源存储，也不参与录制和上传。若无意侵犯了您的权利，请与我们取得联系，我们会第一时间核实和处理，谢谢！</p>
      </div>
    </div>
  )
}
