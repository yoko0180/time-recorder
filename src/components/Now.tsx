import { format, parseISO } from "date-fns"
import { Time } from "../types"
import { useEffect, useState } from "react"
import { ja } from "date-fns/locale"
export const Now: React.FC = () => {
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
    let timeoutId
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
    <div id="now" className="w-full text-center">
      <span className="">{_format(now, "MM/dd eee HH:mm:ss")}</span>
    </div>
  )
}
