import { HourT } from "./types"

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

export interface MentorAttributesI {
  name: string,
  time_zone: string
}

export interface MentorScheduleAttributesI {
  date: string,
  timeCollection: Array<HourT>
}

export interface MentorScheduleResponsePayloadI {
  mentor: MentorAttributesI,
  calendar: Array<{ date_time: string }>
}

export interface MentorScheduleCollectionI {
  mentor: MentorAttributesI,
  schedule: { [key: string]: Array<HourT> }
}

export interface UseBookReturnPayloadI {
  selectedDateBookedTimeSlots: Array<HourT>;
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

export interface SelectTimePropsI {
  isLoading: boolean;
  unavailableTimeSlots: Array<HourT>;
  selectedDate: string;
  onConfirmTimeSlot: (payload: SelectTimePayloadI) => void;
  onSendError: (error: ScheduleMeetingErrorI) => void;
  onClearMessages: () => void;
}

export interface ConfirmMeetingPropsI {
  isOpen: boolean
  isLoading: boolean
  isSuccessful?: boolean
  onClose: () => void
  onConfirmMeeting: (reason: string) => void
}
