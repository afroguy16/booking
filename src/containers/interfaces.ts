import { HoursT } from "./types"

export interface SelectDatePropsI {
  onSelectDate: (formattedDate: string) => void
}

export interface BookCallPayloadI {
  time: string;
  reason: string;
}

export interface BookCallPropsI {
  unavailableTimeSlots: Array<HoursT>
  onBookCall: (payload: BookCallPayloadI) => void;
}
