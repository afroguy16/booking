import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import axios from "../../axios";

import ScheduleMeeting from ".";
import { ERROR_TIME_SLOT_UNAVAILABLE } from "./components/SelectTime/constants";

const fakeResponse = {
  data: {
    mentor: {
      name: "Max Mustermann",
      time_zone: "-03:00",
    },
    calendar: [
      {
        date_time: "2023-01-23 13:00:00 +0100",
      },
      {
        date_time: "2023-01-23 13:00:00 +0100", // should only show one of this duplicate in the UI
      },
      {
        date_time: "2023-01-23 14:00:00 +0100",
      },
      ,
      {
        date_time: "2023-01-25 09:00:00 +0100",
      },
      {
        date_time: "2023-01-27 09:00:00 +0100",
      },
    ],
  },
};

jest.mock("../../axios");

describe("ScheduleMeeting Container", () => {
  afterEach(jest.resetAllMocks);

  it("should display the error message if there is an error is sent from the child, e.g. SelectTime component", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    // 1. Date is selected on page load
    // 2. Select a time slot
    const randomAvailableTimeSlot = screen
      .getAllByRole("option", { name: "confirm time slot" })
      .at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    // 3. Click on the "Confirm time slot button"
    const confirmSlotButtonElement = screen.getByText(/confirm time slot/i);
    await user.click(confirmSlotButtonElement);

    // 4. Type in the reason for the call
    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);

    // 5. Click on the "confirm meeting" button
    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    await user.click(bookCallButtonElement);

    // 6. Wait for it to finish loading. Once that is done, the modal would be removed from the DOM
    await waitForElementToBeRemoved(inputFieldElement);

    // 7. Click on the "Confirm time slot button" to book the same date that was just booked
    await user.click(confirmSlotButtonElement);

    const errorElement = screen.getByRole("error");
    expect(errorElement).toHaveTextContent(ERROR_TIME_SLOT_UNAVAILABLE);

    const successElement = screen.queryByRole("success");
    expect(successElement).not.toBeInTheDocument();
  });

  it("should clear error if the close button in the error Alert is clicked", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    // 1. Date is selected on page load
    // 2. Select a time slot
    const randomAvailableTimeSlot = screen
      .getAllByRole("option", { name: "confirm time slot" })
      .at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    // 3. Click on the "Confirm time slot button"
    const confirmSlotButtonElement = screen.getByText(/confirm time slot/i);
    await user.click(confirmSlotButtonElement);

    // 4. Type in the reason for the call
    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);

    // 5. Click on the "confirm meeting" button
    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    await user.click(bookCallButtonElement);

    // 6. Wait for it to finish loading. Once that is done, the modal would be removed from the DOM
    await waitForElementToBeRemoved(inputFieldElement);

    // 7. Click on the "Confirm time slot button" to book the same date that was just booked
    await user.click(confirmSlotButtonElement);

    const errorElement = screen.getByRole("error");
    expect(errorElement).toBeInTheDocument();

    const closeButtonElement = screen.getByRole("button", { name: /close/i });
    await user.click(closeButtonElement);

    expect(errorElement).not.toBeInTheDocument();
  });

  it("should clear error if a clear error action is triggered from any child", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    // 1. Date is selected on page load
    // 2. Select a time slot
    const randomAvailableTimeSlot = screen
      .getAllByRole("option", { name: "confirm time slot" })
      .at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    // 3. Click on the "Confirm time slot button"
    const confirmSlotButtonElement = screen.getByText(/confirm time slot/i);
    await user.click(confirmSlotButtonElement);

    // 4. Type in the reason for the call
    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);

    // 5. Click on the "confirm meeting" button
    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    await user.click(bookCallButtonElement);

    // 6. Wait for it to finish loading. Once that is done, the modal would be removed from the DOM
    await waitForElementToBeRemoved(inputFieldElement);

    // 7. Click on the "Confirm time slot button" to book the same date that was just booked
    await user.click(confirmSlotButtonElement);

    const errorElement = screen.getByRole("error");
    expect(errorElement).toBeInTheDocument();

    //8. Click on a time slot
    await user.click(randomAvailableTimeSlot);
    expect(errorElement).not.toBeInTheDocument();
  });

  it("should close the input Confirm message modal if the cancel button is clicked", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    // 1. Date is selected on page load
    // 2. Select a time slot
    const randomAvailableTimeSlot = screen
      .getAllByRole("option", { name: "confirm time slot" })
      .at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    // 3. Click on the "Confirm time slot button"
    const confirmSlotButtonElement = screen.getByText(/confirm time slot/i);
    await user.click(confirmSlotButtonElement);

    // 4. Type in the reason for the call
    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);

    // 5. Click on the "confirm meeting" button
    const cancelConfirmMeetingSlotButtonElement = screen.getByText(/cancel/i);
    await user.click(cancelConfirmMeetingSlotButtonElement);

    await waitForElementToBeRemoved(inputFieldElement);
    expect(inputFieldElement).not.toBeInTheDocument();
  });

  it("should display the success message if there a success message", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    // 1. Date is selected on page load
    // 2. Select a time slot
    const randomAvailableTimeSlot = screen
      .getAllByRole("option", { name: "confirm time slot" })
      .at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    // 3. Click on the "Confirm time slot button"
    const confirmSlotButtonElement = screen.getByText(/confirm time slot/i);
    await user.click(confirmSlotButtonElement);

    // 4. Type in the reason for the call
    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);

    // 5. Click on the "confirm meeting" button
    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    await user.click(bookCallButtonElement);

    // 6. Wait for it to finish loading. Once that is done, the modal would be removed from the DOM
    await waitForElementToBeRemoved(inputFieldElement);

    const successElement = screen.getByRole("success");
    expect(successElement).toBeInTheDocument();

    const errorElement = screen.queryByRole("error");
    expect(errorElement).not.toBeInTheDocument();
  });

  it("should clear success if a clear success action is triggered from any child", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    // 1. Date is selected on page load
    // 2. Select a time slot
    const randomAvailableTimeSlot = screen
      .getAllByRole("option", { name: "confirm time slot" })
      .at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    // 3. Click on the "Confirm time slot button"
    const confirmSlotButtonElement = screen.getByText(/confirm time slot/i);
    await user.click(confirmSlotButtonElement);

    // 4. Type in the reason for the call
    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);

    // 5. Click on the "confirm meeting" button
    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    await user.click(bookCallButtonElement);

    // 6. Wait for it to finish loading. Once that is done, the modal would be removed from the DOM
    await waitForElementToBeRemoved(inputFieldElement);

    const successElement = screen.getByRole("success");
    expect(successElement).toBeInTheDocument();

    await user.click(randomAvailableTimeSlot);
    expect(successElement).not.toBeInTheDocument();

    const loadingText = screen.queryByText(/confirming/i);
    expect(loadingText).not.toBeInTheDocument();
  });

  it("should display confirming while a time slot is confirming", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();

    render(<ScheduleMeeting />);

    // 1. Date is selected on page load
    // 2. Select a time slot
    const randomAvailableTimeSlot = screen
      .getAllByRole("option", { name: "confirm time slot" })
      .at(3)!; // "03:00"
    await user.click(randomAvailableTimeSlot);

    // 3. Click on the "Confirm time slot button"
    const confirmSlotButtonElement = screen.getByText(/confirm time slot/i);
    await user.click(confirmSlotButtonElement);

    // 4. Type in the reason for the call
    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);

    // 5. Click on the "confirm meeting" button
    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    await user.click(bookCallButtonElement);

    const loadingText = screen.getByText(/confirming/i);
    expect(loadingText).toBeInTheDocument();
  });
});

describe("ScheduleMeeting Container - with Fake Timer", () => {
  afterEach(jest.resetAllMocks);

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should set the selected date and time in the SelectTime child", (done) => {
    const fakeToday = "2023-01-23";
    jest.useFakeTimers("modern").setSystemTime(new Date(fakeToday)); // today's date is mocked so that the test will always pass irrespective of the current date
    jest.mocked(axios.get).mockResolvedValue({ ...fakeResponse });

    render(<ScheduleMeeting />);
    screen
      .findAllByRole("option", {
        name: /unavailable time slot/i,
      })
      .then((elements) => {
        expect(elements).toHaveLength(2);
        done();
      });
  });
});
