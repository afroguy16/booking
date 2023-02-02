import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import format from "date-fns/format";

import { SUCCESS_MESSAGE } from "./constants";
import useScheduleMeeting from "./service/use-schedule-meeting";
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
  } = useScheduleMeeting();

  const hasMessage = !!error || isSuccessful;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<SelectTimePayloadI>({
    time: "",
    availability: false,
  });
  const [activeConfirmMeetingModal, setActiveConfirmMeeting] = useState(false);

  useEffect(() => {
    // A state machine flow will make sense if the changes views are complex
    if (isSuccessful) {
      setActiveConfirmMeeting(false);
    }
  }, [isSuccessful]);

  const getFormattedDate = useMemo(() => {
    if (selectedDate && selectedTimeSlot.time) {
      return format(
        new Date(`${selectedDate}:${selectedTimeSlot.time}`),
        "PPPPp"
      );
    }
    return "";
  }, [selectedDate, selectedTimeSlot.time]);

  const onClearMessage = () => {
    if (error) {
      return onClearError();
    }
    onClearSuccess();
  };

  const onConfirmBookingHandler = (reason: string) => {
    onSetBooking({ date: selectedDate, time: selectedTimeSlot.time, reason });
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
                  {!!error ? (
                    <Text>{error}</Text>
                  ) : (
                    <Text>
                      {SUCCESS_MESSAGE} for {getFormattedDate}
                    </Text>
                  )}
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
          selectedDate={selectedDate}
          onConfirmTimeSlot={onSelectTimeSlotHandler}
          onSendError={onSetError}
          onClearMessages={onClearMessage}
        />
      </Flex>

      {/* Preserve call reason, until successfully submitted */}
      {!isSuccessful && (
        <ConfirmMeeting
          isOpen={activeConfirmMeetingModal}
          isLoading={isLoading}
          onClose={() => setActiveConfirmMeeting(false)}
          onConfirmMeeting={onConfirmBookingHandler}
        />
      )}
    </Box>
  );
};

export default ScheduleMeeting;
