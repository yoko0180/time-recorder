import { useSetAtom, useAtomValue } from "jotai"
import { TimeView } from "../types"
import { TimeLabel } from "./Labels"
import { addedFlgState, timesState } from "./Main"
import { useState } from "react"

export const TimeList: React.FC<{
  timesView: TimeView[]
  onClickDel: (time: TimeView) => void
}> = ({ timesView, onClickDel}) => {
  const setTimes = useSetAtom(timesState)
  const addedFlg = useAtomValue(addedFlgState)
  const deleteAll = () => {
    setTimes([])
  }
  const NORMAL_DISPLAY_RANGE_TIME = 6 * 60 * 60 * 1000; // 6時間

  const [viewAll, setViewAll] = useState(false)
  return (
    <div id="time-list" className="border rounded my-2 py-2">
      <div className="p-2 flex justify-between text-2xl">
        <span>時刻一覧({timesView.length}件)</span>
      </div>
      <button className="bg-red-900 p-2 m-1 rounded " onClick={() => deleteAll()}>
        全件削除
      </button>
      <button className="bg-blue-900 p-2 m-1 rounded" onClick={() => setViewAll(!viewAll)}>
        {viewAll ? '一部表示' : '全件表示'}
      </button>
      {addedFlg && (

      <div id="added-flg" className="animate-bounce float-right" >
        打刻!
      </div>

      )}
      {(viewAll ? timesView : timesView.filter(time => {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - NORMAL_DISPLAY_RANGE_TIME);
        return new Date(time.time) > oneDayAgo;
      })).map((time) => {
        return (
          <div key={time.id} className="m-2 border rounded flex items-center ">
            <button className="bg-red-900 p-2 m-1 rounded w-1/3" onClick={() => onClickDel(time)}>
              削除
            </button>
            <TimeLabel time={time.time} viewDate={viewAll}></TimeLabel>
          </div>
        )
      })}
    </div>
  )
}
