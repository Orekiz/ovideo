import { useEffect, useState } from "react"
import { Link, useLocation, Outlet, useNavigate, useParams } from "react-router-dom"
import { Video, VideoArea } from "@/typings"
import { VideoCompDto } from "../components/Video"
import ChooseEp from "../components/ChooseEp"
import config from "../config"
import { setTitle } from "@/utils"
import videodataState from "@/utils/videodata.store"
import Footer from "@/components/Footer"
import {motion} from 'framer-motion'
import { Alert } from 'antd'
import Logo from "@/components/Logo"
import clsx from "clsx"
import '@/assets/video-detail.css'

export default function VideoDetail() {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState<Video>()
  const [videoKeywords, setVideoKeywords] = useState<string[]>([])
  const [epChoosed, setEpChoosed] = useState<number>(0)
  const [isSlideClosed, setIsSlideClosed] = useState(false)
  
  const handleChooseEp = (choose: number) => {
    setEpChoosed(choose)
    console.log('chooseep', choose)
    navigate(`/video/${state?.id}/${choose+1}`, {state})
  }
  const handleToggleSlide = () => {
    setIsSlideClosed(!isSlideClosed)
  }
  useEffect(() => {
    // 直接进路由会没有state
    if (location.state) {
      setEpChoosed(parseInt(params.ep!) - 1)
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
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <div className="pt-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Logo className="text-xl cursor-pointer" />
          </Link>
          {
            isSlideClosed && 
            <motion.p
              animate={{opacity:1}}
              initial={{opacity:0}}
              className="font-bold"
            >
              {state?.name}
            </motion.p>
          }
        </div>
        <div>
          <a href="http://github.com/orekiz/ovideo" target="_blank" rel="noopener noreferrer" className='inline-block i-mdi-github text-2xl text-sub hover:text-gray-2 transition align-middle'></a>
        </div>
      </div>
      <div className={`pt-4 text-nowrap flex ${isSlideClosed?'gap-1':'md:gap-4 gap-2'} max-md:flex-col`}>
        <section className='video-bg md:flex-1 max-md:h-38vh'>
          {/* <VideoComp url={state?.eps[epChoosed].url} type={state?.eps[epChoosed].type} /> */}
          <Outlet context={{type:state?.eps[epChoosed].type, url:state?.eps[epChoosed].url} satisfies VideoCompDto}></Outlet>
        </section>
        <section
          className={clsx('overflow-x-hidden overflow-y-auto',{['w-2 rounded-lg transition-all duration-300']: isSlideClosed}, {['z-0 p-4 w-80 max-md:w-full rounded-lg bg-gray-100 @dark:bg-[rgb(48_48_48)] transition-all']:!isSlideClosed})}
        >
          {
          isSlideClosed?
            (
              <motion.div
                animate={{width: '100%',height:'100%',opacity:.3}}
                className={`opacity-0 hover:opacity-50! font-bold text-xs flex justify-center items-center cursor-pointer rounded-full hover:bg-violet-4`}
                onClick={handleToggleSlide}
                key="slideOpened"
              >
                &lt;
              </motion.div>
            )
            :(
              <motion.div
                animate={{opacity:1}}
                className="opacity-0"
                key="slideClosed"
              >
                {
                  state?.alert !== '' && <Alert message={state?.alert} type="warning" showIcon closable className="mb-2" />
                }
                <h2 className="font-bold">{state?.name}</h2>
                <section className="text-sub">
                  <p>
                    {
                      videoKeywords.map((tag, index) => {
                        return <span key={index}>{index>0?' · ':''}{tag}</span>
                      })
                    }
                  </p>
                  {
                    // 剧集类型的视频显示全多少集
                    state?.type === 0 && <p>全{ state?.epCount }集</p>
                  }
                  <p className="text-sm">更新时间：{ new Date(state?.updateTimestamp?state.updateTimestamp*1000:'').toLocaleDateString() }</p>
                </section>
                <p className="mt-4">正在播放：{state?.eps[epChoosed].title}</p>
                <div className="mt-4">
                  <ChooseEp eps={state?.eps} epChoosed={epChoosed} chooseEvent={handleChooseEp} />
                </div>
                <div className="my-4">
                  <button className="my-button font-bold max-md:hidden" onClick={handleToggleSlide}>关闭侧栏</button>
                </div>
              </motion.div>
            )
        }
        </section>
      </div>
      <Footer />
    </div>
  )
}
