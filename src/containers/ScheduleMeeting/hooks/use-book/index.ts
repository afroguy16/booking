import { useState } from "react";
import { MentorScheduleAttributesI, MentorScheduleCollectionI, MentorScheduleResponsePayloadI, ScheduleMeetingPayloadI, UseBookReturnPayloadI } from "../../interfaces";
import { HourT } from "../../types";

const useBook = (): UseBookReturnPayloadI => {
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mentorsTotalSchedule, setMentorsTotalSchedule] = useState<MentorScheduleCollectionI>({ mentor: { name: '', time_zone: '' }, schedule: [] })
  const [selectedDateSchedule, setSelectedDateSchedule] = useState<MentorScheduleAttributesI>({ date: '', timeCollection: [] });

  const fetchMentorSchedule = async () => {
    return Promise.resolve({ mentor: { name: '', time_zone: '' }, schedule: [{ date: '', timeCollection: [''] }] })
  }

  const transformTime = (time: string) => `${time.split(":")[0]}:00`

  const getExtractedMentorSchedule = (rawCalendar: Array<{ date_time: string }>): Array<MentorScheduleAttributesI> => {
    let splitCalendar: Array<Array<string>> = []

    // initial data transformation
    rawCalendar.forEach(rawDate => {
      splitCalendar.push(rawDate.date_time.split(" "))
    })

    // next transformation - hash is used to ensure we don't do an O(n^2)
    const hash: { [key: string]: Array<string> } = {}
    // const s = { "2023-01-23": [] }
    if (splitCalendar.length > 0) {
      splitCalendar.forEach((splitDate) => {
        if (hash[splitDate[0]] === undefined) {
          hash[splitDate[0]] = [transformTime(splitDate[1])]
        } else {
          hash[splitDate[0]].push(transformTime(splitDate[1])) // This is expensive, thankfully in a real app sanitization would be done during input, and there will be no need to incure this cost
        }
      })
    }

    const packagedData: Array<{ date: string, timeCollection: Array<HourT> }> = []

    for (const [key, value] of Object.entries(hash)) {
      packagedData.push({ date: key, timeCollection: <Array<HourT>>value })
    }

    return packagedData;
  }

  const getPackagedMentorTotalSchedule = (rawMentorSchedule: MentorScheduleResponsePayloadI): MentorScheduleCollectionI => { // change return type to MentorScheduleCollectionI
    const schedule = getExtractedMentorSchedule(rawMentorSchedule.calendar)
    return ({
      mentor: {
        name: rawMentorSchedule.mentor.name,
        time_zone: rawMentorSchedule.mentor.time_zone
      },
      schedule
    })
  }

  const onSelectDate = async (date: string) => {
    if (date !== selectedDateSchedule.date) {
      if (mentorsTotalSchedule.schedule.length < 1) {
        try {
          const mentorSchedule = await fetchMentorSchedule()
          // const packagedData = getPackagedMentorTotalSchedule(mentorSchedule)
          // console.log(packagedData)
        } catch (e) {
          // Overwrite error
          console.log(e)
          setError('Something went wrong')
        }
      }
    }
  }

  const onSetBooking = (payload: ScheduleMeetingPayloadI) => {
    console.log(payload)
  }

  return ({
    error,
    isSuccessful,
    isLoading,
    selectedDateBookedTimeSlots: selectedDateSchedule?.timeCollection || [],
    onSelectDate,
    onSetError: (error) => setError(error.message), // We could extract and log the path, which could assist in debugging
    onClearError: () => setError(""),
    onClearSuccess: () => setIsSuccessful(false),
    onSetBooking
  })
}

export default useBook;
