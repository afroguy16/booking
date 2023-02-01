import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HoursT } from "../../types";

import SelectTime from ".";
import { ERROR_TIME_SLOT_UNAVAILABLE } from "./constants";

describe("ScheduleMeet Component - SelectDate", () => {
  const mockedOnBookCall = jest.fn();
  const mockedOnSendError = jest.fn();
  const mockedOnClearMessages = jest.fn();
  const fakeUnavailableTimeSlots: Array<HoursT> = ["00:00", "02:00"];
  let utils: HTMLElement;
  let renderAgain: (ui: React.ReactElement) => void;

  beforeEach(() => {
    const { baseElement, rerender } = render(
      <SelectTime
        isLoading={false}
        unavailableTimeSlots={fakeUnavailableTimeSlots}
        onBookCall={mockedOnBookCall}
        onSendError={mockedOnSendError}
        onClearMessages={mockedOnClearMessages}
      />
    );
    renderAgain = rerender;
    utils = baseElement;
  });

  it("should display 24 options with each slot representing an hour of the day", () => {
    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(24);
  });

  it("should mark timeslot that has been taken", () => {
    const unavailableOptionElements =
      utils.getElementsByClassName("unavailable");
    expect(unavailableOptionElements).toHaveLength(2);
  });

  it("should activate a time slot for confirmation and call the clearMessages callback if any time slot is clicked", async () => {
    const user = userEvent.setup();
    const selectButtonElement = screen.getByText(/select time slot/i);
    expect(selectButtonElement).toBeDisabled();

    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!;
    expect(randomAvailableTimeSlot).not.toHaveClass("active");

    await user.click(randomAvailableTimeSlot);
    expect(selectButtonElement).toBeEnabled();
    expect(randomAvailableTimeSlot).toHaveClass("active");
    expect(mockedOnClearMessages).toHaveBeenCalled();
    jest.resetAllMocks();
  });

  it("should de-select any active time slot for confirmation and call the clearMessages callback if the clear button is clicked", async () => {
    const user = userEvent.setup();
    const clearButtonElement = screen.getByText(/clear time slot/i);
    expect(clearButtonElement).toBeDisabled();

    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!;

    await user.click(randomAvailableTimeSlot);
    expect(clearButtonElement).toBeEnabled();

    await user.click(clearButtonElement);
    expect(clearButtonElement).toBeDisabled();
    expect(mockedOnClearMessages).toHaveBeenCalledTimes(2);
    jest.resetAllMocks();
  });

  it("should display a prompt for the user enter the reason for the call if the confirm selection button is clicked", async () => {
    const user = userEvent.setup();
    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const inputFieldElement = screen.getByRole("textbox");
    expect(inputFieldElement).toBeInTheDocument();
  });

  it("the button should be disabled until the user types a valid reason once the call reason prompt is displayed", async () => {
    const user = userEvent.setup();
    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const bookCallButtonElement = screen.getByText(/book call/i);
    expect(bookCallButtonElement).toBeDisabled();
  });

  it("should remove the prompt if the prompt is cancelled once the 'call reason prompt' is displayed", async () => {
    const user = userEvent.setup();
    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const cancelCallButtonElement = screen.getByText(/cancel/i);
    await user.click(cancelCallButtonElement);

    const inputFieldElement = screen.getByRole("textbox");
    await waitForElementToBeRemoved(inputFieldElement);
    expect(inputFieldElement).not.toBeInTheDocument();
  });

  it("should send a payload with the reason for the call and date once the call booking is initiated", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();
    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const inputFieldElement = screen.getByRole("textbox");
    const bookCallButtonElement = screen.getByText(/book call/i);
    expect(bookCallButtonElement).toBeDisabled();

    await user.type(inputFieldElement, fakeReasonForCall);
    expect(bookCallButtonElement).toBeEnabled();

    await user.click(bookCallButtonElement);
    expect(mockedOnBookCall).toHaveBeenCalledWith({
      time: "03:00",
      reason: fakeReasonForCall,
    });
    jest.resetAllMocks();
  });

  it("should should loading if it is loading", async () => {
    const user = userEvent.setup();
    renderAgain(
      <SelectTime
        isLoading={true}
        unavailableTimeSlots={fakeUnavailableTimeSlots}
        onBookCall={mockedOnBookCall}
        onSendError={mockedOnSendError}
        onClearMessages={mockedOnClearMessages}
      />
    );

    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const loadingText = screen.getByText("loading");
    expect(loadingText).toBeInTheDocument();
    jest.resetAllMocks();
  });

  // TODO - A better UX would be to disable the slots, so they aren't clickable
  it("should send an error if date that has already been taken is selected", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();
    const randomAvailableTimeSlot = screen.getAllByRole("option").at(2)!; // "02:00" - from the "fakeUnavailableTimeSlots" variable, we can see that "02:00" is already taken.
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const inputFieldElement = screen.getByRole("textbox");
    const bookCallButtonElement = screen.getByText(/book call/i);
    expect(bookCallButtonElement).toBeDisabled();

    await user.type(inputFieldElement, fakeReasonForCall);
    expect(bookCallButtonElement).toBeEnabled();

    await user.click(bookCallButtonElement);
    expect(mockedOnSendError).toHaveBeenCalledWith({
      message: ERROR_TIME_SLOT_UNAVAILABLE,
    });
    jest.resetAllMocks();
  });
});
