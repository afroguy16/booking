import {
  Box,
  Button,
  ListItem,
  Stack,
  UnorderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Text,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";

import { BookCallPropsI } from "../../interfaces";
import {
  ERROR_TIME_SLOT_UNAVAILABLE,
  MINIMUM_REASON_CHAR_LENGTH,
} from "./constants";
import generateHourString from "./utils/generate-hour-string";

const BookCall = (props: BookCallPropsI) => {
  const {
    isLoading,
    unavailableTimeSlots,
    onBookCall,
    onSendError,
    onClearMessages,
  } = props;
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const isTimeSlotSelected = selectedTimeSlot !== "";
  const [selectedTimeSlotActivated, setSelectedTimeSlotActivated] =
    useState(false);
  const [callReason, setCallReason] = useState("");
  const isValidReason = callReason.length >= MINIMUM_REASON_CHAR_LENGTH;

  // Generate the 24 hour day time slot - this could be move to its own utility for a cleaner component
  const dailyTimeSlot: Array<string> = useMemo(() => {
    let timeSlots = new Array(24);
    for (let i = 0; i < 24; i++) {
      timeSlots[i] = generateHourString(i);
    }
    return timeSlots;
  }, []);

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

  const onSelectTimeSlot = useCallback(
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
          onClick={() => onSelectTimeSlot(timeSlot)}
        >
          {timeSlot}
        </ListItem>
      )),
    [dailyTimeSlot, isTimeTaken, isSelectedTimeSlot, onSelectTimeSlot]
  );

  const onBookCallHandler = () => {
    if (isTimeTaken(selectedTimeSlot)) {
      return onSendError({ message: ERROR_TIME_SLOT_UNAVAILABLE });
    }
    onBookCall({ time: selectedTimeSlot, reason: callReason });
    setSelectedTimeSlotActivated(false);
  };

  return (
    <Box>
      <UnorderedList>{dailyTimeSlotElements}</UnorderedList>
      <Stack direction="row" spacing={4}>
        <Button
          variant="outline"
          colorScheme="teal"
          isDisabled={!isTimeSlotSelected}
          onClick={() => onSelectTimeSlot("")}
        >
          Clear time slot
        </Button>
        <Button
          variant="solid"
          colorScheme="teal"
          isDisabled={!isTimeSlotSelected}
          onClick={() => setSelectedTimeSlotActivated(true)}
        >
          Select time slot
        </Button>
      </Stack>

      <Modal
        isOpen={selectedTimeSlotActivated}
        onClose={() => setSelectedTimeSlotActivated(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reason for call</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="1rem" fontWeight="bold">
              Try to be as detailed as possible. This would help your mentor
              prepare for the call.
            </Text>
            <FormControl>
              <Textarea
                placeholder="Start typing..."
                onChange={(e) => setCallReason(e.target.value)}
              />
              <FormHelperText>
                Enter at least {MINIMUM_REASON_CHAR_LENGTH} characters
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              marginRight={"16px"}
              onClick={() => setSelectedTimeSlotActivated(false)}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={isLoading}
              onClick={onBookCallHandler}
              isDisabled={!isValidReason}
            >
              {isLoading ? "loading" : "Book call"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BookCall;
