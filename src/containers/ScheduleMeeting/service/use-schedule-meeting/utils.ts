import { MentorScheduleCollectionI, MentorScheduleResponsePayloadI } from "../../interfaces"
import { HourT } from "../../types"

/***************** Raw API Data Sample to transform */
// {
//   "mentor": {
//     "name": "Max Mustermann",
//     "time_zone": "-03:00" // NB: Timezone consideration is discarded in this implementation
//   },
//   "calendar": 
//   [
//       {
//         "date_time": "2023-01-23 13:00:00 +0100"
//       },
//       {
//         "date_time": "2023-01-23 14:00:00 +0100"
//       },
//       {
//         "date_time": "2023-01-27 09:00:00 +0100"
//       },
//   ]
// }
/***************** *********************************** */

/**
 * Takes in a time string, and resets it to the start of the hour, e.g. 13:42:01 -> resets to -> 13:00
 * @param {string} time - Time to reset
 * @return {string} Time that has been reset
 */
const resetTimeString = (time: string): string => `${time.split(":")[0]}:00`

/**
 * Takes in raw mentor calendar received from the backend's API, then transform it to a format ready for packaging
 * @param {Array<{ date_time: string }>} rawCalendar - Raw calendar data from the backend mentor data
 * @return {{ [key: string]: Array<HourT> }} Transformed to mentor schedule ready for packaging
 */
const getExtractedMentorSchedule = (rawCalendar: Array<{ date_time: string }>): { [key: string]: Array<HourT> } => {
  let splitCalendar: Array<Array<string>> = []

  // initial calendar transformation to (split the date, time and seconds into an array) --->
  // [
  //   {
  //     date_time: ["2023-01-23, 13:00:00, +0100"]
  //   },
  //   {
  //     date_time: ["2023-01-23, 14:00:00, +0100"]
  //   },
  //   {
  //     date_time: ["2023-01-27, 09:00:00, +0100"]
  //   },
  // ]
  rawCalendar.forEach(rawDate => {
    splitCalendar.push(rawDate.date_time.split(" "))
  })


  // next calendar transformation - hash is used to ensure we don't do an O(n^2)
  // use the date as key, so there is not need to do a nested loop during search, because of this, search will be O(1)
  // also discarded the time_zone, because it's not used in our implementation, the assumption is that it would be handled in the server for more consistency
  // {
  //   "2023-01-23": ["13:00:00", "14:00:00"],
  //   "2023-01-27", ["09:00:00]
  // }
  const hash: { [key: string]: Array<string> } = {}
  if (splitCalendar.length > 0) {
    splitCalendar.forEach((splitDate) => {
      if (hash[splitDate[0]] === undefined) {
        hash[splitDate[0]] = [resetTimeString(splitDate[1])] // This is expensive, thankfully in a real app sanitization would be done during input, and there will be no need to incure this cost
      } else {
        hash[splitDate[0]].push(resetTimeString(splitDate[1])) // This is expensive, thankfully in a real app sanitization would be done during input, and there will be no need to incure this cost
      }
    })
  }
  return hash as { [key: string]: Array<HourT> }
}

/**
 * Takes in raw mentor data from the backend's API, transform and package it to a format that suits the frontend need
 * @param {MentorScheduleResponsePayloadI} rawMentorSchedule - Raw mentor data response from the backend
 * @return {MentorScheduleCollectionI} Formatted mentor schedule collection
 */
const getPackagedMentorTotalSchedule = (rawMentorSchedule: MentorScheduleResponsePayloadI): MentorScheduleCollectionI => {
  const schedule = getExtractedMentorSchedule(rawMentorSchedule.calendar)
  return ({
    mentor: {
      name: rawMentorSchedule.mentor.name,
      time_zone: rawMentorSchedule.mentor.time_zone
    },
    schedule
  })
}

export default getPackagedMentorTotalSchedule