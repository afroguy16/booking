import { UseBookReturnPayloadI } from "../../interfaces";

const useBook = (): UseBookReturnPayloadI => ({
  bookedTimeSlots: [],
  error: "",
  isSuccessful: false,
  isLoading: false,
  onSelectDate: () => { },
  onSetError: () => { },
  onClearError: () => { },
  onClearSuccess: () => { },
  onSetBooking: () => { }
})

export default useBook;
