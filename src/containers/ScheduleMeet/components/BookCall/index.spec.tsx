import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HoursT } from "../../../types";

import BookCall from ".";

describe("ScheduleMeet Component - SelectDate", () => {
  const mockedOnBookCall = jest.fn();
  const fakeUnavailableTimeSlots: Array<HoursT> = ["00:00", "02:00"];
  let utils: HTMLElement;

  beforeEach(() => {
    const { baseElement } = render(
      <BookCall
        unavailableTimeSlots={fakeUnavailableTimeSlots}
        onBookCall={mockedOnBookCall}
      />
    );
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

  it("should activate a time slot for confirmation if any time slot is clicked", async () => {
    const user = userEvent.setup();
    const selectButtonElement = screen.getByText(/select time slot/i);
    expect(selectButtonElement).toBeDisabled();

    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!;

    await user.click(randomAvailableTimeSlot);
    expect(selectButtonElement).toBeEnabled();
  });

  it("should de-activate any active time slot for confirmation if the clear button is clicked", async () => {
    const user = userEvent.setup();
    const clearButtonElement = screen.getByText(/clear time slot/i);
    expect(clearButtonElement).toBeDisabled();

    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!;

    await user.click(randomAvailableTimeSlot);
    expect(clearButtonElement).toBeEnabled();

    await user.click(clearButtonElement);
    expect(clearButtonElement).toBeDisabled();
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

  it("should send an error if date that has already been taken is selected", () => {});
});

// list out 24 slots to represent each hour of the day
// Allocate each box to each hour
// select a slot
//   confirm selection
//     enter a reason for the call
//       >> send payload that is time and reason for the call
//   cancel selection
//   >> send error message to the parent
// clear selection
