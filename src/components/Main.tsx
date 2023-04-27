import pkg from "../../package.json"
import { Time, TimeView } from "../types"
import { TimeList } from "./TimeList"
import { atomWithStorage } from "jotai/utils"
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai"

const timesState = atomWithStorage<TimeView[]>("times", [])

const Main: React.FC<{ lang: string }> = ({ lang }) => {
  console.log("render Main")

  const [times, setTimes] = useAtom(timesState)

  const handleRecord = () => {
    const item = {
      id: "time_" + Date.now(),
      time: new Date()
    }
    setTimes(times => times.concat([item]))
  }


  const handleOnclickDel = (time: TimeView) => {
    setTimes(times.filter((i) => i.id !== time.id))
  }

  return (
    <div className="App p-5">
      <h1 className="text-3xl p-1 text-center" id="title">
        time record
      </h1>
      <span>ver {pkg.version}</span>

      <TimeList timesView={times} onClickDel={handleOnclickDel}></TimeList>

      <button id="clear-all-hinmoku-btn" className="bg-red-900 p-2 m-1 rounded " onClick={handleRecord}>
        record
      </button>
      <div className="three wide column text-left mt-5">© 2023</div>
    </div>
  )
}

export default Main
