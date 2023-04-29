export type Time = Date | string | null
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type UseState<T> = [T, SetState<T>]
export type TimeView = {
  id: string
  time: Time
}
export type NowStylePattern = "style1" | "style2"
