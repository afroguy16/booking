import { Box } from "@chakra-ui/react";
import useBook from "./hooks/use-book";
import BookCall from "./components/BookCall";
import SelectDate from "./components/SelectDate";

const ScheduleMeet = () => {
  const {
    bookedTimeSlots,
    error,
    isSuccessful,
    isLoading,
    onSelectDate,
    onSetError,
    onClearError,
    onSetBooking,
  } = useBook();

  return (
    <Box>
      <SelectDate onSelectDate={() => {}} onClearMessages={() => {}} />
      <BookCall
        unavailableTimeSlots={bookedTimeSlots}
        onBookCall={() => {}}
        onSendError={() => {}}
        onClearMessages={() => {}}
      />
    </Box>
  );
};

export default ScheduleMeet;
