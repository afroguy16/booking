import { useRef, useState } from "react";
import axios from "../../../../axios";
import { MentorScheduleAttributesI, MentorScheduleCollectionI, MentorScheduleResponsePayloadI, ScheduleMeetingPayloadI, UseBookReturnPayloadI } from "../../interfaces";
import { HourT } from "../../types";

const useBook = (): UseBookReturnPayloadI => {
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mentorsTotalSchedule = useRef({ mentor: { name: '', time_zone: '' }, schedule: {} })
  const [selectedDateSchedule, setSelectedDateSchedule] = useState<MentorScheduleAttributesI>({ date: '', timeCollection: [] });

  const fetchMentorSchedule = async () => {
    const response = await axios.get('mentors/1/agenda')
    return response.data
  }

  const transformTime = (time: string) => `${time.split(":")[0]}:00`

  const getExtractedMentorSchedule = (rawCalendar: Array<{ date_time: string }>): { [key: string]: Array<HourT> } => {
    let splitCalendar: Array<Array<string>> = []

    // initial data transformation
    rawCalendar.forEach(rawDate => {
      splitCalendar.push(rawDate.date_time.split(" "))
    })

    // next transformation - hash is used to ensure we don't do an O(n^2)
    const hash: { [key: string]: Array<string> } = {}
    if (splitCalendar.length > 0) {
      splitCalendar.forEach((splitDate) => {
        if (hash[splitDate[0]] === undefined) {
          hash[splitDate[0]] = [transformTime(splitDate[1])]
        } else {
          hash[splitDate[0]].push(transformTime(splitDate[1])) // This is expensive, thankfully in a real app sanitization would be done during input, and there will be no need to incure this cost
        }
      })
    }
    return hash as { [key: string]: Array<HourT> }
  }

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

  const onSelectDate = async (date: string) => {
    if (date !== selectedDateSchedule.date) {
      // only make call and call the expensive functions above ones
      if (Object.keys(mentorsTotalSchedule.current.schedule).length < 1) {
        try {
          console.log(mentorsTotalSchedule.current.schedule)
          const mentorSchedule = await fetchMentorSchedule()
          const packagedData = getPackagedMentorTotalSchedule(mentorSchedule)
          console.log(packagedData)
          mentorsTotalSchedule.current.mentor = { ...packagedData.mentor }
          mentorsTotalSchedule.current.schedule = { ...packagedData.schedule }
          onSelectDate(date)
        } catch (e) {
          // Overwrite error
          console.log(e)
          setError('Something went wrong')
        }
      } else {
        console.log(mentorsTotalSchedule.current, 'loaded mentor')
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
