import { ListItem, UnorderedList } from "@chakra-ui/react";
import { useMemo } from "react";

const BookCall = () => {
  const generateHour = (hour: number) => {
    if (hour < 0 || hour > 24) {
      throw new Error("Out of bound. Hour must be withing 0 and 24");
    }

    const formattedHour = hour.toString();

    if (formattedHour.length > 1) {
      return `${hour}:00`;
    }

    return `0${hour}:00`;
  };

  const timeSlots = useMemo(() => {
    let timeSlots = new Array(24);
    for (let i = 0; i < 24; i++) {
      timeSlots[i] = generateHour(i);
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
