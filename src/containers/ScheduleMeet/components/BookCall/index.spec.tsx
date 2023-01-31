import { render, screen } from "@testing-library/react";
import BookCall from ".";

describe("ScheduleMeet Component - SelectDate", () => {
  it("should display 24 options with each slot representing an hour of the day", () => {
    render(<BookCall />);

    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(24);
  });
  it("should activate a time slot for confirmation if any time slot is clicked", () => {});
  it("should de-activate any active time slot for confirmation if the clear button is clicked", () => {});
  it("should display a prompt to enter the reason for the call if the confirm selection button is clicked", () => {});
  it("should remove the prompt if the prompt is cancelled once activated", () => {});
  it("should send a payload with the reason for the call and date once the call booking is initiated", () => {});
  it("should send an error if date that has already been taken is selected", () => {});
});

export {};

// list out 24 slots to represent each hour of the day
// Allocate each box to each hour
// select a slot
//   confirm selection
//     enter a reason for the call
//       >> send payload that is time and reason for the call
//   cancel selection
//   >> send error message to the parent
// clear selection
