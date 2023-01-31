import { HoursT } from "./types"

export interface SelectDatePropsI {
  onSelectDate: (formattedDate: string) => void
}

export interface BookCallPropsI {
  unavailableTimeSlots: Array<HoursT>
}
