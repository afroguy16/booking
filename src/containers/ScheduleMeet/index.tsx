import { Box } from "@chakra-ui/react";
import BookCall from "./components/BookCall";
import SelectDate from "./components/SelectDate";

const ScheduleMeet = () => (
  <Box>
    <SelectDate onSelectDate={() => {}} />
    <BookCall unavailableTimeSlots={[]} />
  </Box>
);

export default ScheduleMeet;
