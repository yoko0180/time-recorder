import { useAtom } from "jotai"
import { TimeView } from "../types"
import { TimeLabel } from "./Labels"
import { timesState } from "./Main"

export const TimeList: React.FC<{
  timesView: TimeView[]
  onClickDel: (time: TimeView) => void
}> = ({ timesView, onClickDel }) => {
  const [times, setTimes] = useAtom(timesState)
  const deleteAll = () => {
    setTimes([])
  }

  return (
    <div id="time-list" className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between text-2xl">
        <span>時刻一覧({timesView.length}件)</span>
      </div>
      <button className="bg-red-900 p-2 m-1 rounded " onClick={() => deleteAll()}>
      全件削除
      </button>
      {timesView.map((time) => {
        return (
          <div key={time.id} className="m-2 border rounded flex items-center ">
            <button className="bg-red-900 p-2 m-1 rounded w-1/3" onClick={() => onClickDel(time)}>
              削除
            </button>
            <TimeLabel time={time.time}></TimeLabel>
          </div>
        )
      })}
    </div>
  )
}
