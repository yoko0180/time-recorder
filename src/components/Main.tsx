import pkg from "../../package.json"
import { NowStylePattern, Time, TimeView } from "../types"
import { TimeList } from "./TimeList"
import { atomWithStorage } from "jotai/utils"
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai"
import { Now } from "./Now"

export const timesState = atomWithStorage<TimeView[]>("times", [])
export const nowStyleState = atomWithStorage<NowStylePattern>("nowStyle", "style1")
// 追加モーションのためのフラグ
// タイマーでフラグ倒して非表示にすることで一時的なハイライト表示に利用
// 一時的にtrueにすることで常時表示させてCSS調整などする
export const addedFlgState = atom(false) 

const Main: React.FC<{ lang: string }> = ({ lang }) => {
  console.log("render Main")

  const [times, setTimes] = useAtom(timesState)
  const [nowStyle , setNowStyle] = useAtom(nowStyleState)
  const [addedFlg , setAddedFlg] = useAtom(addedFlgState)

  const handleRecord = () => {
    const item = {
      id: "time_" + Date.now(),
      time: new Date(),
    }
    setTimes((times) => times.concat([item]))

    setAddedFlg(true)
    setTimeout(() => {
      setAddedFlg(false)
    }, 2000);
  }

  const handleOnclickDel = (time: TimeView) => {
    setTimes(times.filter((i) => i.id !== time.id))
  }

  const handleOnclickNow = () => {
    if (nowStyle === "style1") setNowStyle("style2")
    if (nowStyle === "style2") setNowStyle("style1")
  }

  return (
    <div className="App p-5">
      <div id="title" className="flex items-center text-xs">
        <h1 className="p-1 text-center" >
          タイムレコーダー
        </h1>
        <span>ver {pkg.version}</span>
      </div>
      <Now stylePattern={nowStyle} onClick={handleOnclickNow}></Now>
      <TimeList timesView={times} onClickDel={handleOnclickDel}></TimeList>

      <button id="btn-record" className="bg-red-900 p-2 m-1 rounded w-full" onClick={handleRecord}>
        打刻
      </button>
      <div className="three wide column text-left mt-5">© 2023</div>
    </div>
  )
}

export default Main
