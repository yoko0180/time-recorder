export type Time = Date | null
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type UseState<T> = [T, SetState<T>]
export type TimeView = {
  id: string
  time: Time
}
