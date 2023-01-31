import { ERROR_OUT_OF_BOUND } from "../../constants";

/**
 * Takes a number which represents the hour between 1 and 24, then return the formatted number as a string by appending a colon and two zeros to the end of that number and one zero to the start of the number if the number has only one digit
 * @param {number} hour - The to be formatted
 * @return {string} The formatted hour
 */
const generateHourString = (hour: number) => {
  if (hour < 0 || hour > 24) {
    throw new Error(ERROR_OUT_OF_BOUND);
  }

  const formattedHour = hour.toString();

  if (formattedHour.length > 1) {
    return `${hour}:00`;
  }

  return `0${hour}:00`;
};

export default generateHourString