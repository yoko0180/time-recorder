import { format, parseISO } from "date-fns"
import { Time } from "../types"

export const TimeLabel: React.FC<{
  time: Time
  viewDate: boolean
}> = ({ time, viewDate }) => {
  if (!time) {
    return <></>
  }

  const _format = (time: Time, formatStyle: string) => {
    if (!time) return ""
    if (typeof time === "string") time = parseISO(time)
    try {
      return format(time, formatStyle)
    } catch (error) {
      console.error("df.format error", error)
      console.error("value=" ,time)
      return ""
    }
  }

  const formatStyle = viewDate ? "yyyy/MM/dd (E) HH:mm:ss" : "HH:mm:ss"

  return (
    <>
      {time !== undefined && time !== null ? (
        <div className="w-full text-center">
          <span className="text-2xl ">{time && _format(time, formatStyle)}</span>
        </div>
      ) : (
        <span></span>
      )}
    </>
  )
}
