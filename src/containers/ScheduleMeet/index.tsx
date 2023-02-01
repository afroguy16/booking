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

import useBook from "./hooks/use-book";
import SelectTime from "./components/SelectTime";
import SelectDate from "./components/SelectDate";
import { SUCCESS_MESSAGE } from "./constants";
import { SelectTimePayloadI } from "./interfaces";

const ScheduleMeet = () => {
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

  const onClearMessage = () => {
    if (error) {
      return onClearError();
    }
    onClearSuccess();
  };

  const onSelectDateHandler = (date: string) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const onSetBookingHandler = (payload: SelectTimePayloadI) => {
    console.log(`${selectedDate}:${payload.time}`);
    onSetBooking({
      date: `${selectedDate}:${payload.time}`,
      reason: payload.reason,
    });
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
          onBookCall={onSetBookingHandler}
          onSendError={onSetError}
          onClearMessages={onClearMessage}
        />
      </Box>
    </Box>
  );
};

export default ScheduleMeet;
