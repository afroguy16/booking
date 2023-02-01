import {
  getByText,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmMeeting from ".";

describe("", () => {
  const mockedOnClose = jest.fn();
  const mockedOnConfirmMeeting = jest.fn();
  const props = {
    isLoading: false,
    isOpen: true,
    onClose: mockedOnClose,
    onConfirmMeeting: mockedOnConfirmMeeting,
  };

  afterEach(jest.resetAllMocks);

  it("shouldn't render if isOpen is false", () => {
    const localProps = { ...props, isOpen: false };
    render(<ConfirmMeeting {...localProps} />);

    const titleElement = screen.queryByText(/reason for call/i);
    expect(titleElement).not.toBeInTheDocument();
  });

  it("should render if isOpen is true", () => {
    render(<ConfirmMeeting {...props} />);

    const titleElement = screen.getByText(/Reason for call/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("should not show confirming if it is not confirming", () => {
    render(<ConfirmMeeting {...props} />);

    const loadingText = screen.queryByText("confirming");
    expect(loadingText).not.toBeInTheDocument();
  });

  it("should show confirming if it is confirming", () => {
    const localProps = { ...props, isLoading: true };
    render(<ConfirmMeeting {...localProps} />);

    const loadingText = screen.getByText(/confirming/i);
    expect(loadingText).toBeInTheDocument();
  });

  it("the button should be disabled until the user types a valid reason", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();
    render(<ConfirmMeeting {...props} />);

    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    expect(bookCallButtonElement).toBeDisabled();

    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);
    expect(bookCallButtonElement).toBeEnabled();
  });

  it("should call onConfirmMeeting if the 'confirm meeting' button is clicked", async () => {
    const fakeReasonForCall = "Just some random reason for the call";
    const user = userEvent.setup();
    render(<ConfirmMeeting {...props} />);

    const bookCallButtonElement = screen.getByText(/Confirm meeting/i);
    const inputFieldElement = screen.getByRole("textbox");
    await user.type(inputFieldElement, fakeReasonForCall);
    await user.click(bookCallButtonElement);
    expect(mockedOnConfirmMeeting).toHaveBeenLastCalledWith(fakeReasonForCall);
  });
});
