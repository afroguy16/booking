import { Box, Button, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";

import { BookCallPropsI } from "../../interfaces";

import generate24HourTimeString from "./utils/generate-24-hour-time-string";

const SelectTime = (props: BookCallPropsI) => {
  const { unavailableTimeSlots, onSelectTimeSlot, onClearMessages } = props;
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const isTimeSlotSelected = selectedTimeSlot !== "";
  const dailyTimeSlot = [...generate24HourTimeString];

  // Create an hash from the unavailable time slot so that the search can be (O)1
  const hashedUnavailableTimeSlots = useMemo(() => {
    const hash: { [key: string]: string } = {};
    unavailableTimeSlots.forEach((timeSlot) => {
      // This check is unlikely, but it ensures that there are no duplicates
      if (hash[timeSlot] === undefined) {
        hash[timeSlot] = timeSlot;
      }
    });
    return hash;
  }, [unavailableTimeSlots]);

  const isTimeTaken = useCallback(
    (hour: string) => hashedUnavailableTimeSlots[hour] !== undefined,
    [hashedUnavailableTimeSlots]
  );

  const isSelectedTimeSlot = useCallback(
    (hour: string) => selectedTimeSlot === hour,
    [selectedTimeSlot]
  );

  const onSelectTimeSlotHandler = useCallback(
    (timeSlot: string) => {
      setSelectedTimeSlot(timeSlot);
      onClearMessages();
    },
    [onClearMessages]
  );

  const dailyTimeSlotElements = useMemo(
    () =>
      dailyTimeSlot.map((timeSlot) => (
        <ListItem
          role={"option"}
          aria-label="select time slot"
          key={timeSlot}
          className={[
            isTimeTaken(timeSlot) ? "unavailable" : "",
            isSelectedTimeSlot(timeSlot) ? "active" : "",
          ]
            .join(" ")
            .trim()}
          onClick={() => onSelectTimeSlotHandler(timeSlot)}
        >
          {timeSlot}
        </ListItem>
      )),
    [dailyTimeSlot, isTimeTaken, isSelectedTimeSlot, onSelectTimeSlotHandler]
  );

  return (
    <Box>
      <UnorderedList>{dailyTimeSlotElements}</UnorderedList>
      <Stack direction="row" spacing={4}>
        <Button
          variant="outline"
          colorScheme="teal"
          isDisabled={!isTimeSlotSelected}
          onClick={() => onSelectTimeSlotHandler("")}
        >
          Clear time slot
        </Button>
        <Button
          variant="solid"
          colorScheme="teal"
          isDisabled={!isTimeSlotSelected}
          onClick={() =>
            onSelectTimeSlot({
              time: selectedTimeSlot,
              availability: !isTimeTaken(selectedTimeSlot),
            })
          }
        >
          Select time slot
        </Button>
      </Stack>
    </Box>
  );
};

export default SelectTime;
