import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
  FormHelperText,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { ConfirmMeetingPropsI } from "../../interfaces";
import { MINIMUM_REASON_CHAR_LENGTH } from "../SelectTime/constants";

const ConfirmMeeting = ({
  isLoading,
  onConfirmBooking,
}: ConfirmMeetingPropsI) => {
  const [selectedTimeSlotActivated, setSelectedTimeSlotActivated] =
    useState(false);
  const [callReason, setCallReason] = useState("");
  const isValidReason = callReason.length >= MINIMUM_REASON_CHAR_LENGTH;

  return (
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
            onClick={() => onConfirmBooking(callReason)}
            isDisabled={!isValidReason}
          >
            {isLoading ? "loading" : "Book call"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmMeeting;
