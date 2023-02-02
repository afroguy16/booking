import { Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";

import { SelectTimePayloadI, SelectTimePropsI } from "../../interfaces";
import { ctaStyles, timeSlotsStyles, timeSlotStyles } from "./styles";

import generate24HourTimeString from "./utils/generate-24-hour-time-string";

const GENERATED_24_HOUR_TIME_STRING = [...generate24HourTimeString]; // TODO - kill redudundant generate24HourTimeString function

const SelectTime = (props: SelectTimePropsI) => {
  const {
    unavailableTimeSlots,
    selectedDate,
    onConfirmTimeSlot,
    onClearMessages,
  } = props;
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({
    time: "",
    date: "",
  }); // TODO - move this state to parent once selected
  const isTimeSlotSelected = selectedTimeSlot.time !== "";
  const dailyTimeSlot = GENERATED_24_HOUR_TIME_STRING;

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
    (hour: string) => {
      return (
        selectedTimeSlot.time === hour && selectedTimeSlot.date === selectedDate
      );
    },
    [selectedTimeSlot, selectedDate]
  );

  const onSelectTimeSlotHandler = useCallback(
    (timeSlot: string) => {
      setSelectedTimeSlot({ time: timeSlot, date: selectedDate || "" });
      onClearMessages();
    },
    [onClearMessages, selectedDate]
  );

  const onConfirmSelectTimeSlotHandler = (payload: SelectTimePayloadI) => {
    onClearMessages();
    onConfirmTimeSlot(payload);
  };

  const dailyTimeSlotElements = useMemo(
    () =>
      dailyTimeSlot.map((timeSlot) => (
        <ListItem
          sx={timeSlotStyles}
          role={"option"}
          aria-label="confirm time slot"
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
      <UnorderedList sx={timeSlotsStyles}>
        {dailyTimeSlotElements}
      </UnorderedList>
      <Box sx={ctaStyles}>
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
            onConfirmSelectTimeSlotHandler({
              time: selectedTimeSlot.time,
              availability: !isTimeTaken(selectedTimeSlot.time),
            })
          }
        >
          Confirm time slot
        </Button>
      </Box>
    </Box>
  );
};

export default SelectTime;
