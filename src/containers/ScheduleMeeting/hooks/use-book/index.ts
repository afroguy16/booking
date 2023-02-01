import { ScheduleMeetingPayloadI, UseBookReturnPayloadI } from "../../interfaces";

const useBook = (): UseBookReturnPayloadI => {
  const onSetBooking = (payload: ScheduleMeetingPayloadI) => {
    console.log(payload)
  }
  return ({
    bookedTimeSlots: [],
    error: "",
    isSuccessful: false,
    isLoading: false,
    onSelectDate: () => { },
    onSetError: () => { },
    onClearError: () => { },
    onClearSuccess: () => { },
    onSetBooking
  })
}

export default useBook;
