import { HoursT } from "./types"

export interface SelectDatePropsI {
  onSelectDate: (formattedDate: string) => void
  onClearMessages: () => void
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
  onClearMessages: () => void;
}

export interface UseBookReturnPayloadI {
  bookedTimeSlots: Array<HoursT>;
  error: string;
  isSuccessful: boolean;
  isLoading: boolean;
  onSelectDate: () => void;
  onSetError: () => void;
  onClearError: () => void;
  onClearSuccess: () => void;
  onSetBooking: () => void;
}
