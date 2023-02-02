import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

import { SUCCESS_MESSAGE } from "./constants";
import useBook from "./hooks/use-book";
import SelectDate from "./components/SelectDate";
import SelectTime from "./components/SelectTime";
import ConfirmMeeting from "./components/ConfirmMeeting";
import { SelectTimePayloadI } from "./interfaces";
import { ERROR_TIME_SLOT_UNAVAILABLE } from "./components/SelectTime/constants";
import {
  alertMessageCloseButtonStyles,
  alertMessageStyles,
  errorWrapperStyles,
  headingStyles,
  scheduleMeetingWrapperStyles,
  slotSelectorsStyles,
} from "./styles";

const ScheduleMeeting = () => {
  const {
    selectedDateBookedTimeSlots,
    error,
    isSuccessful,
    isLoading,
    onSelectDate,
    onSetError,
    onClearError,
    onClearSuccess,
    onSetBooking,
  } = useBook();

  const hasMessage = !!error || isSuccessful;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<SelectTimePayloadI>({
    time: "",
    availability: false,
  });
  const [activeConfirmMeetingModal, setActiveConfirmMeeting] = useState(false);

  const onClearMessage = () => {
    if (error) {
      return onClearError();
    }
    onClearSuccess();
  };

  const onConfirmBookingHandler = (reason: string) => {
    // TODO - A better UX would be to disable the slots, so they aren't clickable
    if (!selectedTimeSlot.availability) {
      return onSetError({
        path: "ConfirmMeeting",
        message: ERROR_TIME_SLOT_UNAVAILABLE,
      });
    }
    onSetBooking({ date: selectedDate, time: selectedTimeSlot.time, reason });
    setActiveConfirmMeeting(false);
  };

  const onSelectDateHandler = (date: string) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const onSelectTimeSlotHandler = (payload: SelectTimePayloadI) => {
    setSelectedTimeSlot(payload);
    setActiveConfirmMeeting(true);
  };

  return (
    <Box sx={scheduleMeetingWrapperStyles}>
      {hasMessage && (
        <Flex sx={errorWrapperStyles}>
          <Alert
            sx={alertMessageStyles}
            status={!!error ? "error" : "success"}
            borderRadius={"4px"}
            role={!!error ? "error" : "success"}
          >
            <Flex flexDirection="row">
              <AlertIcon />
              <Box>
                <AlertTitle>{!!error ? "Error" : "Success"}</AlertTitle>
                <AlertDescription>
                  {!!error ? <p>{error}</p> : <p>{SUCCESS_MESSAGE}</p>}
                </AlertDescription>
              </Box>
            </Flex>
            <CloseButton
              sx={alertMessageCloseButtonStyles}
              onClick={onClearMessage}
            />
          </Alert>
        </Flex>
      )}

      <Heading sx={headingStyles}>Book a date and time slot</Heading>
      <Flex sx={slotSelectorsStyles}>
        <SelectDate
          onSelectDate={onSelectDateHandler}
          onClearMessages={onClearMessage}
        />
        <SelectTime
          isLoading={isLoading}
          unavailableTimeSlots={selectedDateBookedTimeSlots}
          onSelectTimeSlot={onSelectTimeSlotHandler}
          onSendError={onSetError}
          onClearMessages={onClearMessage}
        />
      </Flex>

      <ConfirmMeeting
        isOpen={activeConfirmMeetingModal}
        isLoading={isLoading}
        onClose={() => setActiveConfirmMeeting(false)}
        onConfirmMeeting={onConfirmBookingHandler}
      />
    </Box>
  );
};

export default ScheduleMeeting;
