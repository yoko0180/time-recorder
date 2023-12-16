import pkg from "../../package.json"
import { NowStylePattern, Time, TimeView } from "../types"
import { TimeList } from "./TimeList"
import { atomWithStorage } from "jotai/utils"
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai"
import { Now } from "./Now"
import { useState } from "react"

export const timesState = atomWithStorage<TimeView[]>("times", [])
export const nowStyleState = atomWithStorage<NowStylePattern>("nowStyle", "style1")
// 追加モーションのためのフラグ
// タイマーでフラグ倒して非表示にすることで一時的なハイライト表示に利用
// 一時的にtrueにすることで常時表示させてCSS調整などする
export const addedFlgState = atom(false) 

/**
 * 配慮ポイント
 * 
 * 
 * 打刻ボタン
 * 
 * ユーザーや端末が多少揺れている状況でも反応しやすくする
 * かつ、ぶれなどで意図せず連続で処理させないようにする
 * 打刻を視覚化エフェクトで例えば２秒間表示させることに合わせて、
 * その時間内はボタンを無効化しておく
 * 
 * [処理方式]
 * buttonタグのdisableを設定しただけではpointerdownイベントを無効化できないので
 * 打刻エフェクト用のフラグを参照してフラグが有効でエフェクト表示させている間は打刻処理をしないよう制御する
 * disabledを設定しないと処理は無効にできていてもボタン表示が反転のようにクリック感がでてしまうので
 * pointerdownイベントの無効化することはできないが設定をする
 * disabledを設定してもボタン表示が無効とわかる視覚表現がされないのでそれ用のcss設定もする
 */
const Main: React.FC<{ lang: string }> = ({ lang }) => {
  console.log("render Main")

  const [times, setTimes] = useAtom(timesState)
  const [nowStyle , setNowStyle] = useAtom(nowStyleState)
  const [addedFlg , setAddedFlg] = useAtom(addedFlgState)

  const [timeoutid , setTimeoutid] = useState<NodeJS.Timeout>()

  const handleRecord = () => {
    // 打刻処理しましたエフェクト表示中は処理をしない
    if (addedFlg) return

    const item = {
      id: "time_" + Date.now(),
      time: new Date(),
    }
    setTimes((times) => times.concat([item]))

    if (timeoutid) clearTimeout(timeoutid)
    setAddedFlg(true)
    const t = setTimeout(() => {
      setAddedFlg(false)
    }, 2000);
    setTimeoutid(t)
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

      <button id="btn-record"
        disabled={addedFlg}
        className={"bg-red-900 p-2 m-1 rounded w-full" + (addedFlg ? " disabled" : "")}
        onPointerDown={handleRecord}>
        打刻
      </button>
      <div className="three wide column text-left mt-5">© 2023</div>
    </div>
  )
}

export default Main
