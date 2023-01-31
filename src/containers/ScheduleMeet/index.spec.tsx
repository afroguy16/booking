import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ScheduleMeet from ".";
import { ERROR_TIME_SLOT_UNAVAILABLE } from "./components/BookCall/constants";
import { SUCCESS_MESSAGE } from "./constants";
import useBook from "./hooks/use-book";
import { UseBookReturnPayloadI } from "./interfaces";
import { HoursT } from "./types";

jest.mock("./hooks/use-book");

describe("ScheduleMeet", () => {
  const returnedData: UseBookReturnPayloadI = {
    bookedTimeSlots: [],
    error: "",
    isSuccessful: false,
    isLoading: false,
    onSelectDate: jest.fn(),
    onSetError: jest.fn(),
    onClearError: jest.fn(),
    onClearSuccess: jest.fn(),
    onSetBooking: jest.fn(),
  };

  afterEach(jest.resetAllMocks);

  it("should display the error message if there is an error", () => {
    const error = "fake error";
    jest.mocked(useBook).mockReturnValue({ ...returnedData, error });

    render(<ScheduleMeet />);

    const errorElement = screen.getByRole("error");
    expect(errorElement).toHaveTextContent(error);

    const successElement = screen.queryByRole("success");
    expect(successElement).not.toBeInTheDocument();
  });

  it("should display the success message if there a success message", () => {
    jest
      .mocked(useBook)
      .mockReturnValue({ ...returnedData, isSuccessful: true });

    render(<ScheduleMeet />);

    const errorElement = screen.queryByRole("error");
    expect(errorElement).not.toBeInTheDocument();

    const successElement = screen.getByRole("success");
    expect(successElement).toHaveTextContent(SUCCESS_MESSAGE);
  });

  it("should call onClearError if onClearMesage is triggered from the children or if the close button is clicked and there is an error message", async () => {
    const error = "fake error";
    const { onClearError, onClearSuccess } = returnedData;
    jest.mocked(useBook).mockReturnValue({ ...returnedData, error });
    const user = userEvent.setup();

    render(<ScheduleMeet />);

    const closeButtonElement = screen.getByRole("button", { name: /close/i });
    await user.click(closeButtonElement);
    expect(onClearError).toHaveBeenCalledTimes(1);
    expect(onClearSuccess).not.toHaveBeenCalled();
  });

  it("should call onClearSuccess if onClearMesage is triggered from the children or if the close button is clicked and there is a success message", async () => {
    const { onClearError, onClearSuccess } = returnedData;
    jest
      .mocked(useBook)
      .mockReturnValue({ ...returnedData, isSuccessful: true });
    const user = userEvent.setup();

    render(<ScheduleMeet />);

    const closeButtonElement = screen.getByRole("button", { name: /close/i });
    await user.click(closeButtonElement);
    expect(onClearSuccess).toHaveBeenCalledTimes(1);
    expect(onClearError).not.toHaveBeenCalled();
  });

  it("should set the selected date and time in the BookCall child", () => {
    const fakeBookedTimeSlot: Array<HoursT> = [
      "00:00",
      "03:00",
      "04:00",
      "04:00", // duplicates will be filtered out by BookCall. This is an unlikely scenario because the endpoint won't send two blocked time
    ];
    jest.mocked(useBook).mockReturnValue({
      ...returnedData,
      bookedTimeSlots: fakeBookedTimeSlot,
    });

    const { baseElement } = render(<ScheduleMeet />);

    const optionElements = baseElement.getElementsByClassName("unavailable");
    expect(optionElements).toHaveLength(3);
  });

  it("should display loading if loading is received from the store", async () => {
    const user = userEvent.setup();
    jest.mocked(useBook).mockReturnValue({ ...returnedData, isLoading: true });
    render(<ScheduleMeet />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(2)!; // "02:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const loadingText = screen.getByText("loading");
    expect(loadingText).toBeInTheDocument();
  });

  it("should not display loading if loading isn't received from the store", async () => {
    const user = userEvent.setup();
    jest.mocked(useBook).mockReturnValue({ ...returnedData });
    render(<ScheduleMeet />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(2)!; // "02:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const loadingText = screen.queryByText("loading");
    expect(loadingText).not.toBeInTheDocument();
  });

  it("should call onSelectDate when a date is selected from SelectDate", () => {});

  it("should call onSetError when an error is sent from BookCall", async () => {
    const { onSetError } = returnedData;
    const fakeReasonForCall = "Just some random reason for the call";
    const fakeBookedTimeSlot: Array<HoursT> = [
      "00:00",
      "03:00",
      "04:00",
      "04:00", // duplicates will be filtered out by BookCall. This is an unlikely scenario because the endpoint won't send two blocked time
    ];
    const user = userEvent.setup();
    jest.mocked(useBook).mockReturnValue({
      ...returnedData,
      bookedTimeSlots: fakeBookedTimeSlot,
    });
    render(<ScheduleMeet />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(4)!; // "04:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const inputFieldElement = screen.getByRole("textbox");
    const bookCallButtonElement = screen.getByText(/book call/i);
    await user.type(inputFieldElement, fakeReasonForCall);
    await user.click(bookCallButtonElement);
    expect(onSetError).toHaveBeenCalledWith({
      message: ERROR_TIME_SLOT_UNAVAILABLE,
    });
  });

  it("should package the payload and call onSetBooking with the payload payLoad once a Booking date is confirmed", () => {});
});

// error - should display error if there is an error
// selectedDate - should display (child) with selected date time
// Success - should show success message
// loading - should display (child) loading when loading

// onClearSuccess - should call onClear Success reset success message once timeslot or date is clicked - //TODO, replace onClearError with onClick/onFire
// onClearError() - refer to onClearSuccess TODO

// onSelectDate(date) - should call onSelectDate onSelectDate from SelectDate
// onSetError(error) - should call onSetError onSetError from BookCall
// onSetBooking(booking) - should call onSetBooking with payLoad that includes selectedDate {date: day, time: time, reasonforcall: string}
