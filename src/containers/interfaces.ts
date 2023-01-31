import { HoursT } from "./types"

export interface SelectDatePropsI {
  onSelectDate: (formattedDate: string) => void
  onClearError: () => void
}

export interface BookCallPayloadI {
  time: string;
  reason: string;
}

export interface BookCallErrorI {
  message: string
}

export interface BookCallPropsI {
  unavailableTimeSlots: Array<HoursT>
  onBookCall: (payload: BookCallPayloadI) => void;
  onSendError: (payload: BookCallErrorI) => void;
  onClearError: () => void;
}
