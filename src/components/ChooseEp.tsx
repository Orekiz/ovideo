import { EP } from '@/typings'

interface ChooseEpDto {
  eps: EP[] | undefined,
  chooseEvent: (choose: number) => void,
  epChoosed: number
}

export default function ChooseEp({ eps, chooseEvent, epChoosed }: ChooseEpDto) {
  return (
    <>
      <div className="w-full grid grid-cols-4 gap-2">
        {
          eps?.map((ep, index) => {
            return (
              <button className={`my-button font-bold ${epChoosed===index?'my-button-active':''}`} title={ep.title} onClick={() => chooseEvent(index)} key={index}>{ index + 1 }</button>
            )
          })
        }
      </div>
    </>
  )
}
