import { NavLink } from 'react-router-dom'
import { Video, VideoType } from '@/typings'
import '@/assets/vlist.css'

interface VListDto {
  videos: Video[]
}

export default function VList({ videos }: VListDto ) {
  return (
    <>
      <section className='w-full grid grid-cols-6 gap-6 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4'>
        {
          videos?.sort((a, b) => b.updateTimestamp - a.updateTimestamp).map((video) => {
            return (
              <NavLink
                to={`/video/${video.id}/1`}
                key={video.id}
                state={{...video, title: video.name}}
                className='vlist-item transition'
              >
                <picture className='relative'>
                  <img referrerPolicy='no-referrer' src={video.img} alt={video.name} className='w-full rounded-lg aspect-[2/3] object-cover' />
                  <p className='absolute bottom-2 right-2 text-sm p-x-2 rounded-full text-shadow bg-black/50 backdrop-blur-xl'>
                    {
                      video.type === VideoType.EP &&
                      (video.epCount === video.eps?.length ?
                        <span>完结,全{video.epCount}集</span> :
                        <span>更新至{video.eps.length}集</span>)
                    }
                  </p>
                </picture>
              </NavLink>
            )
          })
        }
      </section>
    </>
  )
}
