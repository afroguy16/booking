import { HoursT } from "./types"

export interface SelectTimePayloadI {
  time: string;
  availability: boolean;
}

export interface ScheduleMeetingPayloadI {
  date: string;
  time: string;
  reason: string;
}

export interface ScheduleMeetingErrorI {
  path: string
  message: string
}

export interface UseBookReturnPayloadI {
  bookedTimeSlots: Array<HoursT>;
  error: string;
  isSuccessful: boolean;
  isLoading: boolean;
  onSelectDate: (date: string) => void;
  onSetError: (error: ScheduleMeetingErrorI) => void;
  onClearError: () => void;
  onClearSuccess: () => void;
  onSetBooking: (payload: ScheduleMeetingPayloadI) => void;
}

export interface SelectDatePropsI {
  onSelectDate: (formattedDate: string) => void
  onClearMessages: () => void
}

export interface BookCallPropsI { // TODO - rename this
  isLoading: boolean;
  unavailableTimeSlots: Array<HoursT>
  onSelectTimeSlot: (payload: SelectTimePayloadI) => void;
  onSendError: (error: ScheduleMeetingErrorI) => void;
  onClearMessages: () => void;
}

export interface ConfirmMeetingPropsI {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onConfirmBooking: (reason: string) => void
}
