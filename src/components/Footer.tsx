import config from '@/config'

export default function Footer() {
  return (
    <footer className="pt-4 pb-1 m-auto max-w-5xl grid gap-4 grid-cols-[repeat(2,auto)] max-sm:grid-cols-1 text-center text-sub text-xs font-light">
      <p>声明：本站为非盈利性站点，仅供WEB在线展示学习交流，拒绝一切商业行为，否者后果自负！所涉及资源均来源于互联网，本站不提供任何视频资源存储，也不参与录制和上传。若无意侵犯了您的权利，请与我们取得联系<a href="mailto:hurricane_233@163.com" className="underline">@Oreki</a>，我们会第一时间核实和处理，谢谢！</p>
      <p className="text-sm font-normal flex justify-center items-center">
        { `${config.TITLE}@v${config.VERSION}` } © 2024-present
        <a href="http://github.com/orekiz" target="_blank" rel="noopener noreferrer" className='pl-2 underline hover:text-gray-2'>Oreki</a>
      </p>
    </footer>
  )
}
