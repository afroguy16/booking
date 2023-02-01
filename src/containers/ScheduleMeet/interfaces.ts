import { HoursT } from "./types"

export interface SelectDatePropsI {
  onSelectDate: (formattedDate: string) => void
  onClearMessages: () => void
}

export interface BookCallPayloadI {
  time: string;
  reason: string;
}

export interface ScheduleMeetPayloadI {
  date: string;
  reason: string;
}

export interface BookCallErrorI {
  message: string
}

export interface BookCallPropsI {
  isLoading: boolean,
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
  onSelectDate: (date: string) => void;
  onSetError: (payload: BookCallErrorI) => void;
  onClearError: () => void;
  onClearSuccess: () => void;
  onSetBooking: (payload: ScheduleMeetPayloadI) => void; //Fix naming ScheduleMeet and BookCall
}
