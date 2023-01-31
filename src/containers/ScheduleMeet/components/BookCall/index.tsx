import { ListItem, UnorderedList } from "@chakra-ui/react";
import { useMemo } from "react";
import generateHourString from "./utils/generate-hour-string";

const BookCall = () => {
  const timeSlots = useMemo(() => {
    let timeSlots = new Array(24);
    for (let i = 0; i < 24; i++) {
      timeSlots[i] = generateHourString(i);
    }
    return timeSlots;
  }, []);

  const timeSlotElements = useMemo(
    () =>
      timeSlots.map((timeSlot) => (
        <ListItem role={"option"} key={timeSlot}>
          {timeSlot}
        </ListItem>
      )),
    [timeSlots]
  );

  return <UnorderedList>{timeSlotElements}</UnorderedList>;
};

export default BookCall;
