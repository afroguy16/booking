import { ListItem, UnorderedList } from "@chakra-ui/react";
import { useMemo } from "react";

import { BookCallPropsI } from "../../../interfaces";
import generateHourString from "./utils/generate-hour-string";

const BookCall = (props: BookCallPropsI) => {
  const { unavailableTimeSlots } = props;

  // Generate the 24 hour day time slot - this could be move to its own utility for a cleaner component
  const dailyTimeSlot: Array<string> = useMemo(() => {
    let timeSlots = new Array(24);
    for (let i = 0; i < 24; i++) {
      timeSlots[i] = generateHourString(i);
    }
    return timeSlots;
  }, []);

  // Create an hash from the unavailable time slot so that search can be (O)1
  const hashedUnavailableTimeSlots = useMemo(() => {
    const hash: { [key: string]: string } = {};
    unavailableTimeSlots.forEach((timeSlot) => {
      hash[timeSlot] = timeSlot;
    });
    return hash;
  }, [unavailableTimeSlots]);

  const isTimeTaken = (hour: string) =>
    hashedUnavailableTimeSlots[hour] !== undefined;

  const dailyTimeSlotElements = useMemo(
    () =>
      dailyTimeSlot.map((timeSlot) => (
        <ListItem
          role={"option"}
          key={timeSlot}
          className={isTimeTaken(timeSlot) ? "unavailable" : ""}
        >
          {timeSlot}
        </ListItem>
      )),
    [dailyTimeSlot]
  );

  return <UnorderedList>{dailyTimeSlotElements}</UnorderedList>;
};

export default BookCall;
