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
import { useEffect, useState } from "react";
import { ConfirmMeetingPropsI } from "../../interfaces";
import { MINIMUM_REASON_CHAR_LENGTH } from "../SelectTime/constants";

const ConfirmMeeting = ({
  isOpen,
  isLoading,
  isSuccessful,
  onClose,
  onConfirmMeeting,
}: ConfirmMeetingPropsI) => {
  const [callReason, setCallReason] = useState("");
  const isValidReason = callReason.length >= MINIMUM_REASON_CHAR_LENGTH;

  // preserve reason until booking is successfully sent
  useEffect(() => {
    setCallReason("");
  }, [isSuccessful]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              defaultValue={callReason}
            />
            <FormHelperText>
              Enter at least {MINIMUM_REASON_CHAR_LENGTH} characters
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" marginRight={"16px"} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={isLoading}
            loadingText="Confirming"
            onClick={() => onConfirmMeeting(callReason)}
            isDisabled={!isValidReason}
          >
            Confirm meeting
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmMeeting;
