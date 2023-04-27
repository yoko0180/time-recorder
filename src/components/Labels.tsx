import { format } from "date-fns"
import { Time } from "../types"

export const TimeLabel: React.FC<{
  time: Time
}> = ({ time }) => {
  if (!time) {
    return <></>
  }

  const _format = (time: Time, formatStyle: string) => {
    if (!time) return ""
    try {
      return format(time, formatStyle)
    } catch (error) {
      console.error("df.format error", error)
      return ""
    }
  }
  return (
    <>
      {time !== undefined && time !== null ? (
        <>
          {/* <span className="hours-label text-gray-300">{time && _format(time, "MM-dd")}</span>&nbsp; */}
          <span className="hours-label text-2xl">{time && _format(time, "HH:mm")}</span>
        </>
      ) : (
        <span></span>
      )}
    </>
  )
}
