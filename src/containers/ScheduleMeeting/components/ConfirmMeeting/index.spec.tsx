describe("", () => {
  // it("the button should be disabled until the user types a valid reason once the call reason prompt is displayed", async () => {
  //   const user = userEvent.setup();
  //   const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
  //   await user.click(randomAvailableTimeSlot);
  //   const selectButtonElement = screen.getByText(/select time slot/i);
  //   await user.click(selectButtonElement);
  //   const bookCallButtonElement = screen.getByText(/book call/i);
  //   expect(bookCallButtonElement).toBeDisabled();
  // });
  // it("should remove the prompt if the prompt is cancelled once the 'call reason prompt' is displayed", async () => {
  //   const user = userEvent.setup();
  //   const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
  //   await user.click(randomAvailableTimeSlot);
  //   const selectButtonElement = screen.getByText(/select time slot/i);
  //   await user.click(selectButtonElement);
  //   const cancelCallButtonElement = screen.getByText(/cancel/i);
  //   await user.click(cancelCallButtonElement);
  //   const inputFieldElement = screen.getByRole("textbox");
  //   await waitForElementToBeRemoved(inputFieldElement);
  //   expect(inputFieldElement).not.toBeInTheDocument();
  // });
  // it("should should loading if it is loading", async () => {
  //   const user = userEvent.setup();
  //   renderAgain(
  //     <SelectTime
  //       isLoading={true}
  //       unavailableTimeSlots={fakeUnavailableTimeSlots}
  //       onBookCall={mockedOnBookCall}
  //       onSendError={mockedOnSendError}
  //       onClearMessages={mockedOnClearMessages}
  //     />
  //   );
  //   const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
  //   await user.click(randomAvailableTimeSlot);
  //   const selectButtonElement = screen.getByText(/select time slot/i);
  //   await user.click(selectButtonElement);
  //   const loadingText = screen.getByText("loading");
  //   expect(loadingText).toBeInTheDocument();
  //   jest.resetAllMocks();
  // });
  // // TODO - A better UX would be to disable the slots, so they aren't clickable
  // it("should send an error if date that has already been taken is selected", async () => {
  //   const fakeReasonForCall = "Just some random reason for the call";
  //   const user = userEvent.setup();
  //   const randomAvailableTimeSlot = screen.getAllByRole("option").at(2)!; // "02:00" - from the "fakeUnavailableTimeSlots" variable, we can see that "02:00" is already taken.
  //   await user.click(randomAvailableTimeSlot);
  //   const selectButtonElement = screen.getByText(/select time slot/i);
  //   await user.click(selectButtonElement);
  //   const inputFieldElement = screen.getByRole("textbox");
  //   const bookCallButtonElement = screen.getByText(/book call/i);
  //   expect(bookCallButtonElement).toBeDisabled();
  //   await user.type(inputFieldElement, fakeReasonForCall);
  //   expect(bookCallButtonElement).toBeEnabled();
  //   await user.click(bookCallButtonElement);
  //   expect(mockedOnSendError).toHaveBeenCalledWith({
  //     message: ERROR_TIME_SLOT_UNAVAILABLE,
  //   });
  //   jest.resetAllMocks();
  // });
  // it("should send a payload with the reason for the call and date once the call booking is initiated", async () => {
  //   const fakeReasonForCall = "Just some random reason for the call";
  //   const user = userEvent.setup();
  //   const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
  //   await user.click(randomAvailableTimeSlot);
  //   const selectButtonElement = screen.getByText(/select time slot/i);
  //   await user.click(selectButtonElement);
  //   const inputFieldElement = screen.getByRole("textbox");
  //   const bookCallButtonElement = screen.getByText(/book call/i);
  //   expect(bookCallButtonElement).toBeDisabled();
  //   await user.type(inputFieldElement, fakeReasonForCall);
  //   expect(bookCallButtonElement).toBeEnabled();
  //   await user.click(bookCallButtonElement);
  //   expect(mockedOnBookCall).toHaveBeenCalledWith({
  //     time: "03:00",
  //     reason: fakeReasonForCall,
  //   });
  //   jest.resetAllMocks();
  // });

  it("", () => {});
});

export {};
