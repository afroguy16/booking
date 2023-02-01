import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

import { SUCCESS_MESSAGE } from "./constants";
import useBook from "./hooks/use-book";
import SelectDate from "./components/SelectDate";
import SelectTime from "./components/SelectTime";
import ConfirmMeeting from "./components/ConfirmMeeting";
import { SelectTimePayloadI } from "./interfaces";
import { ERROR_TIME_SLOT_UNAVAILABLE } from "./components/SelectTime/constants";

const ScheduleMeeting = () => {
  const {
    bookedTimeSlots,
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
    <Box paddingTop={"20px"}>
      {hasMessage && (
        <Flex justifyContent={"center"} marginBottom={"20px"}>
          <Alert
            status={!!error ? "error" : "success"}
            borderRadius={"4px"}
            width="50%"
            flexDirection="row"
            justifyContent="space-between"
            role={!!error ? "error" : "success"}
          >
            <Flex flexDirection="row">
              <AlertIcon />
              <Box>
                <AlertTitle>{!!error ? "Error" : "Success"}</AlertTitle>
                <AlertDescription>
                  {!!error ? error : SUCCESS_MESSAGE}
                </AlertDescription>
              </Box>
            </Flex>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClearMessage}
            />
          </Alert>
        </Flex>
      )}

      <Box>
        <SelectDate
          onSelectDate={onSelectDateHandler}
          onClearMessages={onClearMessage}
        />
        <SelectTime
          isLoading={isLoading}
          unavailableTimeSlots={bookedTimeSlots}
          onSelectTimeSlot={onSelectTimeSlotHandler}
          onSendError={onSetError}
          onClearMessages={onClearMessage}
        />
      </Box>

      <ConfirmMeeting
        isOpen={activeConfirmMeetingModal}
        isLoading={isLoading}
        onClose={() => setActiveConfirmMeeting(false)}
        onConfirmBooking={onConfirmBookingHandler}
      />
    </Box>
  );
};

export default ScheduleMeeting;
