import { useEffect, useState } from "react"
import { Link, useLocation, Outlet, useNavigate, useParams } from "react-router-dom"
import { Video, VideoArea } from "@/typings"
import { VideoCompDto } from "../components/Video"
import ChooseEp from "../components/ChooseEp"
import config from "../config"
import { setTitle } from "@/utils"
import videodataState from "@/utils/videodata.state"

const videoDetailContainerClassNameBase = 'p-4 w-80 max-md:w-full rounded-lg bg-gray-200 @dark:bg-[rgba(255,255,255,.1)] transition-all'
const videoDetailContainerClassNameCloseSlide = "w-0 h-0 rounded-lg bg-gray-200 @dark:bg-[rgba(255,255,255,.1)] transition-all"
export default function VideoDetail() {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState<Video>()
  const [videoKeywords, setVideoKeywords] = useState<string[]>([])
  const [epChoosed, setEpChoosed] = useState<number>(0)
  const [isSlideClosed, setIsSlideClosed] = useState(false)
  const [videoDetailContainerClassName, svdcc] = useState(videoDetailContainerClassNameBase)
  const handleChooseEp = (choose: number) => {
    setEpChoosed(choose)
    navigate(`/video/${location.state.id}/${choose+1}`, {state:location.state})
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
    // 直接进路由会没有state
    if (location.state) {
      console.log(location)
      setTitle(`${location.state.name} | ${config.TITLE}`)
      setState(location.state)
      setVideoKeywords([VideoArea[location.state.area], location.state.year, ...location.state.tags])
    } else {
      console.log(params)
      ;(async()=> {
        const state = await videodataState.getVideoInfo(params.id!)
        setTitle(`${state.name} | ${config.TITLE}`)
        setState(state)
        setEpChoosed(parseInt(params.ep!) - 1)
        setVideoKeywords([VideoArea[state.area], state.year, ...state.tags])
      })()
    }
  }, [location, params])
  return (
    <div className="h-full py-4 grid grid-rows-[auto_1fr]">
      <div>
        <Link to="/" className="text-xl font-bold">{config.TITLE}</Link>
      </div>
      <div className="pt-4 flex gap-4 max-md:flex-col transition-all md:overflow-hidden">
        <section className="md:flex-1 flex max-md:h-50vh">
          {/* <VideoComp url={state?.eps[epChoosed].url} type={state?.eps[epChoosed].type} /> */}
          <Outlet context={{type:state?.eps[epChoosed].type, url:state?.eps[epChoosed].url} satisfies VideoCompDto}></Outlet>
          <div
            className={`${isSlideClosed?'':'hidden!'} w-2 h-full ml-1 font-bold flex justify-center items-center cursor-pointer rounded-full hover:bg-violet-4`}
            onClick={handleToggleSlide}
          >
            &lt;
          </div>
        </section>
        <section className={videoDetailContainerClassName}>
          <h2 className="font-bold">{state?.name}</h2>
          <section className="text-sub">
            <p>
              {
                videoKeywords.map((tag, index) => {
                  return <span key={index}>{index>0?' · ':''}{tag}</span>
                })
              }
            </p>
            <p>全{ state?.epCount }集</p>
          </section>
          <p className="mt-4">正在播放：{state?.eps[epChoosed].title}</p>
          <div className="mt-4">
            <ChooseEp eps={state?.eps} epChoosed={epChoosed} chooseEvent={handleChooseEp} />
          </div>
          <div className="my-4">
            <button className="my-button font-bold max-md:hidden" onClick={handleToggleSlide}>关闭侧栏</button>
          </div>
        </section>
      </div>
      <div className="pt-2 m-auto max-w-5xl">
        <p className="text-center text-sub text-sm font-light">声明：本站为非盈利性站点，仅供WEB在线展示学习交流，拒绝一切商业行为，否者后果自负！所涉及资源均来源于互联网，本站不提供任何视频资源存储，也不参与录制和上传。若无意侵犯了您的权利，请与我们取得联系<a href="mailto:hurricane_233@163.com" className="underline">@Oreki</a>，我们会第一时间核实和处理，谢谢！</p>
      </div>
    </div>
  )
}
