import { fireEvent, render, screen } from "@testing-library/react";

import SelectDate from ".";

describe("ScheduleMeeting Component - SelectDate", () => {
  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  afterEach(jest.resetAllMocks);

  it("should call onSelectDate callback with the selected date as a formatted string as soon as the component loads", () => {
    const fakeToday = "01.01.2023";
    jest.useFakeTimers("modern").setSystemTime(new Date(fakeToday)); // today's date is mocked so that the test will always pass irrespective of the current date

    const mockedOnSelectDate = jest.fn();
    const mockedOnClearMessages = jest.fn();
    render(
      <SelectDate
        onSelectDate={mockedOnSelectDate}
        onClearMessages={mockedOnClearMessages}
      />
    );

    expect(mockedOnSelectDate).toHaveBeenNthCalledWith(1, fakeToday);
    expect(mockedOnClearMessages).toHaveBeenCalled();
  });

  it("should call onSelectDate callback with the selected date as a formatted string if a date is selected", () => {
    const fakeToday = "2023.01.01";
    const selectedDate = "11.01.2023";
    jest.useFakeTimers("modern").setSystemTime(new Date(fakeToday)); // today's date is mocked so that the test will always pass irrespective of the current date

    const mockedOnSelectDate = jest.fn();
    const mockedOnClearMessages = jest.fn();
    render(
      <SelectDate
        onSelectDate={mockedOnSelectDate}
        onClearMessages={mockedOnClearMessages}
      />
    );

    const eleventhDayElement = screen.getAllByRole("option").at(10);
    fireEvent.click(eleventhDayElement!); // use fireEvent instead of userEvent because userEvent is asynchronous and that doesn't play nicely with fakeTimers

    expect(mockedOnSelectDate).toHaveBeenNthCalledWith(2, selectedDate); // called twice, one for the component load, and the other once the click event was fired
    expect(mockedOnClearMessages).toHaveBeenCalled();
  });
});
