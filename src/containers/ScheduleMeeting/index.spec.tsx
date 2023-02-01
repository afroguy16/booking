import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ScheduleMeeting from ".";
import { ERROR_TIME_SLOT_UNAVAILABLE } from "./components/SelectTime/constants";
import { SUCCESS_MESSAGE } from "./constants";
import useBook from "./hooks/use-book";
import { UseBookReturnPayloadI } from "./interfaces";
import { HourT } from "./types";

jest.mock("./hooks/use-book");

const returnedData: UseBookReturnPayloadI = {
  selectedDateBookedTimeSlots: [],
  error: "",
  isSuccessful: false,
  isLoading: false,
  onSelectDate: jest.fn(),
  onSetError: jest.fn(),
  onClearError: jest.fn(),
  onClearSuccess: jest.fn(),
  onSetBooking: jest.fn(),
};

describe("ScheduleMeeting Container", () => {
  afterEach(jest.resetAllMocks);

  it("should display the error message if there is an error", () => {
    const error = "fake error";
    jest.mocked(useBook).mockReturnValue({ ...returnedData, error });

    render(<ScheduleMeeting />);

    const errorElement = screen.getByRole("error");
    expect(errorElement).toHaveTextContent(error);

    const successElement = screen.queryByRole("success");
    expect(successElement).not.toBeInTheDocument();
  });

  it("should display the success message if there a success message", () => {
    jest
      .mocked(useBook)
      .mockReturnValue({ ...returnedData, isSuccessful: true });

    render(<ScheduleMeeting />);

    const errorElement = screen.queryByRole("error");
    expect(errorElement).not.toBeInTheDocument();

    const successElement = screen.getByRole("success");
    expect(successElement).toHaveTextContent(SUCCESS_MESSAGE);
  });

  it("should call onClearError if onClearMesage is triggered if the close button in the error message is clicked", async () => {
    const error = "fake error";
    const { onClearError, onClearSuccess } = returnedData;
    jest.mocked(useBook).mockReturnValue({ ...returnedData, error });
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    const closeButtonElement = screen.getByRole("button", { name: /close/i });
    await user.click(closeButtonElement);
    expect(onClearError).toHaveBeenCalledTimes(2); // called twice. the first one is called when SelectDate is mounted, and the second call when the button is clicked.
    expect(onClearSuccess).not.toHaveBeenCalled();
  });

  it("should call onClearError if onClearMesage is called from child (SelectDate) and there is error message", () => {
    const error = "fake error";
    const { onClearError, onClearSuccess } = returnedData;

    jest.mocked(useBook).mockReturnValue({ ...returnedData, error });
    render(<ScheduleMeeting />);

    expect(onClearError).toHaveBeenCalledTimes(1); // called when SelectDate is mounted if there is an existing error
    expect(onClearSuccess).not.toHaveBeenCalled();
  });

  it("should call onClearError if onClearMesage is called from child (Confirm meeting) and there is error message", async () => {
    const error = "fake error";
    const user = userEvent.setup();
    const { onClearError, onClearSuccess } = returnedData;

    jest.mocked(useBook).mockReturnValue({ ...returnedData, error });
    render(<ScheduleMeeting />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(2)!; // "02:00"
    await user.click(randomAvailableTimeSlot);

    expect(onClearError).toHaveBeenCalledTimes(2); // called twice. the first one is called when SelectDate is mounted, and the second call when the button is clicked.
    expect(onClearSuccess).not.toHaveBeenCalled();
  });

  it("should call onClearSuccess if onClearMesage is triggered from the children or if the close button is clicked and there is a success message", async () => {
    const { onClearError, onClearSuccess } = returnedData;
    jest
      .mocked(useBook)
      .mockReturnValue({ ...returnedData, isSuccessful: true });
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    const closeButtonElement = screen.getByRole("button", { name: /close/i });
    await user.click(closeButtonElement);
    expect(onClearSuccess).toHaveBeenCalledTimes(2); // called twice. the first one is called when SelectDate is mounted, and the second call when the button is clicked.
    expect(onClearError).not.toHaveBeenCalled();
  });

  it("should call onClearSuccess if onClearMesage is called from child (SelectDate) and there is a success message", () => {
    const { onClearError, onClearSuccess } = returnedData;

    jest
      .mocked(useBook)
      .mockReturnValue({ ...returnedData, isSuccessful: true });
    render(<ScheduleMeeting />);

    expect(onClearSuccess).toHaveBeenCalledTimes(1); // called when SelectDate is mounted if there is an existing error
    expect(onClearError).not.toHaveBeenCalled();
  });

  it("should call onClearSuccess if onClearMesage is called from child (SelectTime) and there is a success message", async () => {
    const user = userEvent.setup();
    const { onClearError, onClearSuccess } = returnedData;

    jest
      .mocked(useBook)
      .mockReturnValue({ ...returnedData, isSuccessful: true });
    render(<ScheduleMeeting />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(2)!; // "02:00"
    await user.click(randomAvailableTimeSlot);

    expect(onClearSuccess).toHaveBeenCalledTimes(2); // called twice. the first one is called when SelectDate is mounted, and the second call when the button is clicked.
    expect(onClearError).not.toHaveBeenCalled();
  });

  it("should set the selected date and time in the SelectTime child", () => {
    const fakeBookedTimeSlot: Array<HourT> = [
      "00:00",
      "03:00",
      "04:00",
      "04:00", // duplicates will be filtered out by SelectTime. This is an unlikely scenario because the endpoint won't send two blocked time
    ];
    jest.mocked(useBook).mockReturnValue({
      ...returnedData,
      selectedDateBookedTimeSlots: fakeBookedTimeSlot,
    });

    const { baseElement } = render(<ScheduleMeeting />);

    const optionElements = baseElement.getElementsByClassName("unavailable");
    expect(optionElements).toHaveLength(3);
  });

  it("should display confirming if confirming is received from the store", async () => {
    const user = userEvent.setup();
    jest.mocked(useBook).mockReturnValue({ ...returnedData, isLoading: true });
    render(<ScheduleMeeting />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(2)!; // "02:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const loadingText = screen.getByText(/confirming/i);
    expect(loadingText).toBeInTheDocument();
  });

  it("should not display confirming if confirming isn't received from the store", async () => {
    const user = userEvent.setup();
    jest.mocked(useBook).mockReturnValue({ ...returnedData });
    render(<ScheduleMeeting />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(2)!; // "02:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const loadingText = screen.queryByText("confirming");
    expect(loadingText).not.toBeInTheDocument();
  });

  // TODO - A better UX would be to disable the slots, so they aren't clickable
  it("should call onSetError if the requested time slot isn't available", async () => {
    const { onSetError } = returnedData;
    const fakeReasonForCall = "Just some random reason for the call";
    const fakeBookedTimeSlot: Array<HourT> = [
      "00:00",
      "03:00",
      "04:00",
      "04:00", // duplicates will be filtered out by SelectTime. This is an unlikely scenario because the endpoint won't send two blocked time
    ];
    const user = userEvent.setup();
    jest.mocked(useBook).mockReturnValue({
      ...returnedData,
      selectedDateBookedTimeSlots: fakeBookedTimeSlot,
    });
    render(<ScheduleMeeting />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(4)!; // "04:00"
    await user.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    await user.click(selectButtonElement);

    const inputFieldElement = screen.getByRole("textbox");
    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    await user.type(inputFieldElement, fakeReasonForCall);
    await user.click(bookCallButtonElement);
    expect(onSetError).toHaveBeenCalledWith({
      path: "ConfirmMeeting",
      message: ERROR_TIME_SLOT_UNAVAILABLE,
    });
  });
});

describe("ScheduleMeeting Container - with Fake Timer", () => {
  afterEach(jest.resetAllMocks);

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should call onSelectDate when a date is selected from SelectDate", () => {
    const fakeToday = "01.01.2023";
    const { onSelectDate } = returnedData;
    jest.useFakeTimers("modern").setSystemTime(new Date(fakeToday)); // today's date is mocked so that the test will always pass irrespective of the current date
    jest.mocked(useBook).mockReturnValue({ ...returnedData });
    render(<ScheduleMeeting />);

    expect(onSelectDate).toHaveBeenNthCalledWith(1, fakeToday);
  });

  it("should package the payload and call onSetBooking with the payload payLoad once a Booking is confirmed", () => {
    const fakeToday = "01.01.2023";
    const fakeReasonForCall = "Just some random reason for the call";
    const { onSetBooking } = returnedData;

    jest.useFakeTimers("modern").setSystemTime(new Date(fakeToday)); // today's date is mocked so that the test will always pass irrespective of the current date
    jest.mocked(useBook).mockReturnValue({ ...returnedData });
    render(<ScheduleMeeting />);

    const randomAvailableTimeSlot = screen
      .getAllByRole("option", {
        name: /select time slot/i,
      })
      .at(4)!; // "04:00"
    fireEvent.click(randomAvailableTimeSlot);

    const selectButtonElement = screen.getByText(/select time slot/i);
    fireEvent.click(selectButtonElement);

    const inputFieldElement = screen.getByRole("textbox");
    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    fireEvent.change(inputFieldElement, {
      target: { value: fakeReasonForCall },
    });
    fireEvent.click(bookCallButtonElement);
    expect(onSetBooking).toHaveBeenCalledWith({
      time: "04:00",
      date: "01.01.2023",
      reason: fakeReasonForCall,
    });
  });
});
