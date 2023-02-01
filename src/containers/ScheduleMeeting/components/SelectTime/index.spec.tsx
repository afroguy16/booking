import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HoursT } from "../../types";

import SelectTime from ".";

describe("ScheduleMeeting Component - SelectDate", () => {
  const mockedOnConfirmSelectTime = jest.fn();
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
        onSelectTimeSlot={mockedOnConfirmSelectTime} //TODO - fix this
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

  it("should de-select any active time slot for confirmation and call the clearMessages callback if 'the clear time slot' button is clicked", async () => {
    const user = userEvent.setup();
    const clearButtonElement = screen.getByText(/clear time slot/i);
    expect(clearButtonElement).toBeDisabled();

    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!;

    await user.click(randomAvailableTimeSlot); // first mockedOnClearMessages call
    expect(mockedOnClearMessages).toHaveBeenCalledTimes(1);
    expect(clearButtonElement).toBeEnabled();

    await user.click(clearButtonElement); // second mockedOnClearMessages call
    expect(clearButtonElement).toBeDisabled();
    expect(mockedOnClearMessages).toHaveBeenCalledTimes(2);
    jest.resetAllMocks();
  });

  it("should send onConfirm time with the time as payload if the 'confirm time slot' button is clicked", async () => {
    const user = userEvent.setup();
    const randomAvailableTimeSlot = screen.getAllByRole("option").at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);
    expect(mockedOnConfirmSelectTime).toHaveBeenCalledWith("03:00");
  });
});
