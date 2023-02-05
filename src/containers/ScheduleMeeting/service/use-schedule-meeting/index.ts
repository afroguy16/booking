import { useRef, useState } from "react";

import axios from "../../../../axios";
import { ERROR_UNKNOWN } from "../../constants";
import { MentorScheduleAttributesI, MentorScheduleResponsePayloadI, ScheduleMeetingPayloadI, UseBookReturnPayloadI, ScheduleMeetingErrorI } from "../../interfaces";
import { HourT } from "../../types";
import getPackagedMentorTotalSchedule from "./utils";

const GET_MENTOR_AGENDA_URL = 'mentors/1/agenda'
const TURN_ON_FAKE_ERROR = false; // change to true to test fake error - then try to select a time slot from the UI

const useScheduleMeeting = (): UseBookReturnPayloadI => {
  const [error, setError] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mentorsTotalSchedule = useRef({ mentor: { name: '', time_zone: '' }, schedule: {} as { [key: string]: Array<HourT> } })
  const [selectedDateSchedule, setSelectedDateSchedule] = useState<MentorScheduleAttributesI>({ date: '', timeCollection: [] });
  const mentorDataFetchedSuccessfully = useRef(false)

  const fetchMentorSchedule = async () => {
    const response = await axios.get<MentorScheduleResponsePayloadI>(GET_MENTOR_AGENDA_URL)
    return response?.data
  }

  // This will result in an infinite loop if no data is returned from the BE
  const onSelectDate = async (date: string) => {
    setIsLoading(true)
    if (date !== selectedDateSchedule.date) {
      // only make call and call the expensive functions above ones
      if (Object.keys(mentorsTotalSchedule.current.schedule).length < 1 && !mentorDataFetchedSuccessfully.current) {
        try {
          const mentorSchedule = await fetchMentorSchedule()
          const packagedData = getPackagedMentorTotalSchedule(mentorSchedule)
          mentorsTotalSchedule.current.mentor = { ...packagedData.mentor }
          mentorsTotalSchedule.current.schedule = { ...packagedData.schedule }
          mentorDataFetchedSuccessfully.current = true;
          onSelectDate(date)
        } catch (e) {
          // Overwrite error - could send error to a logger
          setError(ERROR_UNKNOWN)
          setIsLoading(false)
        }
      } else {
        setSelectedDateSchedule({ date, timeCollection: mentorsTotalSchedule.current.schedule[date] })
      }
    }
    setIsLoading(false)
  }

  // NB: This is strictly for UI simulation and shouldn't be done in a real project. Instead we would call the backend again to get the updated list
  const addToMentorScheduleFakeSimulation = (payload: ScheduleMeetingPayloadI) => {
    if (mentorsTotalSchedule.current.schedule[payload.date] === undefined) {
      mentorsTotalSchedule.current.schedule[payload.date] = [payload.time]
    } else {
      mentorsTotalSchedule.current.schedule[payload.date] = [...mentorsTotalSchedule.current.schedule[payload.date], payload.time] // force a re-render by changing the reference (cloning the array)
    }
  }

  const onSetError = (error: ScheduleMeetingErrorI) => {
    if (isSuccessful) {
      setIsSuccessful(false)
    }
    setError(error.message) // We could extract and log the path, which could assist in debugging
  }

  // Simulate fake booking
  const onSetBooking = async (payload: ScheduleMeetingPayloadI) => {
    setIsLoading(true)

    try {
      if (TURN_ON_FAKE_ERROR) {
        const errorMessage = { message: 'Fail to keep the selected slot, please try again' };
        throw errorMessage;
      }

      let timer;
      await new Promise((resolve) => {
        timer = setTimeout(() => {
          resolve({ message: 'OK' })
          setIsLoading(false)
        }, 500)
      })

      addToMentorScheduleFakeSimulation(payload)
      setSelectedDateSchedule({ date: payload.date, timeCollection: mentorsTotalSchedule.current.schedule[payload.date] })

      clearTimeout(timer)
      setIsSuccessful(true)
    } catch (e) {
      setError((e as { message: string }).message)
      setIsLoading(false)
    }
  }

  return ({
    error,
    isSuccessful,
    isLoading,
    selectedDateBookedTimeSlots: selectedDateSchedule?.timeCollection || [],
    onSelectDate,
    onSetError,
    onClearError: () => setError(""),
    onClearSuccess: () => setIsSuccessful(false),
    onSetBooking
  })
}

export default useScheduleMeeting;
