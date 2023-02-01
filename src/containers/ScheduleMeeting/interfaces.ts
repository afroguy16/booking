import { HoursT } from "./types"

export interface SelectDatePropsI {
  onSelectDate: (formattedDate: string) => void
  onClearMessages: () => void
}

export interface SelectTimePayloadI {
  time: string;
  reason: string;
}

export interface ScheduleMeetingPayloadI {
  date: string;
  reason: string;
}

export interface ScheduleMeetingErrorI {
  path: string
  message: string
}

export interface BookCallPropsI {
  isLoading: boolean;
  unavailableTimeSlots: Array<HoursT>
  onSelectTimeSlot: (time: string) => void;
  onSendError: (error: ScheduleMeetingErrorI) => void;
  onClearMessages: () => void;
}

export interface ConfirmMeetingPropsI {
  isLoading: boolean
  onConfirmBooking: (reason: string) => void
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
