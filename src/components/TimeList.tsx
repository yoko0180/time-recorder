import { TimeView } from "../types"
import { TimeLabel } from "./Labels"

export const TimeList: React.FC<{
  timesView: TimeView[]
  onClickDel: (time: TimeView) => void
}> = ({ timesView, onClickDel }) => (
  <div id="shops-list" className="border rounded my-2 py-2">
    <div className="p-2 flex justify-between">
      <span>時刻一覧</span>
    </div>
    {timesView.map((time) => {
      return (
        <div key={time.id} className="m-2 border rounded ">
          <button className="bg-red-900 p-2 m-1 rounded " onClick={() => onClickDel(time)}>
            del
          </button>
          <TimeLabel time={time.time}></TimeLabel>
        </div>
      )
    })}
  </div>
)
