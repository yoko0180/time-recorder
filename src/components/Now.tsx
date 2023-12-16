import { format, parseISO } from "date-fns"
import { NowStylePattern, Time } from "../types"
import { useEffect, useState } from "react"
import { ja } from "date-fns/locale"
export const Now: React.FC<{
  stylePattern: NowStylePattern
  onClick: React.MouseEventHandler
}> = ({ stylePattern, onClick }) => {
  const _format = (time: Time, formatStyle: string) => {
    if (!time) return ""
    if (typeof time === "string") time = parseISO(time)
    try {
      return format(time, formatStyle, { locale: ja })
    } catch (error) {
      console.error("df.format error", error)
      return ""
    }
  }

  const [now, setNow] = useState(new Date())
  useEffect(() => {
    // let timeoutId
    const updateNow = () => {
      setNow(new Date())
      setTimeout(updateNow, 1000)
    }
    updateNow()
    // return () => {
    //   clearTimeout(timeoutId)
    // }
  }, [])

  return (
    <div id="now" className="w-full  m-0 p-0" onClick={onClick}>
      {stylePattern === "style1" && (
        <div className="text-center" style={{ fontSize: "2em" }}>
          {_format(now, "MM/dd eee HH:mm:ss")}
        </div>
      )}
      {stylePattern === "style2" && (
        <div className="mt-8">
          <div className="date" style={{ fontSize: "6vmin" }}>{_format(now, "yyyy/MM/dd eee")}</div>
          <div className="time text-center" style={{ fontSize: "20vmin" }}>
            {_format(now, "HH:mm:ss")}
          </div>
        </div>
      )}
    </div>
  )
}
