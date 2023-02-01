import { HourT } from "../../../../types";
import generateHourString from "../generate-hour-string";

// NB: This fuction is currently almost worthless, since it returns a static array. A const could easily take its place

/**
 * Generates a static list of 24 hour time in four digit format 00:00
 * @return {Array<HourT>} The formatted hour
 */
const generate24HourTimeString = ((): Array<HourT> => {
  let timeSlots = new Array(24);
  for (let i = 0; i < 24; i++) {
    timeSlots[i] = generateHourString(i);
  }
  return timeSlots;
})();

export default generate24HourTimeString;
