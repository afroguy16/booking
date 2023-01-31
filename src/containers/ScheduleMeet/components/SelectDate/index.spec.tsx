import { fireEvent, render, screen } from "@testing-library/react";

import SelectDate from ".";

describe("ScheduleMeet Component - SelectDate", () => {
  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should call onSelectDate callback with the selected date as a formatted string", () => {
    const fakeToday = "2023.01.01";
    const selectedDate = "11.01.2023";
    jest.useFakeTimers("modern").setSystemTime(new Date(fakeToday)); // today's date is mocked so that the test will always pass irrespective of the current date

    const mockedOnSelectDate = jest.fn();
    render(<SelectDate onSelectDate={mockedOnSelectDate} />);

    const eleventhDayElement = screen.getAllByRole("option").at(10);
    fireEvent.click(eleventhDayElement!); // use fireEvent instead of userEvent because userEvent is asynchronous and that doesn't play nicely with fakeTimers

    expect(mockedOnSelectDate).toHaveBeenCalledWith(selectedDate);
  });
});
