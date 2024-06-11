import { NavLink } from 'react-router-dom'
import { Video } from '@/typings'
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
              <NavLink to={`video/${video.id}/1`} key={video.id} state={{...video, title: video.name}}>
                <img referrerPolicy='no-referrer' src={video.img} alt={video.name} className='w-full rounded-lg aspect-[2/3] object-cover' />
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
